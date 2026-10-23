"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { saveSiteSettings, type SettingsState } from "./actions";

const initialSettingsState: SettingsState = {
  kind: "idle",
  message: null,
  fieldErrors: {},
};

export function SettingsForm({
  initialValues,
}: {
  initialValues: Record<string, string>;
}) {
  const [state, formAction, pending] = useActionState(
    saveSiteSettings,
    initialSettingsState,
  );
  const value = (name: string) =>
    state.values?.[name] ?? initialValues[name] ?? "";

  return (
    <form
      action={formAction}
      aria-busy={pending}
      className="admin-settings-form"
    >
      <fieldset className="admin-settings-group">
        <legend>Identitas desa</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field">
            <Label htmlFor="village_name" required>
              Nama desa
            </Label>
            <Input
              autoComplete="organization"
              error={state.fieldErrors.village_name}
              id="village_name"
              maxLength={120}
              name="village_name"
              required
              value={value("village_name")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="tagline">Keterangan singkat</Label>
            <Input
              error={state.fieldErrors.tagline}
              id="tagline"
              maxLength={180}
              name="tagline"
              value={value("tagline")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="subdistrict" required>
              Kecamatan
            </Label>
            <Input
              error={state.fieldErrors.subdistrict}
              id="subdistrict"
              maxLength={120}
              name="subdistrict"
              required
              value={value("subdistrict")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="regency" required>
              Kabupaten
            </Label>
            <Input
              error={state.fieldErrors.regency}
              id="regency"
              maxLength={120}
              name="regency"
              required
              value={value("regency")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="province" required>
              Provinsi
            </Label>
            <Input
              error={state.fieldErrors.province}
              id="province"
              maxLength={120}
              name="province"
              required
              value={value("province")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Alamat dan lokasi</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field admin-settings-wide">
            <Label htmlFor="address">Alamat lengkap</Label>
            <Textarea
              error={state.fieldErrors.address}
              id="address"
              maxLength={500}
              name="address"
              rows={3}
              value={value("address")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="latitude">Latitude</Label>
            <Input
              error={state.fieldErrors.latitude}
              id="latitude"
              inputMode="decimal"
              max="90"
              min="-90"
              name="latitude"
              step="0.000001"
              type="number"
              value={value("latitude")}
            />
            <p className="admin-field-help">Rentang −90 sampai 90.</p>
          </div>
          <div className="admin-form-field">
            <Label htmlFor="longitude">Longitude</Label>
            <Input
              error={state.fieldErrors.longitude}
              id="longitude"
              inputMode="decimal"
              max="180"
              min="-180"
              name="longitude"
              step="0.000001"
              type="number"
              value={value("longitude")}
            />
            <p className="admin-field-help">Rentang −180 sampai 180.</p>
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Kontak dan jam layanan</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field">
            <Label htmlFor="contact_person">Nama kontak person</Label>
            <Input
              autoComplete="name"
              error={state.fieldErrors.contact_person}
              id="contact_person"
              maxLength={120}
              name="contact_person"
              value={value("contact_person")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="phone">Nomor telepon</Label>
            <Input
              autoComplete="tel"
              error={state.fieldErrors.phone}
              id="phone"
              maxLength={40}
              name="phone"
              type="tel"
              value={value("phone")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="email"
              error={state.fieldErrors.email}
              id="email"
              maxLength={254}
              name="email"
              type="email"
              value={value("email")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="service_hours">Jam layanan</Label>
            <Input
              error={state.fieldErrors.service_hours}
              id="service_hours"
              maxLength={500}
              name="service_hours"
              value={value("service_hours")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Tautan resmi</legend>
        <div className="admin-settings-grid">
          <div className="admin-form-field">
            <Label htmlFor="website">Situs web</Label>
            <Input
              autoComplete="url"
              error={state.fieldErrors.website}
              id="website"
              maxLength={300}
              name="website"
              placeholder="https://"
              type="url"
              value={value("website")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="facebook">Facebook</Label>
            <Input
              autoComplete="url"
              error={state.fieldErrors.facebook}
              id="facebook"
              maxLength={300}
              name="facebook"
              placeholder="https://"
              type="url"
              value={value("facebook")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              autoComplete="url"
              error={state.fieldErrors.instagram}
              id="instagram"
              maxLength={300}
              name="instagram"
              placeholder="https://"
              type="url"
              value={value("instagram")}
            />
          </div>
          <div className="admin-form-field">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              autoComplete="url"
              error={state.fieldErrors.youtube}
              id="youtube"
              maxLength={300}
              name="youtube"
              placeholder="https://"
              type="url"
              value={value("youtube")}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="admin-settings-group">
        <legend>Status publikasi</legend>
        <div className="admin-form-field">
          <Label htmlFor="status" required>
            Status
          </Label>
          <Select
            error={state.fieldErrors.status}
            id="status"
            name="status"
            value={value("status")}
          >
            <option value="draft">Draf — tidak terlihat di situs publik</option>
            <option value="published">Terbit — tampil di situs publik</option>
          </Select>
          <p className="admin-field-help">
            Terbitkan hanya setelah identitas, kecamatan, dan izin publikasi
            kontak diperiksa serta disetujui pihak desa.
          </p>
        </div>
      </fieldset>

      {state.message ? (
        <p
          className={
            state.kind === "success"
              ? "admin-settings-success"
              : "admin-settings-error"
          }
          role={state.kind === "error" ? "alert" : "status"}
        >
          {state.message}
        </p>
      ) : null}

      <div className="admin-settings-actions">
        <Button disabled={pending} type="submit">
          {pending ? "Menyimpan…" : "Simpan pengaturan"}
        </Button>
      </div>
    </form>
  );
}
