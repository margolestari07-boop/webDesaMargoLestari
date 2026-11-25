"use client";

import { useActionState, useEffect, useRef, useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tailadmin/ui/select";
import { Textarea } from "@/components/tailadmin/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { saveOfficers } from "./actions";
import { FloatingSaveBar } from "../_components/floating-save-bar";

export type OfficerRow = {
  clientId: string;
  full_name: string;
  position: string;
  description: string;
  parent_client_id: string;
  sort_order: string;
  is_active: boolean;
  photo_asset_id: string;
};

export type PhotoAssetOption = {
  id: string;
  secure_url: string | null;
  storage_path: string | null;
  provider: string;
};

/** URL pratinjau: Cloudinary memakai secure_url, Supabase memakai storage_path. */
function photoPreviewUrl(asset: PhotoAssetOption): string | null {
  if (asset.provider === "cloudinary") return asset.secure_url;
  return asset.storage_path ? `/${asset.storage_path}` : null;
}

type NewPhotoPreview = {
  url: string;
  name: string;
  sizeKb: number;
};

function newClientId(): string {
  return `officer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function OfficerPhotoField({
  row,
  mediaAssets,
  freshPhoto,
  onPhotoChange,
  onClearNewPhoto,
  onRemovePhoto,
  inputRef,
}: {
  row: OfficerRow;
  mediaAssets: PhotoAssetOption[];
  freshPhoto: NewPhotoPreview | undefined;
  onPhotoChange: (
    clientId: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => void;
  onClearNewPhoto: (clientId: string) => void;
  onRemovePhoto: (clientId: string) => void;
  inputRef: (el: HTMLInputElement | null) => void;
}) {
  const existingPhoto =
    row.photo_asset_id === ""
      ? null
      : (mediaAssets.find((asset) => asset.id === row.photo_asset_id) ??
        null);
  const existingPhotoUrl = existingPhoto
    ? photoPreviewUrl(existingPhoto)
    : null;
  return (
    <Field>
      <FieldLabel htmlFor={`officer-photo-${row.clientId}`}>
        Foto (opsional)
      </FieldLabel>
      {freshPhoto ? (
        <div className="mb-3">
          <img
            alt={`Pratinjau ${freshPhoto.name}`}
            className="h-24 w-auto max-w-40 rounded-lg border border-gray-200 object-cover"
            src={freshPhoto.url}
          />
          <p className="mt-2 text-xs text-gray-500">
            {freshPhoto.name} · {freshPhoto.sizeKb} KB — pratinjau file
            baru, belum diunggah.
          </p>
        </div>
      ) : existingPhoto && existingPhotoUrl ? (
        <img
          alt={`Foto ${row.full_name || "pejabat"}`}
          className="mb-3 h-24 w-auto max-w-40 rounded-lg border border-gray-200 object-cover"
          src={existingPhotoUrl}
        />
      ) : null}
      <Input
        accept="image/jpeg,image/png,image/webp,image/avif"
        id={`officer-photo-${row.clientId}`}
        name={`photo_${row.clientId}`}
        onChange={(event) => onPhotoChange(row.clientId, event)}
        ref={inputRef}
        type="file"
      />
      <FieldDescription>
        JPG, PNG, WebP, atau AVIF, maks 10 MB. File baru hanya diunggah
        ke Cloudinary saat Simpan diklik.
      </FieldDescription>
      <div className="mt-2 flex flex-wrap gap-2">
        {freshPhoto ? (
          <Button
            onClick={() => onClearNewPhoto(row.clientId)}
            size="sm"
            type="button"
            variant="outline"
          >
            Batalkan file baru
          </Button>
        ) : null}
        {existingPhoto && !freshPhoto ? (
          <Button
            onClick={() => onRemovePhoto(row.clientId)}
            size="sm"
            type="button"
            variant="outline"
          >
            Hapus foto
          </Button>
        ) : null}
      </div>
    </Field>
  );
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

export function OfficersForm({
  initialOfficers,
  mediaAssets,
}: {
  initialOfficers: OfficerRow[];
  mediaAssets: PhotoAssetOption[];
}) {
  const [state, formAction, pending] = useActionState(
    saveOfficers,
    idleFormState,
  );
  const [officers, setOfficers] = useState<OfficerRow[]>(initialOfficers);
  const [photoPreviews, setPhotoPreviews] = useState<
    Record<string, NewPhotoPreview | undefined>
  >({});
  const [resetKey, setResetKey] = useState(0);
  const photoInputRefs = useRef(new Map<string, HTMLInputElement>());
  const photoPreviewsRef = useRef(photoPreviews);
  const prevKindRef = useRef(state.kind);

  const update = (clientId: string, patch: Partial<OfficerRow>) => {
    setOfficers((rows) =>
      rows.map((row) =>
        row.clientId === clientId ? { ...row, ...patch } : row,
      ),
    );
  };

  useEffect(() => {
    photoPreviewsRef.current = photoPreviews;
  }, [photoPreviews]);

  // Bebaskan object URL pratinjau saat form dilepas.
  useEffect(() => {
    return () => {
      for (const preview of Object.values(photoPreviewsRef.current)) {
        if (preview) URL.revokeObjectURL(preview.url);
      }
    };
  }, []);

  // Setelah simpan berhasil: tambal photo_asset_id dari aset yang baru
  // diunggah server, bersihkan input file + pratinjau supaya simpan
  // berikutnya tidak mengunggah ulang file yang sama.
  useEffect(() => {
    const prevKind = prevKindRef.current;
    prevKindRef.current = state.kind;
    if (state.kind !== "success" || prevKind === "success") return;
    const uploaded = state.uploadedAssets;
    if (uploaded && Object.keys(uploaded).length > 0) {
      // Disengaja: sinkronisasi satu kali hasil upload server ke state
      // lokal setelah simpan berhasil (dijaga prevKind).
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setOfficers((rows) =>
        rows.map((row) =>
          uploaded[row.clientId] != null
            ? { ...row, photo_asset_id: uploaded[row.clientId] }
            : row,
        ),
      );
    }
    for (const preview of Object.values(photoPreviewsRef.current)) {
      if (preview) URL.revokeObjectURL(preview.url);
    }
    setPhotoPreviews({});
    for (const input of photoInputRefs.current.values()) {
      input.value = "";
    }
    setResetKey((key) => key + 1);
  }, [state]);

  // File baru HANYA menampilkan pratinjau lokal; tidak ada upload
  // sebelum tombol Simpan diklik (file ikut FormData utama).
  const onPhotoChange = (
    clientId: string,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    const prev = photoPreviewsRef.current[clientId];
    if (prev) URL.revokeObjectURL(prev.url);
    if (!file) {
      setPhotoPreviews((all) => ({ ...all, [clientId]: undefined }));
      return;
    }
    setPhotoPreviews((all) => ({
      ...all,
      [clientId]: {
        url: URL.createObjectURL(file),
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
      },
    }));
  };

  const clearNewPhoto = (clientId: string) => {
    const prev = photoPreviewsRef.current[clientId];
    if (prev) URL.revokeObjectURL(prev.url);
    setPhotoPreviews((all) => ({ ...all, [clientId]: undefined }));
    const input = photoInputRefs.current.get(clientId);
    if (input) input.value = "";
  };

  const removePhoto = (clientId: string) => {
    clearNewPhoto(clientId);
    update(clientId, { photo_asset_id: "" });
  };

  const removeOfficer = (clientId: string, name: string) => {
    const hasChildren = officers.some(
      (row) => row.parent_client_id === clientId,
    );
    if (
      window.confirm(
        hasChildren
          ? `Hapus ${name || "pejabat ini"}? Bawahan yang merujuk pejabat ini akan kehilangan atasan.`
          : `Hapus ${name || "pejabat ini"}?`,
      )
    ) {
      setOfficers((rows) =>
        rows
          .filter((row) => row.clientId !== clientId)
          .map((row) =>
            row.parent_client_id === clientId
              ? { ...row, parent_client_id: "" }
              : row,
          ),
      );
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

      <input
        name="officers_json"
        type="hidden"
        value={JSON.stringify(
          officers.map((row, index) => ({
            client_id: row.clientId,
            full_name: row.full_name,
            position: row.position,
            description: row.description,
            parent_client_id: row.parent_client_id,
            sort_order:
              row.sort_order === "" ? index : Number(row.sort_order),
            is_active: row.is_active,
            photo_asset_id: row.photo_asset_id,
          })),
        )}
      />

      {officers.length === 0 ? (
        <FieldDescription>
          Belum ada pejabat. Tambahkan Kepala Desa terlebih dahulu, lalu
          perangkat di bawahnya.
        </FieldDescription>
      ) : null}

      {officers.map((row, index) => (
        <ComponentCard
          key={row.clientId}
          title={`Pejabat ${index + 1}${row.full_name ? ` — ${row.full_name}` : ""}`}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor={`officer-name-${row.clientId}`}>
                Nama <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id={`officer-name-${row.clientId}`}
                maxLength={120}
                onChange={(event) =>
                  update(row.clientId, { full_name: event.target.value })
                }
                required
                value={row.full_name}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`officer-position-${row.clientId}`}>
                Jabatan <span className="text-red-500">*</span>
              </FieldLabel>
              <Input
                id={`officer-position-${row.clientId}`}
                maxLength={120}
                onChange={(event) =>
                  update(row.clientId, { position: event.target.value })
                }
                required
                value={row.position}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor={`officer-parent-${row.clientId}`}>
                Atasan langsung
              </FieldLabel>
              <Select
                onValueChange={(value) =>
                  update(row.clientId, {
                    parent_client_id: value ?? "",
                  })
                }
                value={
                  row.parent_client_id === "" ? null : row.parent_client_id
                }
              >
                <SelectTrigger id={`officer-parent-${row.clientId}`}>
                  <SelectValue placeholder="Tidak ada (tingkat teratas)">
                    {(value: string | null) => {
                      if (!value) return "Tidak ada (tingkat teratas)";
                      const parent = officers.find(
                        (item) => item.clientId === value,
                      );
                      return parent
                        ? `${parent.full_name || "(tanpa nama)"} — ${parent.position || "(tanpa jabatan)"}`
                        : value;
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">
                    Tidak ada (tingkat teratas)
                  </SelectItem>
                  {officers
                    .filter((item) => item.clientId !== row.clientId)
                    .map((item) => (
                      <SelectItem key={item.clientId} value={item.clientId}>
                        {item.full_name || "(tanpa nama)"} —{" "}
                        {item.position || "(tanpa jabatan)"}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor={`officer-order-${row.clientId}`}>
                Urutan
              </FieldLabel>
              <Input
                id={`officer-order-${row.clientId}`}
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  update(row.clientId, { sort_order: event.target.value })
                }
                type="number"
                value={row.sort_order}
              />
            </Field>
            <div className="sm:col-span-2">
              <Field>
                <FieldLabel htmlFor={`officer-desc-${row.clientId}`}>
                  Deskripsi / tugas
                </FieldLabel>
                <Textarea
                  id={`officer-desc-${row.clientId}`}
                  maxLength={500}
                  onChange={(event) =>
                    update(row.clientId, { description: event.target.value })
                  }
                  rows={2}
                  value={row.description}
                />
              </Field>
            </div>
            <OfficerPhotoField
              freshPhoto={photoPreviews[row.clientId]}
              inputRef={(el) => {
                if (el) photoInputRefs.current.set(row.clientId, el);
                else photoInputRefs.current.delete(row.clientId);
              }}
              mediaAssets={mediaAssets}
              onClearNewPhoto={clearNewPhoto}
              onPhotoChange={onPhotoChange}
              onRemovePhoto={removePhoto}
              row={row}
            />
            <Field>
              <FieldLabel htmlFor={`officer-active-${row.clientId}`}>
                Status
              </FieldLabel>
              <Select
                onValueChange={(value) =>
                  update(row.clientId, {
                    is_active: value === "true",
                  })
                }
                value={row.is_active ? "true" : "false"}
              >
                <SelectTrigger id={`officer-active-${row.clientId}`}>
                  <SelectValue placeholder="Pilih...">
                    {(value: string | null) => {
                      if (value === "true") return "Aktif";
                      if (value === "false") return "Nonaktif";
                      return "Pilih...";
                    }}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Aktif</SelectItem>
                  <SelectItem value="false">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button
                onClick={() =>
                  setOfficers((rows) => moveRow(rows, row.clientId, -1))
                }
                size="sm"
                type="button"
                variant="outline"
              >
                Naik
              </Button>
              <Button
                onClick={() =>
                  setOfficers((rows) => moveRow(rows, row.clientId, 1))
                }
                size="sm"
                type="button"
                variant="outline"
              >
                Turun
              </Button>
              <Button
                onClick={() => removeOfficer(row.clientId, row.full_name)}
                size="sm"
                type="button"
                variant="outline"
              >
                Hapus
              </Button>
            </div>
          </div>
        </ComponentCard>
      ))}

      <div className="flex flex-wrap gap-2">
        <Button
          onClick={() =>
            setOfficers((rows) => [
              ...rows,
              {
                clientId: newClientId(),
                full_name: "",
                position: "",
                description: "",
                parent_client_id: "",
                sort_order: String(rows.length),
                is_active: true,
                photo_asset_id: "",
              },
            ])
          }
          size="sm"
          type="button"
          variant="outline"
        >
          Tambah pejabat
        </Button>
      </div>

      <FloatingSaveBar
        pending={pending}
        resetKey={resetKey}
        saved={state.kind === "success"}
      />
    </form>
  );
}
