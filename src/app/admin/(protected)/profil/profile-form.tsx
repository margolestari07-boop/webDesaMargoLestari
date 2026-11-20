"use client";

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
import { saveProfile } from "./actions";

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
}: {
  initialValues: Record<string, string>;
  initialBoundaries: BoundaryRow[];
  initialDocuments: DocumentRow[];
}) {
  const [state, formAction, pending] = useActionState(
    saveProfile,
    idleFormState,
  );
  const [boundaries, setBoundaries] =
    useState<BoundaryRow[]>(initialBoundaries);
  const [documents, setDocuments] = useState<DocumentRow[]>(initialDocuments);

  const value = (name: string) => state.values?.[name] ?? initialValues[name] ?? "";

  const removeDocument = (clientId: string, title: string) => {
    if (window.confirm(`Hapus dokumen "${title || "tanpa judul"}"?`)) {
      setDocuments((rows) => rows.filter((row) => row.clientId !== clientId));
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

      <ComponentCard title="Sejarah dan wilayah">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.history_text)}>
              <FieldLabel htmlFor="history_text">Narasi sejarah</FieldLabel>
              <Textarea
                aria-invalid={
                  state.fieldErrors.history_text ? true : undefined
                }
                defaultValue={value("history_text")}
                id="history_text"
                maxLength={10000}
                name="history_text"
                placeholder="Tulis narasi sejarah desa di sini. Bentuk linimasa peristiwa belum diputuskan, jadi untuk saat ini sejarah dikelola sebagai satu teks panjang."
                rows={10}
              />
              <FieldError
                errors={
                  state.fieldErrors.history_text
                    ? [{ message: state.fieldErrors.history_text }]
                    : undefined
                }
              />
            </Field>
          </div>
          <Field data-invalid={Boolean(state.fieldErrors.area_value)}>
            <FieldLabel htmlFor="area_value">Luas wilayah</FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.area_value ? true : undefined
              }
              defaultValue={value("area_value")}
              id="area_value"
              inputMode="decimal"
              min={0}
              name="area_value"
              step="0.01"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.area_value
                  ? [{ message: state.fieldErrors.area_value }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.area_unit)}>
            <FieldLabel htmlFor="area_unit">Satuan luas</FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.area_unit ? true : undefined
              }
              defaultValue={value("area_unit")}
              id="area_unit"
              maxLength={20}
              name="area_unit"
              placeholder="Contoh: ha"
            />
            <FieldError
              errors={
                state.fieldErrors.area_unit
                  ? [{ message: state.fieldErrors.area_unit }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.population_count)}>
            <FieldLabel htmlFor="population_count">
              Jumlah penduduk
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.population_count ? true : undefined
              }
              defaultValue={value("population_count")}
              id="population_count"
              inputMode="numeric"
              min={0}
              name="population_count"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.population_count
                  ? [{ message: state.fieldErrors.population_count }]
                  : undefined
              }
            />
            <FieldDescription>
              Angka di sini hanya pengisi profil; angka resmi kependudukan
              dikelola di modul Kependudukan.
            </FieldDescription>
          </Field>
          <Field
            data-invalid={Boolean(
              state.fieldErrors.distance_to_capital_value,
            )}
          >
            <FieldLabel htmlFor="distance_to_capital_value">
              Jarak ke ibu kota
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.distance_to_capital_value ? true : undefined
              }
              defaultValue={value("distance_to_capital_value")}
              id="distance_to_capital_value"
              inputMode="decimal"
              min={0}
              name="distance_to_capital_value"
              step="0.01"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.distance_to_capital_value
                  ? [
                      {
                        message: state.fieldErrors.distance_to_capital_value,
                      },
                    ]
                  : undefined
              }
            />
          </Field>
          <Field
            data-invalid={Boolean(
              state.fieldErrors.distance_to_capital_unit,
            )}
          >
            <FieldLabel htmlFor="distance_to_capital_unit">
              Satuan jarak
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.distance_to_capital_unit ? true : undefined
              }
              defaultValue={value("distance_to_capital_unit")}
              id="distance_to_capital_unit"
              maxLength={20}
              name="distance_to_capital_unit"
              placeholder="Contoh: km"
            />
            <FieldError
              errors={
                state.fieldErrors.distance_to_capital_unit
                  ? [
                      {
                        message: state.fieldErrors.distance_to_capital_unit,
                      },
                    ]
                  : undefined
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.source_note)}>
              <FieldLabel htmlFor="source_note">Catatan sumber</FieldLabel>
              <Input
                aria-invalid={
                  state.fieldErrors.source_note ? true : undefined
                }
                defaultValue={value("source_note")}
                id="source_note"
                maxLength={500}
                name="source_note"
              />
              <FieldError
                errors={
                  state.fieldErrors.source_note
                    ? [{ message: state.fieldErrors.source_note }]
                    : undefined
                }
              />
            </Field>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Batas wilayah (4 arah)">
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
        <FieldDescription>
          Setiap arah hanya boleh ada satu baris. Mengosongkan label suatu
          arah akan menghapus batas arah tersebut dari daftar ini.
        </FieldDescription>
        {boundaries.map((row) => (
          <div
            className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-2 dark:border-gray-800"
            key={row.direction}
          >
            <Field>
              <FieldLabel htmlFor={`boundary-label-${row.direction}`}>
                Batas {DIRECTION_LABELS[row.direction]}
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`boundary-note-${row.direction}`}>
                Catatan sumber
              </FieldLabel>
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
            </Field>
            <div className="sm:col-span-2">
              <Field>
                <FieldLabel htmlFor={`boundary-desc-${row.direction}`}>
                  Uraian
                </FieldLabel>
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
              </Field>
            </div>
          </div>
        ))}
      </ComponentCard>

      <ComponentCard title="Dokumen desa (metadata saja)">
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
        <FieldDescription>
          TODO (Fase 4): unggah file ke Supabase Storage. Saat ini hanya
          metadata yang disimpan; isi kolom lokasi file dengan path/penanda
          file secara manual.
        </FieldDescription>
        {documents.length === 0 ? (
          <FieldDescription>Belum ada dokumen.</FieldDescription>
        ) : null}
        {documents.map((row, index) => (
          <div
            className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-2 dark:border-gray-800"
            key={row.clientId}
          >
            <Field>
              <FieldLabel htmlFor={`doc-title-${row.clientId}`}>
                Judul dokumen {index + 1}{" "}
                <span className="text-red-500">*</span>
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`doc-type-${row.clientId}`}>
                Jenis dokumen <span className="text-red-500">*</span>
              </FieldLabel>
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
            </Field>
            <div className="sm:col-span-2">
              <Field>
                <FieldLabel htmlFor={`doc-path-${row.clientId}`}>
                  Lokasi file <span className="text-red-500">*</span>
                </FieldLabel>
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
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field>
                <FieldLabel htmlFor={`doc-desc-${row.clientId}`}>
                  Deskripsi
                </FieldLabel>
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
              </Field>
            </div>
            <Field>
              <FieldLabel htmlFor={`doc-mime-${row.clientId}`}>
                Tipe MIME
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`doc-size-${row.clientId}`}>
                Ukuran (byte)
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`doc-public-${row.clientId}`}>
                Terlihat publik
              </FieldLabel>
              <Select
                onValueChange={(value) =>
                  setDocuments((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, is_public: value === "true" }
                        : item,
                    ),
                  )
                }
                value={row.is_public ? "true" : "false"}
              >
                <SelectTrigger id={`doc-public-${row.clientId}`}>
                  <SelectValue placeholder="Pilih..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Ya</SelectItem>
                  <SelectItem value="false">Tidak</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel htmlFor={`doc-order-${row.clientId}`}>
                Urutan
              </FieldLabel>
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
            </Field>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button
                onClick={() => removeDocument(row.clientId, row.title)}
                size="sm"
                type="button"
                variant="outline"
              >
                Hapus
              </Button>
            </div>
          </div>
        ))}
        <div className="flex flex-wrap gap-2">
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
            size="sm"
            type="button"
            variant="outline"
          >
            Tambah dokumen
          </Button>
        </div>
      </ComponentCard>

      <div className="flex justify-end">
        <Button disabled={pending} type="submit">
          Simpan perubahan
        </Button>
      </div>
    </form>
  );
}
