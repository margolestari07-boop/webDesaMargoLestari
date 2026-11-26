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
import { Textarea } from "@/components/tailadmin/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { savePopulation } from "./actions";
import { FloatingSaveBar } from "../_components/floating-save-bar";

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

// Form modul Kependudukan dengan komponen form TailAdmin asli (Field,
// FieldLabel, Input, Textarea, Button, ComponentCard). Logika — nama field,
// state baris, validasi, dan aksi simpan — tidak berubah.
export function PopulationForm({
  initialValues,
  initialAreaUses,
  initialOccupations,
}: {
  initialValues: Record<string, string>;
  initialAreaUses: AreaUseRow[];
  initialOccupations: OccupationRow[];
}) {
  const [state, formAction, pending] = useActionState(
    savePopulation,
    idleFormState,
  );
  const [areaUses, setAreaUses] = useState<AreaUseRow[]>(initialAreaUses);
  const [occupations, setOccupations] =
    useState<OccupationRow[]>(initialOccupations);

  const value = (name: string) => state.values?.[name] ?? initialValues[name] ?? "";

  const removeAreaUse = (clientId: string) => {
    if (window.confirm("Hapus kategori penggunaan wilayah ini?")) {
      setAreaUses((rows) => rows.filter((row) => row.clientId !== clientId));
    }
  };
  const removeOccupation = (clientId: string) => {
    if (window.confirm("Hapus kategori pekerjaan ini?")) {
      setOccupations((rows) =>
        rows.filter((row) => row.clientId !== clientId),
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
      {state.fieldErrors.rows ? (
        <Alert role="alert" variant="destructive">
          <AlertDescription>{state.fieldErrors.rows}</AlertDescription>
        </Alert>
      ) : null}

      <ComponentCard title="Laporan">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors.period_label)}>
            <FieldLabel htmlFor="period_label">
              Periode laporan <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.period_label ? true : undefined
              }
              defaultValue={value("period_label")}
              id="period_label"
              maxLength={200}
              name="period_label"
              placeholder="Contoh: Semester 1 Tahun 2025"
              required
            />
            <FieldError
              errors={
                state.fieldErrors.period_label
                  ? [{ message: state.fieldErrors.period_label }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.source_name)}>
            <FieldLabel htmlFor="source_name">Sumber data</FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.source_name ? true : undefined
              }
              defaultValue={value("source_name")}
              id="source_name"
              maxLength={200}
              name="source_name"
              placeholder="Contoh: Profil Desa 2025"
            />
            <FieldError
              errors={
                state.fieldErrors.source_name
                  ? [{ message: state.fieldErrors.source_name }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.period_start)}>
            <FieldLabel htmlFor="period_start">
              Tanggal mulai periode
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.period_start ? true : undefined
              }
              defaultValue={value("period_start")}
              id="period_start"
              name="period_start"
              type="date"
            />
            <FieldError
              errors={
                state.fieldErrors.period_start
                  ? [{ message: state.fieldErrors.period_start }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.period_end)}>
            <FieldLabel htmlFor="period_end">Tanggal akhir periode</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.period_end ? true : undefined}
              defaultValue={value("period_end")}
              id="period_end"
              name="period_end"
              type="date"
            />
            <FieldError
              errors={
                state.fieldErrors.period_end
                  ? [{ message: state.fieldErrors.period_end }]
                  : undefined
              }
            />
          </Field>
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.source_reference)}>
              <FieldLabel htmlFor="source_reference">
                Referensi sumber
              </FieldLabel>
              <Textarea
                aria-invalid={
                  state.fieldErrors.source_reference ? true : undefined
                }
                defaultValue={value("source_reference")}
                id="source_reference"
                maxLength={500}
                name="source_reference"
                rows={2}
              />
              <FieldError
                errors={
                  state.fieldErrors.source_reference
                    ? [{ message: state.fieldErrors.source_reference }]
                    : undefined
                }
              />
            </Field>
          </div>
        </div>
      </ComponentCard>

      <ComponentCard title="Agregat penduduk">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors.total_population)}>
            <FieldLabel htmlFor="total_population">Total penduduk</FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.total_population ? true : undefined
              }
              defaultValue={value("total_population")}
              id="total_population"
              inputMode="numeric"
              min={0}
              name="total_population"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.total_population
                  ? [{ message: state.fieldErrors.total_population }]
                  : undefined
              }
            />
            <FieldDescription>
              Bila total, laki-laki, dan perempuan ketiganya terisi,
              laki-laki + perempuan harus sama dengan total.
            </FieldDescription>
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.total_households)}>
            <FieldLabel htmlFor="total_households">Jumlah KK</FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.total_households ? true : undefined
              }
              defaultValue={value("total_households")}
              id="total_households"
              inputMode="numeric"
              min={0}
              name="total_households"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.total_households
                  ? [{ message: state.fieldErrors.total_households }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.male_count)}>
            <FieldLabel htmlFor="male_count">Laki-laki</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.male_count ? true : undefined}
              defaultValue={value("male_count")}
              id="male_count"
              inputMode="numeric"
              min={0}
              name="male_count"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.male_count
                  ? [{ message: state.fieldErrors.male_count }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.female_count)}>
            <FieldLabel htmlFor="female_count">Perempuan</FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.female_count ? true : undefined
              }
              defaultValue={value("female_count")}
              id="female_count"
              inputMode="numeric"
              min={0}
              name="female_count"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.female_count
                  ? [{ message: state.fieldErrors.female_count }]
                  : undefined
              }
            />
          </Field>
          <Field
            data-invalid={Boolean(state.fieldErrors.productive_age_count)}
          >
            <FieldLabel htmlFor="productive_age_count">
              Usia produktif
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.productive_age_count ? true : undefined
              }
              defaultValue={value("productive_age_count")}
              id="productive_age_count"
              inputMode="numeric"
              min={0}
              name="productive_age_count"
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.productive_age_count
                  ? [{ message: state.fieldErrors.productive_age_count }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.area_value)}>
            <FieldLabel htmlFor="area_value">Luas wilayah</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.area_value ? true : undefined}
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
              aria-invalid={state.fieldErrors.area_unit ? true : undefined}
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
            <FieldDescription>
              Satuan wajib diisi saat luas wilayah terisi.
            </FieldDescription>
          </Field>
        </div>
      </ComponentCard>

      <ComponentCard title="Penggunaan wilayah">
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
          <FieldDescription>
            Belum ada kategori. Tambahkan kategori sesuai dokumen sumber.
          </FieldDescription>
        ) : null}
        {areaUses.map((row, index) => (
          <div
            className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-2"
            key={row.clientId}
          >
            <Field>
              <FieldLabel htmlFor={`area-category-${row.clientId}`}>
                Kategori {index + 1} <span className="text-red-500">*</span>
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`area-value-${row.clientId}`}>
                Luas
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`area-unit-${row.clientId}`}>
                Satuan
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`area-order-${row.clientId}`}>
                Urutan
              </FieldLabel>
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
            </Field>
            <div className="sm:col-span-2">
              <Field>
                <FieldLabel htmlFor={`area-note-${row.clientId}`}>
                  Catatan sumber
                </FieldLabel>
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
              </Field>
            </div>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button
                onClick={() =>
                  setAreaUses((rows) => moveRow(rows, row.clientId, -1))
                }
                size="sm"
                type="button"
                variant="outline"
              >
                Naik
              </Button>
              <Button
                onClick={() =>
                  setAreaUses((rows) => moveRow(rows, row.clientId, 1))
                }
                size="sm"
                type="button"
                variant="outline"
              >
                Turun
              </Button>
              <Button
                onClick={() => removeAreaUse(row.clientId)}
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
            size="sm"
            type="button"
            variant="outline"
          >
            Tambah kategori
          </Button>
        </div>
      </ComponentCard>

      <ComponentCard title="Pekerjaan">
        <input
          name="occupations_json"
          type="hidden"
          value={JSON.stringify(
            occupations.map((row, index) => ({
              name: row.name,
              person_count: row.person_count,
              sort_order:
                row.sort_order === "" ? index : Number(row.sort_order),
            })),
          )}
        />
        <FieldDescription>
          Urutan tampil otomatis dari jumlah terbanyak ke tersedikit.
        </FieldDescription>
        {occupations.length === 0 ? (
          <FieldDescription>
            Belum ada kategori pekerjaan. Jumlah boleh kosong bila dokumen
            sumber tidak menyebutkannya.
          </FieldDescription>
        ) : null}
        {occupations.map((row, index) => (
          <div
            className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-2"
            key={row.clientId}
          >
            <Field>
              <FieldLabel htmlFor={`job-name-${row.clientId}`}>
                Pekerjaan {index + 1} <span className="text-red-500">*</span>
              </FieldLabel>
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
            </Field>
            <Field>
              <FieldLabel htmlFor={`job-count-${row.clientId}`}>
                Jumlah orang
              </FieldLabel>
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
            </Field>
            <div className="flex flex-wrap gap-2 sm:col-span-2">
              <Button
                onClick={() => removeOccupation(row.clientId)}
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
              setOccupations((rows) => [
                ...rows,
                {
                  clientId: newClientId(),
                  name: "",
                  person_count: "",
                  sort_order: String(rows.length),
                },
              ])
            }
            size="sm"
            type="button"
            variant="outline"
          >
            Tambah pekerjaan
          </Button>
        </div>
      </ComponentCard>

      <FloatingSaveBar pending={pending} saved={state.kind === "success"} />
    </form>
  );
}
