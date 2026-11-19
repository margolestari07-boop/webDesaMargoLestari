"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  ensureDraft,
  insertAuditEvent,
  publishDraftRevision,
  sectionLabel,
} from "@/lib/content/drafts";
import { sectionKeySchema } from "@/lib/validators/content";

export async function logout() {
  const { supabase } = await requireAdmin();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export type DraftActionState = {
  kind: "idle" | "success" | "error";
  message: string | null;
};

const PUBLIC_PATHS = {
  home: "/",
  profile: "/profil",
  population: "/infografis",
  apbdes: "/infografis/apbdes",
} as const;

const returnPathSchema = z
  .string()
  .startsWith("/admin/")
  .max(100)
  .catch("/admin");

/**
 * Buat draf baru untuk satu section (menyalin isi revisi terbit bila ada).
 * Dipakai tombol "Buat draf baru" di bilah status setiap halaman CRUD.
 */
export async function createDraftAction(formData: FormData): Promise<void> {
  const { supabase, userId } = await requireAdmin();
  const parsedKey = sectionKeySchema.safeParse(formData.get("section_key"));
  const returnPath = returnPathSchema.parse(formData.get("return_path"));

  if (!parsedKey.success) {
    redirect(`${returnPath}?error=bad-section`);
  }
  const key = parsedKey.data;

  try {
    const { draft } = await ensureDraft(supabase, key, userId);
    await insertAuditEvent(
      supabase,
      userId,
      key,
      draft.id,
      "draft_created",
      `Draf revisi ${draft.revision_no} ${sectionLabel(key)} dibuat.`,
    );
  } catch {
    redirect(`${returnPath}?error=draft-failed`);
  }

  revalidatePath(returnPath);
  redirect(`${returnPath}?notice=draft-created`);
}

/**
 * Terbitkan satu revisi draf lewat RPC publish_content_revision yang
 * atomik: status draf menjadi published, revisi terbit lama diarsipkan,
 * dan pointer content_sections diganti dalam satu transaksi.
 */
export async function publishRevisionAction(
  formData: FormData,
): Promise<void> {
  const { supabase, userId } = await requireAdmin();
  const revisionId = formData.get("revision_id");
  const parsedKey = sectionKeySchema.safeParse(formData.get("section_key"));
  const returnPath = returnPathSchema.parse(formData.get("return_path"));

  if (typeof revisionId !== "string" || !parsedKey.success) {
    redirect(`${returnPath}?error=bad-request`);
  }
  const key = parsedKey.data;

  try {
    await publishDraftRevision(supabase, revisionId);
    await insertAuditEvent(
      supabase,
      userId,
      key,
      revisionId,
      "published",
      `Revisi ${sectionLabel(key)} diterbitkan.`,
    );
  } catch {
    redirect(`${returnPath}?error=publish-failed`);
  }

  revalidatePath(returnPath);
  revalidatePath(PUBLIC_PATHS[key]);
  redirect(`${returnPath}?notice=published`);
}
