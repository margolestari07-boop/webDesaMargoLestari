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
import { saveApbdes } from "./actions";

export type MoneyRow = {
  clientId: string;
  /** label / nama bidang / nama sumber, tergantung kelompok. */
  label: string;
  kind: "operasional" | "pembiayaan" | "";
  budget: string;
  realization: string;
  sort_order: string;
  source_note: string;
};

function newClientId(): string {
  return `apbdes-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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

function emptyRow(): MoneyRow {
  return {
    clientId: newClientId(),
    label: "",
    kind: "",
    budget: "",
    realization: "",
    sort_order: "",
    source_note: "",
  };
}

function MoneyRowGroup({
  title,
  help,
  labelLabel,
  rows,
  setRows,
  showKind,
  addLabel,
  inputPrefix,
}: {
  title: string;
  help: string;
  labelLabel: string;
  rows: MoneyRow[];
  setRows: React.Dispatch<React.SetStateAction<MoneyRow[]>>;
  showKind: boolean;
  addLabel: string;
  inputPrefix: string;
}) {
  const update = (clientId: string, patch: Partial<MoneyRow>) => {
    setRows((items) =>
      items.map((item) =>
        item.clientId === clientId ? { ...item, ...patch } : item,
      ),
    );
  };

  const removeRow = (clientId: string, label: string) => {
    if (window.confirm(`Hapus baris "${label || "tanpa nama"}"?`)) {
      setRows((items) => items.filter((item) => item.clientId !== clientId));
    }
  };

  return (
    <ComponentCard title={title}>
      <FieldDescription>{help}</FieldDescription>
      {rows.length === 0 ? (
        <FieldDescription>Belum ada baris.</FieldDescription>
      ) : null}
      {rows.map((row, index) => (
        <div
          className="grid grid-cols-1 gap-4 border-t border-gray-100 pt-4 first:border-t-0 first:pt-0 sm:grid-cols-2"
          key={row.clientId}
        >
          {showKind ? (
            <Field>
              <FieldLabel htmlFor={`${inputPrefix}-kind-${row.clientId}`}>
                Jenis <span className="text-red-500">*</span>
              </FieldLabel>
              <Select
                onValueChange={(value) =>
                  update(row.clientId, {
                    kind: value ?? "",
                  })
                }
                value={row.kind}
              >
                <SelectTrigger id={`${inputPrefix}-kind-${row.clientId}`}>
                  <SelectValue placeholder="Pilih..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Pilih jenis</SelectItem>
                  <SelectItem value="operasional">Operasional</SelectItem>
                  <SelectItem value="pembiayaan">Pembiayaan</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          ) : null}
          <Field>
            <FieldLabel htmlFor={`${inputPrefix}-label-${row.clientId}`}>
              {labelLabel} {index + 1}{" "}
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              id={`${inputPrefix}-label-${row.clientId}`}
              maxLength={200}
              onChange={(event) =>
                update(row.clientId, { label: event.target.value })
              }
              required
              value={row.label}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${inputPrefix}-budget-${row.clientId}`}>
              Pagu (Rp)
            </FieldLabel>
            <Input
              id={`${inputPrefix}-budget-${row.clientId}`}
              inputMode="decimal"
              min={0}
              onChange={(event) =>
                update(row.clientId, { budget: event.target.value })
              }
              step="0.01"
              type="number"
              value={row.budget}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${inputPrefix}-real-${row.clientId}`}>
              Realisasi (Rp)
            </FieldLabel>
            <Input
              id={`${inputPrefix}-real-${row.clientId}`}
              inputMode="decimal"
              min={0}
              onChange={(event) =>
                update(row.clientId, { realization: event.target.value })
              }
              step="0.01"
              type="number"
              value={row.realization}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${inputPrefix}-order-${row.clientId}`}>
              Urutan
            </FieldLabel>
            <Input
              id={`${inputPrefix}-order-${row.clientId}`}
              inputMode="numeric"
              min={0}
              onChange={(event) =>
                update(row.clientId, { sort_order: event.target.value })
              }
              type="number"
              value={row.sort_order}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor={`${inputPrefix}-note-${row.clientId}`}>
              Catatan sumber
            </FieldLabel>
            <Input
              id={`${inputPrefix}-note-${row.clientId}`}
              maxLength={500}
              onChange={(event) =>
                update(row.clientId, { source_note: event.target.value })
              }
              value={row.source_note}
            />
          </Field>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <Button
              onClick={() => setRows((items) => moveRow(items, row.clientId, -1))}
              size="sm"
              type="button"
              variant="outline"
            >
              Naik
            </Button>
            <Button
              onClick={() => setRows((items) => moveRow(items, row.clientId, 1))}
              size="sm"
              type="button"
              variant="outline"
            >
              Turun
            </Button>
            <Button
              onClick={() => removeRow(row.clientId, row.label)}
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
            setRows((items) => [
              ...items,
              { ...emptyRow(), sort_order: String(items.length) },
            ])
          }
          size="sm"
          type="button"
          variant="outline"
        >
          {addLabel}
        </Button>
      </div>
    </ComponentCard>
  );
}

