"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  idleFormState,
  parseRowsJson,
  readFormStrings,
  type FormState,
} from "@/lib/content/form";
import { villageOfficerSchema } from "@/lib/validators/content";

type OfficerRowInput = {
  client_id: string;
  full_name: string;
  position: string;
  description: string;
  parent_client_id: string;
  sort_order: string | number;
  is_active: boolean;
  photo_asset_id: string;
};

/**
 * Simpan struktur organisasi langsung ke tabel village_officers. Tanpa
 * revisi: simpan langsung tampil di halaman publik. Daftar ini adalah
 * satu-satunya sumber pejabat: halaman Beranda dan Profil Desa di situs
 * publik sama-sama membaca dari tabel ini, jadi tidak ada dua salinan
 * yang bisa bertentangan. Hierarki disimpan lewat parent_id; penyisipan
 * dilakukan dua tahap agar parent selalu sudah ada.
 */
export async function saveOfficers(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const values = readFormStrings(formData);
  const rows = parseRowsJson(formData.get("officers_json"));

  if (rows === null) {
    return {
      kind: "error",
      message: "Daftar pejabat tidak dapat dibaca. Muat ulang halaman.",
      fieldErrors: {},
      values,
    };
  }

  const clientIds = new Set<string>();
  for (const row of rows) {
    if (
      typeof row === "object" &&
      row !== null &&
      typeof (row as OfficerRowInput).client_id === "string"
    ) {
      clientIds.add((row as OfficerRowInput).client_id);
    }
  }

  const validated: {
    clientId: string;
    parentClientId: string | null;
    full_name: string;
    position: string;
    description: string | null;
    sort_order: number;
    is_active: boolean;
    photo_asset_id: string | null;
  }[] = [];

  for (const row of rows as OfficerRowInput[]) {
    const parentClientId =
      typeof row.parent_client_id === "string" &&
      row.parent_client_id !== ""
        ? row.parent_client_id
        : null;
    if (parentClientId && !clientIds.has(parentClientId)) {
      return {
        kind: "error",
        message: "Atasan yang dipilih tidak ada dalam daftar.",
        fieldErrors: { rows: "Periksa kembali pilihan atasan tiap pejabat." },
        values,
      };
    }
    if (parentClientId && parentClientId === row.client_id) {
      return {
        kind: "error",
        message: "Seorang pejabat tidak bisa menjadi atasannya sendiri.",
        fieldErrors: { rows: "Periksa kembali pilihan atasan tiap pejabat." },
        values,
      };
    }
    const parsed = villageOfficerSchema.safeParse({
      full_name: row.full_name,
      position: row.position,
      description: row.description,
      parent_id: null,
      photo_asset_id: row.photo_asset_id,
      sort_order: row.sort_order,
      is_active: row.is_active,
    });
    if (!parsed.success) {
      const first = parsed.error.issues[0];
      return {
        kind: "error",
        message: `Periksa kembali isian pejabat: ${first?.message ?? "tidak valid."}`,
        fieldErrors: { rows: first?.message ?? "Isian tidak valid." },
        values,
      };
    }
    validated.push({
      clientId: row.client_id,
      parentClientId,
      ...parsed.data,
    });
  }

  try {
    await supabase
      .from("village_officers")
      .delete()
      .neq("id", "00000000-0000-0000-0000-000000000000");

    const idMap = new Map<string, string>();
    for (const [index, item] of validated.entries()) {
      const { data, error } = await supabase
        .from("village_officers")
        .insert({
          parent_id: null,
          full_name: item.full_name,
          position: item.position,
          description: item.description,
          sort_order: item.sort_order || index,
          photo_asset_id: item.photo_asset_id,
          is_active: item.is_active,
        })
        .select("id")
        .single();
      if (error || !data) throw new Error(error?.message);
      idMap.set(item.clientId, data.id);
    }
    for (const item of validated) {
      const newId = idMap.get(item.clientId);
      const newParentId = item.parentClientId
        ? idMap.get(item.parentClientId)
        : undefined;
      if (newId && newParentId) {
        const { error } = await supabase
          .from("village_officers")
          .update({ parent_id: newParentId })
          .eq("id", newId);
        if (error) throw new Error(error.message);
      }
    }
  } catch {
    return {
      kind: "error",
      message:
        "Perubahan belum tersimpan. Periksa koneksi database dan migration, lalu coba lagi.",
      fieldErrors: {},
      values,
    };
  }

  revalidatePath("/admin/struktur");
  revalidatePath("/admin/beranda");
  revalidatePath("/admin/profil");
  revalidatePath("/");
  revalidatePath("/profil");
  revalidatePath("/admin");
  return {
    ...idleFormState,
    kind: "success",
    message:
      "Perubahan struktur organisasi tersimpan dan langsung tampil di Beranda dan Profil publik.",
    values,
  };
}
