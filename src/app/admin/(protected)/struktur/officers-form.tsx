"use client";

import { useActionState, useState } from "react";
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

function newClientId(): string {
  return `officer-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
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
}: {
  initialOfficers: OfficerRow[];
}) {
  const [state, formAction, pending] = useActionState(
    saveOfficers,
    idleFormState,
  );
  const [officers, setOfficers] = useState<OfficerRow[]>(initialOfficers);

  const update = (clientId: string, patch: Partial<OfficerRow>) => {
    setOfficers((rows) =>
      rows.map((row) =>
        row.clientId === clientId ? { ...row, ...patch } : row,
      ),
    );
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
                value={row.parent_client_id}
              >
                <SelectTrigger id={`officer-parent-${row.clientId}`}>
                  <SelectValue placeholder="Pilih..." />
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
            <Field>
              <FieldLabel htmlFor={`officer-photo-${row.clientId}`}>
                ID aset foto (opsional)
              </FieldLabel>
              <Input
                id={`officer-photo-${row.clientId}`}
                onChange={(event) =>
                  update(row.clientId, { photo_asset_id: event.target.value })
                }
                placeholder="UUID media_assets, bila ada"
                value={row.photo_asset_id}
              />
              <FieldDescription>
                Foto diunggah lewat Storage di Fase 4; untuk saat ini isi ID
                aset yang sudah ada atau kosongkan.
              </FieldDescription>
            </Field>
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
                  <SelectValue placeholder="Pilih..." />
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

      <div className="flex justify-end">
        <Button disabled={pending} type="submit">
          Simpan perubahan
        </Button>
      </div>
    </form>
  );
}
