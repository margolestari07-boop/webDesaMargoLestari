"use client";

import { useActionState, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { idleFormState } from "@/lib/content/form";
import { saveOfficersDraft } from "./actions";

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
  hasDraft,
}: {
  initialOfficers: OfficerRow[];
  hasDraft: boolean;
}) {
  const [state, formAction, pending] = useActionState(
    saveOfficersDraft,
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
          : `Hapus ${name || "pejabat ini"} dari draf?`,
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
        <p className="admin-field-help">
          Belum ada pejabat. Tambahkan Kepala Desa terlebih dahulu, lalu
          perangkat di bawahnya.
        </p>
      ) : null}

      {officers.map((row, index) => (
        <fieldset className="admin-settings-group" key={row.clientId}>
          <legend>
            Pejabat {index + 1}
            {row.full_name ? ` — ${row.full_name}` : ""}
          </legend>
          <div className="admin-settings-grid">
            <div className="admin-form-field">
              <Label htmlFor={`officer-name-${row.clientId}`} required>
                Nama
              </Label>
              <Input
                id={`officer-name-${row.clientId}`}
                maxLength={120}
                onChange={(event) =>
                  update(row.clientId, { full_name: event.target.value })
                }
                required
                value={row.full_name}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`officer-position-${row.clientId}`} required>
                Jabatan
              </Label>
              <Input
                id={`officer-position-${row.clientId}`}
                maxLength={120}
                onChange={(event) =>
                  update(row.clientId, { position: event.target.value })
                }
                required
                value={row.position}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`officer-parent-${row.clientId}`}>
                Atasan langsung
              </Label>
              <Select
                id={`officer-parent-${row.clientId}`}
                onChange={(event) =>
                  update(row.clientId, {
                    parent_client_id: event.target.value,
                  })
                }
                value={row.parent_client_id}
              >
                <option value="">Tidak ada (tingkat teratas)</option>
                {officers
                  .filter((item) => item.clientId !== row.clientId)
                  .map((item) => (
                    <option key={item.clientId} value={item.clientId}>
                      {item.full_name || "(tanpa nama)"} —{" "}
                      {item.position || "(tanpa jabatan)"}
                    </option>
                  ))}
              </Select>
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`officer-order-${row.clientId}`}>Urutan</Label>
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
            </div>
            <div className="admin-form-field admin-settings-wide">
              <Label htmlFor={`officer-desc-${row.clientId}`}>
                Deskripsi / tugas
              </Label>
              <Textarea
                id={`officer-desc-${row.clientId}`}
                maxLength={500}
                onChange={(event) =>
                  update(row.clientId, { description: event.target.value })
                }
                rows={2}
                value={row.description}
              />
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`officer-photo-${row.clientId}`}>
                ID aset foto (opsional)
              </Label>
              <Input
                id={`officer-photo-${row.clientId}`}
                onChange={(event) =>
                  update(row.clientId, { photo_asset_id: event.target.value })
                }
                placeholder="UUID media_assets, bila ada"
                value={row.photo_asset_id}
              />
              <p className="admin-field-help">
                Foto diunggah lewat Storage di Fase 4; untuk saat ini isi ID
                aset yang sudah ada atau kosongkan.
              </p>
            </div>
            <div className="admin-form-field">
              <Label htmlFor={`officer-active-${row.clientId}`}>Status</Label>
              <Select
                id={`officer-active-${row.clientId}`}
                onChange={(event) =>
                  update(row.clientId, {
                    is_active: event.target.value === "true",
                  })
                }
                value={row.is_active ? "true" : "false"}
              >
                <option value="true">Aktif</option>
                <option value="false">Nonaktif</option>
              </Select>
            </div>
            <div className="admin-row-actions admin-settings-wide">
              <Button
                onClick={() =>
                  setOfficers((rows) => moveRow(rows, row.clientId, -1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Naik
              </Button>
              <Button
                onClick={() =>
                  setOfficers((rows) => moveRow(rows, row.clientId, 1))
                }
                size="small"
                type="button"
                variant="secondary"
              >
                Turun
              </Button>
              <Button
                onClick={() => removeOfficer(row.clientId, row.full_name)}
                size="small"
                type="button"
                variant="secondary"
              >
                Hapus
              </Button>
            </div>
          </div>
        </fieldset>
      ))}

      <div className="admin-row-actions">
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
          size="small"
          type="button"
          variant="secondary"
        >
          Tambah pejabat
        </Button>
      </div>

      <div className="admin-settings-actions">
        <Button disabled={pending} type="submit">
          {hasDraft ? "Simpan draf" : "Buat draf dan simpan"}
        </Button>
      </div>
    </form>
  );
}
