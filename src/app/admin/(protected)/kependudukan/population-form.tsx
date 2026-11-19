"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { savePopulationDraft } from "./actions";

export type AreaUseRow = {
  clientId: string;
  category: string;
  area_value: string;
  area_unit: string;
  sort_order: string;
  source_note: string;
};

export type OccupationRow = {
  clientId: string;
  name: string;
  person_count: string;
  sort_order: string;
  source_note: string;
};

function newClientId(): string {
  return `row-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

export function PopulationForm({
  initialValues,
  initialAreaUses,
  initialOccupations,
  hasDraft,
}: {
  initialValues: Record<string, string>;
  initialAreaUses: AreaUseRow[];
  initialOccupations: OccupationRow[];
  hasDraft: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    savePopulationDraft,
    idleFormState,
  );
  const [areaUses, setAreaUses] = useState<AreaUseRow[]>(initialAreaUses);
  const [occupations, setOccupations] =
    useState<OccupationRow[]>(initialOccupations);

  const value = (name: string) => state.values?.[name] ?? initialValues[name] ?? "";

  const removeAreaUse = (clientId: string) => {
    if (window.confirm("Hapus kategori penggunaan wilayah ini dari draf?")) {
      setAreaUses((rows) => rows.filter((row) => row.clientId !== clientId));
    }
  };
  const removeOccupation = (clientId: string) => {
    if (window.confirm("Hapus kategori pekerjaan ini dari draf?")) {
      setOccupations((rows) =>
        rows.filter((row) => row.clientId !== clientId),
      );
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
        <legend>Laporan</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field">
            <Label htmlFor="period_label" required>
              Periode laporan
            </Label>
            <Input
              error={state.fieldErrors.period_label}
              id="period_label"
              maxLength={200}
              name="period_label"
              placeholder="Contoh: Semester 1 Tahun 2025"
              required
              defaultValue={value("period_label")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="source_name">Sumber data</Label>
            <Input
              error={state.fieldErrors.source_name}
              id="source_name"
              maxLength={200}
              name="source_name"
              placeholder="Contoh: Profil Desa 2025"
              defaultValue={value("source_name")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="period_start">Tanggal mulai periode</Label>
            <Input
              error={state.fieldErrors.period_start}
              id="period_start"
              name="period_start"
              type="date"
              defaultValue={value("period_start")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="period_end">Tanggal akhir periode</Label>
            <Input
              error={state.fieldErrors.period_end}
              id="period_end"
              name="period_end"
              type="date"
              defaultValue={value("period_end")}
            />
          </div>
          <div className="admin-form-field admin-settings-wide">
            <Label htmlFor="source_reference">Referensi sumber</Label>
            <Textarea
              error={state.fieldErrors.source_reference}
              id="source_reference"
              maxLength={500}
              name="source_reference"
              rows={2}
              defaultValue={value("source_reference")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="data_updated_at">Data terakhir diperbarui</Label>
            <Input
              error={state.fieldErrors.data_updated_at}
              id="data_updated_at"
              name="data_updated_at"
              type="datetime-local"
              defaultValue={value("data_updated_at")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Agregat penduduk</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field">
            <Label htmlFor="total_population">Total penduduk</Label>
            <Input
              error={state.fieldErrors.total_population}
              id="total_population"
              inputMode="numeric"
              min={0}
              name="total_population"
              type="number"
              defaultValue={value("total_population")}
            />
            <p className="admin-field-help">
              Bila total, laki-laki, dan perempuan ketiganya terisi,
              laki-laki + perempuan harus sama dengan total.
            </p>
          </div>
          <div className="admin-form-field">
            <Label htmlFor="total_households">Jumlah KK</Label>
            <Input
              error={state.fieldErrors.total_households}
              id="total_households"
              inputMode="numeric"
              min={0}
              name="total_households"
              type="number"
              defaultValue={value("total_households")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="male_count">Laki-laki</Label>
            <Input
              error={state.fieldErrors.male_count}
              id="male_count"
              inputMode="numeric"
              min={0}
              name="male_count"
              type="number"
              defaultValue={value("male_count")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="female_count">Perempuan</Label>
            <Input
              error={state.fieldErrors.female_count}
              id="female_count"
              inputMode="numeric"
              min={0}
              name="female_count"
              type="number"
              defaultValue={value("female_count")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="productive_age_count">Usia produktif</Label>
            <Input
              error={state.fieldErrors.productive_age_count}
              id="productive_age_count"
              inputMode="numeric"
              min={0}
              name="productive_age_count"
              type="number"
              defaultValue={value("productive_age_count")}
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
            <p className="admin-field-help">
              Satuan wajib diisi saat luas wilayah terisi.
            </p>
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Penggunaan wilayah</legend>
        <input
          name="area_uses_json"
          type="hidden"
          value={JSON.stringify(
            areaUses.map((row, index) => ({
              category: row.category,
              area_value: row.area_value,
              area_unit: row.area_unit,
              sort_order: row.sort_order === "" ? index : Number(row.sort_order),
              source_note: row.source_note,
            })),
          )}
        />
        {areaUses.length === 0 ? (
          <p className="admin-field-help">
            Belum ada kategori. Tambahkan kategori sesuai dokumen sumber.
          </p>
        ) : null}
        {areaUses.map((row, index) => (
          <div className="admin-settings-grid" key={row.clientId}>
            <div className="admin-form-field">
              <Label htmlFor={`area-category-${row.clientId}`} required>
                Kategori {index + 1}
              </Label>
              <Input
                id={`area-category-${row.clientId}`}
                maxLength={120}
                onChange={(event) =>
                  setAreaUses((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, category: event.target.value }
                        : item,
                    ),
                  )
                }
                required
                value={row.category}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`area-value-${row.clientId}`}>Luas</Label>
              <Input
                id={`area-value-${row.clientId}`}
                inputMode="decimal"
                min={0}
                onChange={(event) =>
                  setAreaUses((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, area_value: event.target.value }
                        : item,
                    ),
                  )
                }
                step="0.01"
                type="number"
                value={row.area_value}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`area-unit-${row.clientId}`}>Satuan</Label>
              <Input
                id={`area-unit-${row.clientId}`}
                maxLength={20}
                onChange={(event) =>
                  setAreaUses((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, area_unit: event.target.value }
                        : item,
                    ),
                  )
                }
                value={row.area_unit}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`area-order-${row.clientId}`}>Urutan</Label>
              <Input
                id={`area-order-${row.clientId}`}
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  setAreaUses((rows) =>
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
            <div className="admin-form-field admin-settings-wide">
              <Label htmlFor={`area-note-${row.clientId}`}>Catatan sumber</Label>
              <Input
                id={`area-note-${row.clientId}`}
                maxLength={500}
                onChange={(event) =>
                  setAreaUses((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, source_note: event.target.value }
                        : item,
                    ),
                  )
                }
                value={row.source_note}
              />
            </div>
            <div className="admin-row-actions admin-settings-wide">
              <Button
                onClick={() =>
                  setAreaUses((rows) => moveRow(rows, row.clientId, -1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Naik
              </Button>
              <Button
                onClick={() =>
                  setAreaUses((rows) => moveRow(rows, row.clientId, 1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Turun
              </Button>
              <Button
                onClick={() => removeAreaUse(row.clientId)}
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
              setAreaUses((rows) => [
                ...rows,
                {
                  clientId: newClientId(),
                  category: "",
                  area_value: "",
                  area_unit: "",
                  sort_order: String(rows.length),
                  source_note: "",
                },
              ])
            }
            size="small"
            type="button"
            variant="secondary"
          >
            Tambah kategori
          </Button>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Pekerjaan</legend>
        <input
          name="occupations_json"
          type="hidden"
          value={JSON.stringify(
            occupations.map((row, index) => ({
              name: row.name,
              person_count: row.person_count,
              sort_order:
                row.sort_order === "" ? index : Number(row.sort_order),
              source_note: row.source_note,
            })),
          )}
        />
        {occupations.length === 0 ? (
          <p className="admin-field-help">
            Belum ada kategori pekerjaan. Jumlah boleh kosong bila dokumen
            sumber tidak menyebutkannya.
          </p>
        ) : null}
        {occupations.map((row, index) => (
          <div className="admin-settings-grid" key={row.clientId}>
            <div className="admin-form-field">
              <Label htmlFor={`job-name-${row.clientId}`} required>
                Pekerjaan {index + 1}
              </Label>
              <Input
                id={`job-name-${row.clientId}`}
                maxLength={120}
                onChange={(event) =>
                  setOccupations((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, name: event.target.value }
                        : item,
                    ),
                  )
                }
                required
                value={row.name}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`job-count-${row.clientId}`}>Jumlah orang</Label>
              <Input
                id={`job-count-${row.clientId}`}
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  setOccupations((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, person_count: event.target.value }
                        : item,
                    ),
                  )
                }
                type="number"
                value={row.person_count}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`job-order-${row.clientId}`}>Urutan</Label>
              <Input
                id={`job-order-${row.clientId}`}
                inputMode="numeric"
                min={0}
                onChange={(event) =>
                  setOccupations((rows) =>
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
            <div className="admin-form-field">
              <Label htmlFor={`job-note-${row.clientId}`}>Catatan sumber</Label>
              <Input
                id={`job-note-${row.clientId}`}
                maxLength={500}
                onChange={(event) =>
                  setOccupations((rows) =>
                    rows.map((item) =>
                      item.clientId === row.clientId
                        ? { ...item, source_note: event.target.value }
                        : item,
                    ),
                  )
                }
                value={row.source_note}
              />
            </div>
            <div className="admin-row-actions admin-settings-wide">
              <Button
                onClick={() =>
                  setOccupations((rows) => moveRow(rows, row.clientId, -1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Naik
              </Button>
              <Button
                onClick={() =>
                  setOccupations((rows) => moveRow(rows, row.clientId, 1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Turun
              </Button>
              <Button
                onClick={() => removeOccupation(row.clientId)}
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
              setOccupations((rows) => [
                ...rows,
                {
                  clientId: newClientId(),
                  name: "",
                  person_count: "",
                  sort_order: String(rows.length),
                  source_note: "",
                },
              ])
            }
            size="small"
            type="button"
            variant="secondary"
          >
            Tambah pekerjaan
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
