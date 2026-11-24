"use client";

import { useActionState, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
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
  const [selected, setSelected] = useState<{
    url: string;
    name: string;
    sizeKb: number;
  } | null>(null);

  // Bebaskan object URL pratinjau saat file diganti atau form dilepas.
  useEffect(() => {
    return () => {
      if (selected) URL.revokeObjectURL(selected.url);
    };
  }, [selected]);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (selected) URL.revokeObjectURL(selected.url);
    if (!file) {
      setSelected(null);
      return;
    }
    setSelected({
      url: URL.createObjectURL(file),
      name: file.name,
      sizeKb: Math.round(file.size / 1024),
    });
  };

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

      <ComponentCard title="Unggah gambar baru">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field>
              <FieldLabel htmlFor="file">File gambar</FieldLabel>
              <Input
                accept="image/jpeg,image/png,image/webp,image/avif"
                id="file"
                name="file"
                onChange={onFileChange}
                type="file"
              />
              <FieldDescription>
                JPG, PNG, WebP, atau AVIF, maksimal 10 MB.
              </FieldDescription>
              {selected ? (
                <div className="mt-3">
                  <img
                    alt={`Pratinjau ${selected.name}`}
                    className="aspect-[4/3] w-full max-w-sm rounded-xl border border-gray-200 object-cover"
                    src={selected.url}
                  />
                  <p className="mt-2 text-xs text-gray-500">
                    {selected.name} · {selected.sizeKb} KB — pratinjau file
                    yang dipilih, belum diunggah.
                  </p>
                </div>
              ) : null}
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