export function ApbdesForm({
  initialValues,
  initialRealizations,
  initialSpendingFields,
  initialRevenueSources,
}: {
  initialValues: Record<string, string>;
  initialRealizations: MoneyRow[];
  initialSpendingFields: MoneyRow[];
  initialRevenueSources: MoneyRow[];
}) {
  const [state, formAction, pending] = useActionState(
    saveApbdes,
    idleFormState,
  );
  const [realizations, setRealizations] =
    useState<MoneyRow[]>(initialRealizations);
  const [spendingFields, setSpendingFields] =
    useState<MoneyRow[]>(initialSpendingFields);
  const [revenueSources, setRevenueSources] =
    useState<MoneyRow[]>(initialRevenueSources);

  const value = (name: string) => state.values?.[name] ?? initialValues[name] ?? "";

  const toJson = (rows: MoneyRow[], mapLabel: (row: MoneyRow) => object) =>
    JSON.stringify(
      rows.map((row, index) => ({
        ...mapLabel(row),
        budget: row.budget,
        realization: row.realization,
        sort_order: row.sort_order === "" ? index : Number(row.sort_order),
        source_note: row.source_note,
      })),
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
      {state.fieldErrors.rows ? (
        <Alert role="alert" variant="destructive">
          <AlertDescription>{state.fieldErrors.rows}</AlertDescription>
        </Alert>
      ) : null}

      <input
        name="realizations_json"
        type="hidden"
        value={toJson(realizations, (row) => ({
          kind: row.kind,
          label: row.label,
        }))}
      />
      <input
        name="spending_fields_json"
        type="hidden"
        value={toJson(spendingFields, (row) => ({ field_name: row.label }))}
      />
      <input
        name="revenue_sources_json"
        type="hidden"
        value={toJson(revenueSources, (row) => ({ source_name: row.label }))}
      />

      <ComponentCard title="Laporan">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors.fiscal_year)}>
            <FieldLabel htmlFor="fiscal_year">
              Tahun anggaran <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.fiscal_year ? true : undefined
              }
              defaultValue={value("fiscal_year")}
              id="fiscal_year"
              inputMode="numeric"
              max={2100}
              min={2000}
              name="fiscal_year"
              required
              type="number"
            />
            <FieldError
              errors={
                state.fieldErrors.fiscal_year
                  ? [{ message: state.fieldErrors.fiscal_year }]
                  : undefined
              }
            />
          </Field>
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
              placeholder="Contoh: APBDes Tahun 2024"
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
            <Field data-invalid={Boolean(state.fieldErrors.source_document)}>
              <FieldLabel htmlFor="source_document">
                Dokumen sumber
              </FieldLabel>
              <Input
                aria-invalid={
                  state.fieldErrors.source_document ? true : undefined
                }
                defaultValue={value("source_document")}
                id="source_document"
                maxLength={500}
                name="source_document"
                placeholder="Contoh: Perdes APBDes Tahun 2024"
              />
              <FieldError
                errors={
                  state.fieldErrors.source_document
                    ? [{ message: state.fieldErrors.source_document }]
                    : undefined
                }
              />
            </Field>
          </div>
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
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.notes)}>
              <FieldLabel htmlFor="notes">Catatan</FieldLabel>
              <Textarea
                aria-invalid={state.fieldErrors.notes ? true : undefined}
                defaultValue={value("notes")}
                id="notes"
                maxLength={1000}
                name="notes"
                rows={3}
              />
              <FieldError
                errors={
                  state.fieldErrors.notes
                    ? [{ message: state.fieldErrors.notes }]
                    : undefined
                }
              />
            </Field>
          </div>
        </div>
      </ComponentCard>

      <MoneyRowGroup
        addLabel="Tambah realisasi"
        help="Nilai pagu dan realisasi boleh kosong bila dokumen sumber tidak menyebutkannya. Semua nilai dalam Rupiah dan tidak boleh negatif."
        inputPrefix="realization"
        labelLabel="Label"
        rows={realizations}
        setRows={setRealizations}
        showKind
        title="Realisasi operasional dan pembiayaan"
      />
      <MoneyRowGroup
        addLabel="Tambah bidang belanja"
        help="Bidang penyerapan belanja beserta pagu dan realisasi bila tersedia dari sumber."
        inputPrefix="spending"
        labelLabel="Nama bidang"
        rows={spendingFields}
        setRows={setSpendingFields}
        showKind={false}
        title="Bidang penyerapan belanja"
      />
      <MoneyRowGroup
        addLabel="Tambah sumber pendapatan"
        help="Sumber pendapatan beserta pagu dan realisasi bila tersedia dari sumber."
        inputPrefix="revenue"
        labelLabel="Nama sumber"
        rows={revenueSources}
        setRows={setRevenueSources}
        showKind={false}
        title="Sumber pendapatan"
      />

      <div className="flex justify-end">
        <Button disabled={pending} type="submit">
          Simpan perubahan
        </Button>
      </div>
    </form>
  );
}
