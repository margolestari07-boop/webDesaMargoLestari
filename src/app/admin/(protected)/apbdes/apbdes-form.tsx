"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { saveApbdesDraft } from "./actions";

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
    if (window.confirm(`Hapus baris "${label || "tanpa nama"}" dari draf?`)) {
      setRows((items) => items.filter((item) => item.clientId !== clientId));
    }
  };

  return (
    <fieldset className="admin-settings-group">
      <legend>{title}</legend>
      <p className="admin-field-help">{help}</p>
      {rows.length === 0 ? <p className="admin-field-help">Belum ada baris.</p> : null}
      {rows.map((row, index) => (
        <div className="admin-settings-grid" key={row.clientId}>
          {showKind ? (
            <div className="admin-form-field">
              <Label htmlFor={`${inputPrefix}-kind-${row.clientId}`} required>
                Jenis
              </Label>
              <Select
                id={`${inputPrefix}-kind-${row.clientId}`}
                onChange={(event) =>
                  update(row.clientId, {
                    kind: event.target.value as MoneyRow["kind"],
                  })
                }
                value={row.kind}
              >
                <option value="">Pilih jenis</option>
                <option value="operasional">Operasional</option>
                <option value="pembiayaan">Pembiayaan</option>
              </Select>
            </div>
          ) : null}
          <div className="admin-form-field">
            <Label htmlFor={`${inputPrefix}-label-${row.clientId}`} required>
              {labelLabel} {index + 1}
            </Label>
            <Input
              id={`${inputPrefix}-label-${row.clientId}`}
              maxLength={200}
              onChange={(event) =>
                update(row.clientId, { label: event.target.value })
              }
              required
              value={row.label}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor={`${inputPrefix}-budget-${row.clientId}`}>
              Pagu (Rp)
            </Label>
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
          </div>
          <div className="admin-form-field">
            <Label htmlFor={`${inputPrefix}-real-${row.clientId}`}>
              Realisasi (Rp)
            </Label>
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
          </div>
          <div className="admin-form-field">
            <Label htmlFor={`${inputPrefix}-order-${row.clientId}`}>
              Urutan
            </Label>
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
          </div>
          <div className="admin-form-field">
            <Label htmlFor={`${inputPrefix}-note-${row.clientId}`}>
              Catatan sumber
            </Label>
            <Input
              id={`${inputPrefix}-note-${row.clientId}`}
              maxLength={500}
              onChange={(event) =>
                update(row.clientId, { source_note: event.target.value })
              }
              value={row.source_note}
            />
          </div>
          <div className="admin-row-actions admin-settings-wide">
            <Button
              onClick={() => setRows((items) => moveRow(items, row.clientId, -1))}
              size="small"
              type="button"
              variant="secondary"
            >
              Naik
            </Button>
            <Button
              onClick={() => setRows((items) => moveRow(items, row.clientId, 1))}
              size="small"
              type="button"
              variant="secondary"
            >
              Turun
            </Button>
            <Button
              onClick={() => removeRow(row.clientId, row.label)}
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
            setRows((items) => [
              ...items,
              { ...emptyRow(), sort_order: String(items.length) },
            ])
          }
          size="small"
          type="button"
          variant="secondary"
        >
          {addLabel}
        </Button>
      </div>
    </fieldset>
  );
}

export function ApbdesForm({
  initialValues,
  initialRealizations,
  initialSpendingFields,
  initialRevenueSources,
  hasDraft,
}: {
  initialValues: Record<string, string>;
  initialRealizations: MoneyRow[];
  initialSpendingFields: MoneyRow[];
  initialRevenueSources: MoneyRow[];
  hasDraft: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    saveApbdesDraft,
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

      <fieldset className="admin-settings-group">
        <legend>Laporan</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field">
            <Label htmlFor="fiscal_year" required>
              Tahun anggaran
            </Label>
            <Input
              error={state.fieldErrors.fiscal_year}
              id="fiscal_year"
              inputMode="numeric"
              max={2100}
              min={2000}
              name="fiscal_year"
              required
              type="number"
              defaultValue={value("fiscal_year")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="period_label" required>
              Periode laporan
            </Label>
            <Input
              error={state.fieldErrors.period_label}
              id="period_label"
              maxLength={200}
              name="period_label"
              placeholder="Contoh: APBDes Tahun 2024"
              required
              defaultValue={value("period_label")}
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
            <Label htmlFor="source_document">Dokumen sumber</Label>
            <Input
              error={state.fieldErrors.source_document}
              id="source_document"
              maxLength={500}
              name="source_document"
              placeholder="Contoh: Perdes APBDes Tahun 2024"
              defaultValue={value("source_document")}
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
          <div className="admin-form-field admin-settings-wide">
            <Label htmlFor="notes">Catatan</Label>
            <Textarea
              error={state.fieldErrors.notes}
              id="notes"
              maxLength={1000}
              name="notes"
              rows={3}
              defaultValue={value("notes")}
            />
          </div>
        </div>
      </fieldset>

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

      <div className="admin-settings-actions">
        <Button disabled={pending} type="submit">
          {hasDraft ? "Simpan draf" : "Buat draf dan simpan"}
        </Button>
      </div>
    </form>
  );
}
