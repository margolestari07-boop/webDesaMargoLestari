"use client";

import Link from "next/link";
import { useActionState, useState } from "react";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { Button } from "@/components/tailadmin/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/tailadmin/ui/field";
import { Input } from "@/components/tailadmin/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tailadmin/ui/select";
import { Textarea } from "@/components/tailadmin/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { saveHome } from "./actions";
import { FloatingSaveBar } from "../_components/floating-save-bar";

export type GalleryRow = {
  clientId: string;
  media_asset_id: string;
  title: string;
  caption: string;
  alt_override: string;
  sort_order: string;
};

function newClientId(): string {
  return `gallery-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function moveRow<T extends { clientId: string }>(
  rows: T[],
  clientId: string,
  direction: -1 | 1,
): T[] {
  const index = rows.findIndex((row) => row.clientId === clientId);
  const target = index + direction;
  if (index < 0 || target < 0 || target >= rows.length) return rows;
  const next = [...rows];
  const [moved] = next.splice(index, 1);
  next.splice(target, 0, moved);
  return next;
}

export type MediaAssetOption = {
  id: string;
  storage_path: string | null;
  secure_url: string | null;
  provider: string;
  alt_text: string | null;
  original_filename: string | null;
};

function filenameFromUrl(url: string | null): string | null {
  if (!url) return null;
  const clean = url.split("?")[0].split("#")[0];
  const last = clean.split("/").filter(Boolean).pop();
  return last ?? null;
}

/** Label manusiawi untuk opsi select: alt_text, nama file, atau ID singkat. */
function assetLabel(asset: MediaAssetOption): string {
  if (asset.alt_text?.trim()) return asset.alt_text.trim();
  const filename =
    asset.original_filename ??
    filenameFromUrl(asset.secure_url) ??
    filenameFromUrl(asset.storage_path);
  if (filename) return filename;
  return `Aset ${asset.id.slice(0, 8)}`;
}

/** URL pratinjau: Cloudinary memakai secure_url, Supabase memakai storage_path. */
function assetPreviewUrl(asset: MediaAssetOption): string | null {
  if (asset.provider === "cloudinary") return asset.secure_url;
  return asset.storage_path ? `/${asset.storage_path}` : null;
}

export function HomeForm({
  initialValues,
  initialGallery,
  mediaAssets,
}: {
  initialValues: Record<string, string>;
  initialGallery: GalleryRow[];
  mediaAssets: MediaAssetOption[];
}) {
  const [state, formAction, pending] = useActionState(
    saveHome,
    idleFormState,
  );
  const [gallery, setGallery] = useState<GalleryRow[]>(initialGallery);

  const value = (name: string) => state.values?.[name] ?? initialValues[name] ?? "";

  const update = (clientId: string, patch: Partial<GalleryRow>) => {
    setGallery((rows) =>
      rows.map((row) =>
        row.clientId === clientId ? { ...row, ...patch } : row,
      ),
    );
  };

  const removeItem = (clientId: string, title: string) => {
    if (window.confirm(`Hapus item galeri "${title || "tanpa judul"}"?`)) {
      setGallery((rows) => rows.filter((row) => row.clientId !== clientId));
    }
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
      {state.fieldErrors.rows ? (
        <Alert role="alert" variant="destructive">
          <AlertDescription>{state.fieldErrors.rows}</AlertDescription>
        </Alert>
      ) : null}

      <ComponentCard title="Teks Beranda">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.hero_title)}>
              <FieldLabel htmlFor="hero_title">Judul utama</FieldLabel>
              <Input
                aria-invalid={
                  state.fieldErrors.hero_title ? true : undefined
                }
                defaultValue={value("hero_title")}
                id="hero_title"
                maxLength={200}
                name="hero_title"
              />
              <FieldError
                errors={
                  state.fieldErrors.hero_title
                    ? [{ message: state.fieldErrors.hero_title }]
                    : undefined
                }
              />
            </Field>
          </div>
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.hero_subtitle)}>
              <FieldLabel htmlFor="hero_subtitle">Subjudul</FieldLabel>
              <Textarea
                aria-invalid={
                  state.fieldErrors.hero_subtitle ? true : undefined
                }
                defaultValue={value("hero_subtitle")}
                id="hero_subtitle"
                maxLength={500}
                name="hero_subtitle"
                rows={3}
              />
              <FieldError
                errors={
                  state.fieldErrors.hero_subtitle
                    ? [{ message: state.fieldErrors.hero_subtitle }]
                    : undefined
                }
              />
            </Field>
          </div>
          <Field data-invalid={Boolean(state.fieldErrors.help_phone)}>
            <FieldLabel htmlFor="help_phone">
              Nomor bantuan administrasi
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.help_phone ? true : undefined
              }
              defaultValue={value("help_phone")}
              id="help_phone"
              maxLength={40}
              name="help_phone"
              placeholder="Contoh: 0812-3456-7890"
            />
            <FieldError
              errors={
                state.fieldErrors.help_phone
                  ? [{ message: state.fieldErrors.help_phone }]
                  : undefined
              }
            />
            <FieldDescription>
              Bila nomor ini sama dengan nomor telepon di Pengaturan Situs,
              pakai nomor yang sama agar tidak ada dua versi.
            </FieldDescription>
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.help_note)}>
            <FieldLabel htmlFor="help_note">Catatan bantuan</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.help_note ? true : undefined}
              defaultValue={value("help_note")}
              id="help_note"
              maxLength={500}
              name="help_note"
            />
            <FieldError
              errors={
                state.fieldErrors.help_note
                  ? [{ message: state.fieldErrors.help_note }]
                  : undefined
              }
            />
          </Field>
        </div>
      </ComponentCard>

      <ComponentCard title="Galeri / dokumentasi">
        <input
          name="gallery_items_json"
          type="hidden"
          value={JSON.stringify(
            gallery.map((row, index) => ({
              media_asset_id: row.media_asset_id,
              title: row.title,
              caption: row.caption,
              alt_override: row.alt_override,
              sort_order:
                row.sort_order === "" ? index : Number(row.sort_order),
            })),
          )}
        />
        <FieldDescription>
          Pilih gambar dari aset yang sudah diunggah di modul{" "}
          <Link
            className="font-medium text-brand-500 underline-offset-4 hover:underline"
            href="/admin/media"
          >
            Media
          </Link>
          .
          {mediaAssets.length === 0
            ? " Belum ada aset media, unggah dulu di modul Media."
            : ` Aset tersedia: ${mediaAssets.length}.`}
        </FieldDescription>
        {gallery.length === 0 ? (
          <FieldDescription>Belum ada item galeri.</FieldDescription>
        ) : null}
        {gallery.map((row, index) => {
          const selectedAsset =
            mediaAssets.find((asset) => asset.id === row.media_asset_id) ??
            null;
          const selectedPreviewUrl = selectedAsset
            ? assetPreviewUrl(selectedAsset)
            : null;
          return (
            <div
              className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-2"
              key={row.clientId}
            >
              <div className="sm:col-span-2">
                <Field>
                  <FieldLabel htmlFor={`gallery-media-${row.clientId}`}>
                    Gambar {index + 1}{" "}
                    <span className="text-red-500">*</span>
                  </FieldLabel>
                  <Select
                    onValueChange={(value) =>
                      update(row.clientId, { media_asset_id: value ?? "" })
                    }
                    value={
                      row.media_asset_id === "" ? null : row.media_asset_id
                    }
                  >
                    <SelectTrigger id={`gallery-media-${row.clientId}`}>
                      <SelectValue placeholder="Pilih gambar...">
                        {(value: string | null) => {
                          if (!value) return "Pilih gambar...";
                          const asset = mediaAssets.find(
                            (item) => item.id === value,
                          );
                          return asset ? assetLabel(asset) : value;
                        }}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {mediaAssets.map((asset) => (
                        <SelectItem key={asset.id} value={asset.id}>
                          {assetLabel(asset)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedAsset && selectedPreviewUrl ? (
                    <img
                      alt={`Pratinjau ${assetLabel(selectedAsset)}`}
                      className="mt-3 h-24 w-auto max-w-40 rounded-lg border border-gray-200 object-cover"
                      src={selectedPreviewUrl}
                    />
                  ) : null}
                </Field>
              </div>
            <Field>
              <FieldLabel htmlFor={`gallery-title-${row.clientId}`}>
                Judul
              </FieldLabel>
              <Input
                id={`gallery-title-${row.clientId}`}
                maxLength={200}
                onChange={(event) =>
                  update(row.clientId, { title: event.target.value })
                }
                value={row.title}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`gallery-alt-${row.clientId}`}>
                Teks alt
              </FieldLabel>
              <Input
                id={`gallery-alt-${row.clientId}`}
                maxLength={200}
                onChange={(event) =>
                  update(row.clientId, { alt_override: event.target.value })
                }
                value={row.alt_override}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field>
                <FieldLabel htmlFor={`gallery-caption-${row.clientId}`}>
                  Caption
                </FieldLabel>
                <Input
                  id={`gallery-caption-${row.clientId}`}
                  maxLength={500}
                  onChange={(event) =>
                    update(row.clientId, { caption: event.target.value })
                  }
                  value={row.caption}
                />
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor={`gallery-order-${row.clientId}`}>
                Urutan
              </FieldLabel>
              <Input
                id={`gallery-order-${row.clientId}`}
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  update(row.clientId, { sort_order: event.target.value })
                }
                type="number"
                value={row.sort_order}
              />
            </Field>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button
                onClick={() =>
                  setGallery((rows) => moveRow(rows, row.clientId, -1))
                }
                size="sm"
                type="button"
                variant="outline"
              >
                Naik
              </Button>
              <Button
                onClick={() =>
                  setGallery((rows) => moveRow(rows, row.clientId, 1))
                }
                size="sm"
                type="button"
                variant="outline"
              >
                Turun
              </Button>
              <Button
                onClick={() => removeItem(row.clientId, row.title)}
                size="sm"
                type="button"
                variant="outline"
              >
                Hapus
              </Button>
            </div>
            </div>
          );
        })}
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() =>
              setGallery((rows) => [
                ...rows,
                {
                  clientId: newClientId(),
                  media_asset_id: "",
                  title: "",
                  caption: "",
                  alt_override: "",
                  sort_order: String(rows.length),
                },
              ])
            }
            size="sm"
            type="button"
            variant="outline"
          >
            Tambah item galeri
          </Button>
        </div>
      </ComponentCard>

      <FloatingSaveBar pending={pending} saved={state.kind === "success"} />
    </form>
  );
}
