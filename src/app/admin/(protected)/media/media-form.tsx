"use client";

import { useActionState } from "react";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { Button } from "@/components/tailadmin/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/tailadmin/ui/field";
import { Input } from "@/components/tailadmin/ui/input";
import { idleFormState } from "@/lib/content/form";
import { uploadMedia } from "./actions";

export function MediaUploadForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState(
    uploadMedia,
    idleFormState,
  );

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

      {!configured ? (
        <Alert role="alert" variant="destructive">
          <AlertDescription>
            Cloudinary belum dikonfigurasi di server ini. Isi
            CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, dan
            CLOUDINARY_API_SECRET di .env.local lalu restart dev server.
            Panduan lengkap: docs/CLOUDINARY.md.
          </AlertDescription>
        </Alert>
      ) : null}

      <ComponentCard title="Unggah gambar baru">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field>
              <FieldLabel htmlFor="file">File gambar</FieldLabel>
              <Input
                accept="image/jpeg,image/png,image/webp,image/avif"
                id="file"
                name="file"
                type="file"
              />
              <FieldDescription>
                JPG, PNG, WebP, atau AVIF, maksimal 10 MB.
              </FieldDescription>
            </Field>
          </div>
          <div>
            <Field>
              <FieldLabel htmlFor="alt_text">Teks alt gambar</FieldLabel>
              <Input
                id="alt_text"
                maxLength={500}
                name="alt_text"
                placeholder="Deskripsi singkat isi gambar"
              />
            </Field>
          </div>
          <div>
            <Field>
              <FieldLabel htmlFor="folder">Folder Cloudinary</FieldLabel>
              <Input
                id="folder"
                maxLength={200}
                name="folder"
                placeholder="margo-lestari/galeri"
              />
              <FieldDescription>
                Dikosongkan memakai folder default margo-lestari/galeri.
              </FieldDescription>
            </Field>
          </div>
        </div>
      </ComponentCard>

      <div className="flex flex-wrap gap-3">
        <Button disabled={pending || !configured} type="submit">
          {pending ? "Mengunggah…" : "Unggah ke Cloudinary"}
        </Button>
      </div>
    </form>
  );
}
