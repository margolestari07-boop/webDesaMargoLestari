"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { saveProfileDraft } from "./actions";

export type BoundaryRow = {
  direction: "north" | "south" | "east" | "west";
  label: string;
  description: string;
  source_note: string;
  sort_order: string;
};

export type DocumentRow = {
  clientId: string;
  title: string;
  doc_type: string;
  description: string;
  storage_path: string;
  mime_type: string;
  size_bytes: string;
  alt_text: string;
  sort_order: string;
  is_public: boolean;
};

const DIRECTION_LABELS: Record<BoundaryRow["direction"], string> = {
  north: "Utara",
  south: "Selatan",
  east: "Timur",
  west: "Barat",
};

function newClientId(): string {
  return `doc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ProfileForm({
  initialValues,
  initialBoundaries,
  initialDocuments,
  hasDraft,
}: {
  initialValues: Record<string, string>;
  initialBoundaries: BoundaryRow[];
  initialDocuments: DocumentRow[];
  hasDraft: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    saveProfileDraft,
    idleFormState,
  );
  const [boundaries, setBoundaries] =
    useState<BoundaryRow[]>(initialBoundaries);
  const [documents, setDocuments] = useState<DocumentRow[]>(initialDocuments);

  const value = (name: string) => state.values?.[name] ?? initialValues[name] ?? "";

  const removeDocument = (clientId: string, title: string) => {
    if (window.confirm(`Hapus dokumen "${title || "tanpa judul"}" dari draf?`)) {
      setDocuments((rows) => rows.filter((row) => row.clientId !== clientId));
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
        <legend>Sejarah dan wilayah</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field admin-settings-wide">
            <Label htmlFor="history_text">Narasi sejarah</Label>
            <Textarea
              error={state.fieldErrors.history_text}
              id="history_text"
              maxLength={10000}
              name="history_text"
              placeholder="Tulis narasi sejarah desa di sini. Bentuk linimasa peristiwa belum diputuskan, jadi untuk saat ini sejarah dikelola sebagai satu teks panjang."
              rows={10}
              defaultValue={value("history_text")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="area_value">Luas wilayah</Label>
            <Input
              error={state.fieldErrors.area_value}
              id="area_value"
              inputMode="decimal"
              min={0}
              name="area_value"
              step="0.01"
              type="number"
              defaultValue={value("area_value")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="area_unit">Satuan luas</Label>
            <Input
              error={state.fieldErrors.area_unit}
              id="area_unit"
              maxLength={20}
              name="area_unit"
              placeholder="Contoh: ha"
              defaultValue={value("area_unit")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="population_count">Jumlah penduduk</Label>
            <Input
              error={state.fieldErrors.population_count}
              id="population_count"
              inputMode="numeric"
              min={0}
              name="population_count"
              type="number"
              defaultValue={value("population_count")}
            />
            <p className="admin-field-help">
              Angka di sini hanya pengisi profil; angka resmi kependudukan
              dikelola di modul Kependudukan.
            </p>
          </div>
          <div className="admin-form-field">
            <Label htmlFor="distance_to_capital_value">
              Jarak ke ibu kota
            </Label>
            <Input
              error={state.fieldErrors.distance_to_capital_value}
              id="distance_to_capital_value"
              inputMode="decimal"
              min={0}
              name="distance_to_capital_value"
              step="0.01"
              type="number"
              defaultValue={value("distance_to_capital_value")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="distance_to_capital_unit">Satuan jarak</Label>
            <Input
              error={state.fieldErrors.distance_to_capital_unit}
              id="distance_to_capital_unit"
              maxLength={20}
              name="distance_to_capital_unit"
              placeholder="Contoh: km"
              defaultValue={value("distance_to_capital_unit")}
            />
          </div>
          <div className="admin-form-field admin-settings-wide">
            <Label htmlFor="source_note">Catatan sumber</Label>
            <Input
              error={state.fieldErrors.source_note}
              id="source_note"
              maxLength={500}
              name="source_note"
              defaultValue={value("source_note")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Batas wilayah (4 arah)</legend>
        <input
          name="boundaries_json"
          type="hidden"
          value={JSON.stringify(
            boundaries
              .filter((row) => row.label.trim() !== "")
              .map((row, index) => ({
                direction: row.direction,
                label: row.label,
                description: row.description,
                source_note: row.source_note,
                sort_order:
                  row.sort_order === "" ? index : Number(row.sort_order),
              })),
          )}
        />
        <p className="admin-field-help">
          Setiap arah hanya boleh ada satu baris. Mengosongkan label suatu
          arah akan menghapus batas arah tersebut dari draf.
        </p>
        {boundaries.map((row) => (
          <div className="admin-settings-grid" key={row.direction}>
            <div className="admin-form-field">
              <Label htmlFor={`boundary-label-${row.direction}`}>
                Batas {DIRECTION_LABELS[row.direction]}
              </Label>
              <Input
                id={`boundary-label-${row.direction}`}
                maxLength={200}
                onChange={(event) =>
                  setBoundaries((rows) =>
                    rows.map((item) =>
                      item.direction === row.direction
                        ? { ...item, label: event.target.value }
                        : item,
                    ),
                  )
                }
                placeholder="Contoh: Desa Karang Rejo"
                value={row.label}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`boundary-note-${row.direction}`}>
                Catatan sumber
              </Label>
              <Input
                id={`boundary-note-${row.direction}`}
                maxLength={500}
                onChange={(event) =>
                  setBoundaries((rows) =>
                    rows.map((item) =>
                      item.direction === row.direction
                        ? { ...item, source_note: event.target.value }
                        : item,
                    ),
                  )
                }
                value={row.source_note}
              />
            </div>
            <div className="admin-form-field admin-settings-wide">
              <Label htmlFor={`boundary-desc-${row.direction}`}>Uraian</Label>
              <Input
                id={`boundary-desc-${row.direction}`}
                maxLength={500}
                onChange={(event) =>
                  setBoundaries((rows) =>
                    rows.map((item) =>
                      item.direction === row.direction
                        ? { ...item, description: event.target.value }
                        : item,
                    ),
                  )
                }
                value={row.description}
              />
            </div>
          </div>
        ))}
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Dokumen desa (metadata saja)</legend>
        <input
          name="documents_json"
          type="hidden"
          value={JSON.stringify(
            documents.map((row, index) => ({
              title: row.title,
              doc_type: row.doc_type,
              description: row.description,
              storage_path: row.storage_path,
              mime_type: row.mime_type,
              size_bytes: row.size_bytes,
              alt_text: row.alt_text,
              sort_order:
                row.sort_order === "" ? index : Number(row.sort_order),
              is_public: row.is_public,
            })),
          )}
        />
        <p className="admin-field-help">
          TODO (Fase 4): unggah file ke Supabase Storage. Saat ini hanya
          metadata yang disimpan; isi kolom lokasi file dengan path/penanda
          file secara manual.
        </p>
        {documents.length === 0 ? (
          <p className="admin-field-help">Belum ada dokumen.</p>
        ) : null}
        {documents.map((row, index) => (
          <div className="admin-settings-grid" key={row.clientId}>
            <div className="admin-form-field">
              <Label htmlFor={`doc-title-${row.clientId}`} required>
                Judul dokumen {index + 1}
              </Label>
              <Input
                id={`doc-title-${row.clientId}`}
                maxLength={200}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, title: event.target.value }
                        : item,
                    ),
                  )
                }
                required
                value={row.title}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`doc-type-${row.clientId}`} required>
                Jenis dokumen
              </Label>
              <Input
                id={`doc-type-${row.clientId}`}
                maxLength={100}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, doc_type: event.target.value }
                        : item,
                    ),
                  )
                }
                placeholder="Contoh: PDF"
                required
                value={row.doc_type}
              />
            </div>
            <div className="admin-form-field admin-settings-wide">
              <Label htmlFor={`doc-path-${row.clientId}`} required>
                Lokasi file
              </Label>
              <Input
                id={`doc-path-${row.clientId}`}
                maxLength={500}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, storage_path: event.target.value }
                        : item,
                    ),
                  )
                }
                placeholder="Path di Storage (diisi manual sampai Fase 4)"
                required
                value={row.storage_path}
              />
            </div>
            <div className="admin-form-field admin-settings-wide">
              <Label htmlFor={`doc-desc-${row.clientId}`}>Deskripsi</Label>
              <Input
                id={`doc-desc-${row.clientId}`}
                maxLength={500}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, description: event.target.value }
                        : item,
                    ),
                  )
                }
                value={row.description}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`doc-mime-${row.clientId}`}>Tipe MIME</Label>
              <Input
                id={`doc-mime-${row.clientId}`}
                maxLength={120}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, mime_type: event.target.value }
                        : item,
                    ),
                  )
                }
                placeholder="Contoh: application/pdf"
                value={row.mime_type}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`doc-size-${row.clientId}`}>Ukuran (byte)</Label>
              <Input
                id={`doc-size-${row.clientId}`}
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, size_bytes: event.target.value }
                        : item,
                    ),
                  )
                }
                type="number"
                value={row.size_bytes}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`doc-public-${row.clientId}`}>Terlihat publik</Label>
              <Select
                id={`doc-public-${row.clientId}`}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, is_public: event.target.value === "true" }
                        : item,
                    ),
                  )
                }
                value={row.is_public ? "true" : "false"}
              >
                <option value="true">Ya</option>
                <option value="false">Tidak</option>
              </Select>
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`doc-order-${row.clientId}`}>Urutan</Label>
              <Input
                id={`doc-order-${row.clientId}`}
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, sort_order: event.target.value }
                        : item,
                    ),
                  )
                }
                type="number"
                value={row.sort_order}
              />
            </div>
            <div className="admin-row-actions admin-settings-wide">
              <Button
                onClick={() => removeDocument(row.clientId, row.title)}
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
              setDocuments((rows) => [
                ...rows,
                {
                  clientId: newClientId(),
                  title: "",
                  doc_type: "",
                  description: "",
                  storage_path: "",
                  mime_type: "",
                  size_bytes: "",
                  alt_text: "",
                  sort_order: String(rows.length),
                  is_public: true,
                },
              ])
            }
            size="small"
            type="button"
            variant="secondary"
          >
            Tambah dokumen
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
