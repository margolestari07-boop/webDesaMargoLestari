"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/authorization";
import {
  idleFormState,
  readFormStrings,
  zodFieldErrors,
  type FormState,
} from "@/lib/content/form";
import {
  newsArticleSchema,
  slugifyTitle,
} from "@/lib/validators/content";

/**
 * Simpan artikel berita (baru atau ubah). Status "published" berarti
 * artikel langsung tampil di /berita; "draft" hanya terlihat di panel ini.
 * Slug dibuat otomatis dari judul bila dikosongkan. published_at diisi
 * tanggal terbit bila status published dan tanggal belum diisi; dikosongkan
 * bila status diubah kembali ke draft.
 */
export async function saveNews(
  _previousState: FormState,
  formData: FormData,
): Promise<FormState> {
  const { supabase } = await requireAdmin();
  const values = readFormStrings(formData);
  const articleId = values.id?.trim() || null;

  const parsed = newsArticleSchema.safeParse(values);
  if (!parsed.success) {
    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors: zodFieldErrors(parsed.error),
      values,
    };
  }

  const data = parsed.data;
  const slug = data.slug ?? slugifyTitle(data.title);
  if (!slug) {
    return {
      kind: "error",
      message: "Judul tidak menghasilkan slug yang valid.",
      fieldErrors: { slug: "Isi slug secara manual." },
      values,
    };
  }

  const publishedAt =
    data.status === "published"
      ? (data.published_at ?? new Date().toISOString().slice(0, 10))
      : null;

  const payload = {
    slug,
    title: data.title,
    category: data.category,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    image_url: data.image_url,
    image_alt: data.image_alt,
    status: data.status,
    published_at: publishedAt,
  };

  try {
    if (articleId) {
      const { error } = await supabase
        .from("news_articles")
        .update(payload)
        .eq("id", articleId);
      if (error) throw new Error(error.message);
    } else {
      const { error } = await supabase.from("news_articles").insert(payload);
      if (error) throw new Error(error.message);
    }
  } catch (error) {
    const message =
      error instanceof Error && error.message.includes("duplicate key")
        ? "Slug sudah dipakai artikel lain. Ubah judul atau isi slug lain."
        : "Perubahan belum tersimpan. Periksa koneksi database lalu coba lagi.";
    return { kind: "error", message, fieldErrors: {}, values };
  }

  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
  return {
    ...idleFormState,
    kind: "success",
    message:
      data.status === "published"
        ? "Berita tersimpan dan langsung tampil di halaman publik."
        : "Berita tersimpan sebagai draf (belum tampil di halaman publik).",
    values,
  };
}

export async function deleteNews(formData: FormData): Promise<void> {
  const { supabase } = await requireAdmin();
  const id = formData.get("id");
  if (typeof id === "string" && id.trim() !== "") {
    await supabase.from("news_articles").delete().eq("id", id);
  }
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  redirect("/admin/berita");
}
