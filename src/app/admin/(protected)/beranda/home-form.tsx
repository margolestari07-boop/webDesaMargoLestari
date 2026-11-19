"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { saveHomeDraft } from "./actions";

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

export function HomeForm({
  initialValues,
  initialGallery,
  mediaAssets,
  hasDraft,
}: {
  initialValues: Record<string, string>;
  initialGallery: GalleryRow[];
  mediaAssets: { id: string; storage_path: string; alt_text: string | null }[];
  hasDraft: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    saveHomeDraft,
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
    if (window.confirm(`Hapus item galeri "${title || "tanpa judul"}" dari draf?`)) {
      setGallery((rows) => rows.filter((row) => row.clientId !== clientId));
    }
  };

  return (
    <form action={formAction} aria-busy={pending} className="admin-settings-form">
      {state.kind === "success" && state.message ? (
        <p className="admin-settings-success" role="status">
          {state.message}
        </p>
      ) : null}
      {state.kind === "error" && state.message ? (
        <p className="admin-settings-error" role="alert">
          {state.message}
        </p>
      ) : null}
      {state.fieldErrors.rows ? (
        <p className="admin-settings-error" role="alert">
          {state.fieldErrors.rows}
        </p>
      ) : null}

      <fieldset className="admin-settings-group">
        <legend>Teks Beranda</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field admin-settings-wide">
            <Label htmlFor="hero_title">Judul utama</Label>
            <Input
              error={state.fieldErrors.hero_title}
              id="hero_title"
              maxLength={200}
              name="hero_title"
              defaultValue={value("hero_title")}
            />
          </div>
          <div className="admin-form-field admin-settings-wide">
            <Label htmlFor="hero_subtitle">Subjudul</Label>
            <Textarea
              error={state.fieldErrors.hero_subtitle}
              id="hero_subtitle"
              maxLength={500}
              name="hero_subtitle"
              rows={3}
              defaultValue={value("hero_subtitle")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="help_phone">Nomor bantuan administrasi</Label>
            <Input
              error={state.fieldErrors.help_phone}
              id="help_phone"
              maxLength={40}
              name="help_phone"
              placeholder="Contoh: 0812-3456-7890"
              defaultValue={value("help_phone")}
            />
            <p className="admin-field-help">
              Bila nomor ini sama dengan nomor telepon di Pengaturan Situs,
              pakai nomor yang sama agar tidak ada dua versi.
            </p>
          </div>
          <div className="admin-form-field">
            <Label htmlFor="help_note">Catatan bantuan</Label>
            <Input
              error={state.fieldErrors.help_note}
              id="help_note"
              maxLength={500}
              name="help_note"
              defaultValue={value("help_note")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Galeri / dokumentasi</legend>
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
        <p className="admin-field-help">
          TODO (Fase 4): unggah file ke Supabase Storage. Saat ini item galeri
          hanya bisa merujuk aset media yang sudah ada di tabel media_assets.
          {mediaAssets.length === 0
            ? " Belum ada aset media di database."
            : ` Aset tersedia: ${mediaAssets.length} (lihat daftar di bawah).`}
        </p>
        {mediaAssets.length > 0 ? (
          <ul>
            {mediaAssets.map((asset) => (
              <li key={asset.id}>
                <code>{asset.id}</code> — {asset.storage_path}
                {asset.alt_text ? ` (${asset.alt_text})` : ""}
              </li>
            ))}
          </ul>
        ) : null}
        {gallery.length === 0 ? (
          <p className="admin-field-help">Belum ada item galeri.</p>
        ) : null}
        {gallery.map((row, index) => (
          <div className="admin-settings-grid" key={row.clientId}>
            <div className="admin-form-field admin-settings-wide">
              <Label htmlFor={`gallery-media-${row.clientId}`} required>
                ID aset media {index + 1}
              </Label>
              <Input
                id={`gallery-media-${row.clientId}`}
                onChange={(event) =>
                  update(row.clientId, { media_asset_id: event.target.value })
                }
                placeholder="UUID dari media_assets"
                required
                value={row.media_asset_id}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`gallery-title-${row.clientId}`}>Judul</Label>
              <Input
                id={`gallery-title-${row.clientId}`}
                maxLength={200}
                onChange={(event) =>
                  update(row.clientId, { title: event.target.value })
                }
                value={row.title}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`gallery-alt-${row.clientId}`}>Teks alt</Label>
              <Input
                id={`gallery-alt-${row.clientId}`}
                maxLength={200}
                onChange={(event) =>
                  update(row.clientId, { alt_override: event.target.value })
                }
                value={row.alt_override}
              />
            </div>
            <div className="admin-form-field admin-settings-wide">
              <Label htmlFor={`gallery-caption-${row.clientId}`}>Caption</Label>
              <Input
                id={`gallery-caption-${row.clientId}`}
                maxLength={500}
                onChange={(event) =>
                  update(row.clientId, { caption: event.target.value })
                }
                value={row.caption}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`gallery-order-${row.clientId}`}>Urutan</Label>
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
            </div>
            <div className="admin-row-actions admin-settings-wide">
              <Button
                onClick={() =>
                  setGallery((rows) => moveRow(rows, row.clientId, -1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Naik
              </Button>
              <Button
                onClick={() =>
                  setGallery((rows) => moveRow(rows, row.clientId, 1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Turun
              </Button>
              <Button
                onClick={() => removeItem(row.clientId, row.title)}
                size="small"
                type="button"
                variant="secondary"
              >
                Hapus
              </Button>
            </div>
          </div>
        ))}
        <div className="admin-row-actions">
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
            size="small"
            type="button"
            variant="secondary"
          >
            Tambah item galeri
          </Button>
        </div>
      </fieldset>

      <div className="admin-settings-actions">
        <Button disabled={pending} type="submit">
          {hasDraft ? "Simpan draf" : "Buat draf dan simpan"}
        </Button>
      </div>
    </form>
  );
}
