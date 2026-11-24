"use client";

import { useActionState } from "react";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/tailadmin/ui/field";
import { Input } from "@/components/tailadmin/ui/input";
import { Textarea } from "@/components/tailadmin/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { NEWS_CATEGORIES } from "@/lib/validators/content";
import { saveNews } from "./actions";
import { FloatingSaveBar } from "../_components/floating-save-bar";

export function NewsForm({
  articleId,
  initialValues,
}: {
  articleId: string | null;
  initialValues: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(
    saveNews,
    idleFormState,
  );

  const value = (name: string) =>
    state.values?.[name] ?? initialValues[name] ?? "";

  return (
    <form action={formAction} aria-busy={pending} className="space-y-6">
      {state.kind === "success" && state.message ? (
        <Alert role="status" variant="success">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}
      {state.kind === "error" && state.message ? (
        <Alert role="alert" variant="destructive">
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      {articleId ? <input name="id" type="hidden" value={articleId} /> : null}

      <ComponentCard title="Isi berita">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.title)}>
              <FieldLabel htmlFor="title">Judul berita</FieldLabel>
              <Input
                aria-invalid={state.fieldErrors.title ? true : undefined}
                defaultValue={value("title")}
                id="title"
                maxLength={200}
                name="title"
              />
              <FieldError
                errors={
                  state.fieldErrors.title
                    ? [{ message: state.fieldErrors.title }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div>
            <Field data-invalid={Boolean(state.fieldErrors.slug)}>
              <FieldLabel htmlFor="slug">Slug (URL)</FieldLabel>
              <Input
                aria-invalid={state.fieldErrors.slug ? true : undefined}
                defaultValue={value("slug")}
                id="slug"
                maxLength={200}
                name="slug"
                placeholder="otomatis dari judul bila dikosongkan"
              />
              <FieldDescription>
                Hanya huruf kecil, angka, dan strip. Contoh:
                musrenbangdes-2026.
              </FieldDescription>
              <FieldError
                errors={
                  state.fieldErrors.slug
                    ? [{ message: state.fieldErrors.slug }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div>
            <Field data-invalid={Boolean(state.fieldErrors.category)}>
              <FieldLabel htmlFor="category">Kategori</FieldLabel>
              <select
                className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                defaultValue={value("category") || "Pengumuman"}
                id="category"
                name="category"
              >
                {NEWS_CATEGORIES.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <FieldError
                errors={
                  state.fieldErrors.category
                    ? [{ message: state.fieldErrors.category }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.excerpt)}>
              <FieldLabel htmlFor="excerpt">Ringkasan (excerpt)</FieldLabel>
              <Textarea
                aria-invalid={state.fieldErrors.excerpt ? true : undefined}
                defaultValue={value("excerpt")}
                id="excerpt"
                maxLength={500}
                name="excerpt"
                rows={3}
              />
              <FieldError
                errors={
                  state.fieldErrors.excerpt
                    ? [{ message: state.fieldErrors.excerpt }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.content)}>
              <FieldLabel htmlFor="content">Isi berita</FieldLabel>
              <Textarea
                aria-invalid={state.fieldErrors.content ? true : undefined}
                defaultValue={value("content")}
                id="content"
                maxLength={20000}
                name="content"
                rows={10}
              />
              <FieldDescription>
                Paragraf dipisah dengan baris kosong.
              </FieldDescription>
              <FieldError
                errors={
                  state.fieldErrors.content
                    ? [{ message: state.fieldErrors.content }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div>
            <Field data-invalid={Boolean(state.fieldErrors.author)}>
              <FieldLabel htmlFor="author">Penulis</FieldLabel>
              <Input
                aria-invalid={state.fieldErrors.author ? true : undefined}
                defaultValue={value("author")}
                id="author"
                maxLength={100}
                name="author"
                placeholder="Admin Desa"
              />
              <FieldError
                errors={
                  state.fieldErrors.author
                    ? [{ message: state.fieldErrors.author }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div>
            <Field data-invalid={Boolean(state.fieldErrors.published_at)}>
              <FieldLabel htmlFor="published_at">Tanggal terbit</FieldLabel>
              <Input
                aria-invalid={
                  state.fieldErrors.published_at ? true : undefined
                }
                defaultValue={value("published_at")}
                id="published_at"
                name="published_at"
                type="date"
              />
              <FieldDescription>
                Dikosongkan bila status terbit: memakai tanggal hari ini.
              </FieldDescription>
              <FieldError
                errors={
                  state.fieldErrors.published_at
                    ? [{ message: state.fieldErrors.published_at }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div>
            <Field data-invalid={Boolean(state.fieldErrors.image_url)}>
              <FieldLabel htmlFor="image_url">URL gambar</FieldLabel>
              <Input
                aria-invalid={state.fieldErrors.image_url ? true : undefined}
                defaultValue={value("image_url")}
                id="image_url"
                maxLength={1000}
                name="image_url"
                placeholder="https://… (opsional, akan pindah ke Cloudinary)"
              />
              <FieldError
                errors={
                  state.fieldErrors.image_url
                    ? [{ message: state.fieldErrors.image_url }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div>
            <Field data-invalid={Boolean(state.fieldErrors.image_alt)}>
              <FieldLabel htmlFor="image_alt">Teks alt gambar</FieldLabel>
              <Input
                aria-invalid={state.fieldErrors.image_alt ? true : undefined}
                defaultValue={value("image_alt")}
                id="image_alt"
                maxLength={500}
                name="image_alt"
              />
              <FieldError
                errors={
                  state.fieldErrors.image_alt
                    ? [{ message: state.fieldErrors.image_alt }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.status)}>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <select
                className="border-input bg-background text-foreground focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border px-3 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px]"
                defaultValue={value("status") || "draft"}
                id="status"
                name="status"
              >
                <option value="draft">Draf (belum tampil di publik)</option>
                <option value="published">Terbit (tampil di /berita)</option>
              </select>
              <FieldError
                errors={
                  state.fieldErrors.status
                    ? [{ message: state.fieldErrors.status }]
                    : undefined
                }
              />
            </Field>
          </div>
        </div>
      </ComponentCard>

      <FloatingSaveBar
        pending={pending}
        saveLabel="Simpan berita"
        saved={state.kind === "success"}
      />
    </form>
  );
}
