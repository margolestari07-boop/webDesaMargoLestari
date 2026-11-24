"use client";

import { useActionState } from "react";
import ComponentCard from "@/components/tailadmin/common/component-card";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/tailadmin/ui/field";
import { Input } from "@/components/tailadmin/ui/input";
import { Textarea } from "@/components/tailadmin/ui/textarea";
import { saveSiteSettings, type SettingsState } from "./actions";
import { FloatingSaveBar } from "../_components/floating-save-bar";

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
    <form action={formAction} aria-busy={pending} className="space-y-6">
      <ComponentCard title="Identitas desa">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors.village_name)}>
            <FieldLabel htmlFor="village_name">
              Nama desa <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.village_name ? true : undefined
              }
              autoComplete="organization"
              id="village_name"
              maxLength={120}
              name="village_name"
              required
              value={value("village_name")}
            />
            <FieldError
              errors={
                state.fieldErrors.village_name
                  ? [{ message: state.fieldErrors.village_name }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.tagline)}>
            <FieldLabel htmlFor="tagline">Keterangan singkat</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.tagline ? true : undefined}
              id="tagline"
              maxLength={180}
              name="tagline"
              value={value("tagline")}
            />
            <FieldError
              errors={
                state.fieldErrors.tagline
                  ? [{ message: state.fieldErrors.tagline }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.subdistrict)}>
            <FieldLabel htmlFor="subdistrict">
              Kecamatan <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.subdistrict ? true : undefined
              }
              id="subdistrict"
              maxLength={120}
              name="subdistrict"
              required
              value={value("subdistrict")}
            />
            <FieldError
              errors={
                state.fieldErrors.subdistrict
                  ? [{ message: state.fieldErrors.subdistrict }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.regency)}>
            <FieldLabel htmlFor="regency">
              Kabupaten <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.regency ? true : undefined}
              id="regency"
              maxLength={120}
              name="regency"
              required
              value={value("regency")}
            />
            <FieldError
              errors={
                state.fieldErrors.regency
                  ? [{ message: state.fieldErrors.regency }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.province)}>
            <FieldLabel htmlFor="province">
              Provinsi <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.province ? true : undefined}
              id="province"
              maxLength={120}
              name="province"
              required
              value={value("province")}
            />
            <FieldError
              errors={
                state.fieldErrors.province
                  ? [{ message: state.fieldErrors.province }]
                  : undefined
              }
            />
          </Field>
        </div>
      </ComponentCard>

      <ComponentCard title="Alamat dan lokasi">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field data-invalid={Boolean(state.fieldErrors.address)}>
              <FieldLabel htmlFor="address">Alamat lengkap</FieldLabel>
              <Textarea
                aria-invalid={state.fieldErrors.address ? true : undefined}
                id="address"
                maxLength={500}
                name="address"
                rows={3}
                value={value("address")}
              />
              <FieldError
                errors={
                  state.fieldErrors.address
                    ? [{ message: state.fieldErrors.address }]
                    : undefined
                }
              />
            </Field>
          </div>
          <Field data-invalid={Boolean(state.fieldErrors.latitude)}>
            <FieldLabel htmlFor="latitude">Latitude</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.latitude ? true : undefined}
              id="latitude"
              inputMode="decimal"
              max="90"
              min="-90"
              name="latitude"
              step="0.000001"
              type="number"
              value={value("latitude")}
            />
            <FieldError
              errors={
                state.fieldErrors.latitude
                  ? [{ message: state.fieldErrors.latitude }]
                  : undefined
              }
            />
            <FieldDescription>Rentang −90 sampai 90.</FieldDescription>
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.longitude)}>
            <FieldLabel htmlFor="longitude">Longitude</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.longitude ? true : undefined}
              id="longitude"
              inputMode="decimal"
              max="180"
              min="-180"
              name="longitude"
              step="0.000001"
              type="number"
              value={value("longitude")}
            />
            <FieldError
              errors={
                state.fieldErrors.longitude
                  ? [{ message: state.fieldErrors.longitude }]
                  : undefined
              }
            />
            <FieldDescription>Rentang −180 sampai 180.</FieldDescription>
          </Field>
        </div>
      </ComponentCard>

      <ComponentCard title="Kontak dan jam layanan">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors.contact_person)}>
            <FieldLabel htmlFor="contact_person">
              Nama kontak person
            </FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.contact_person ? true : undefined
              }
              autoComplete="name"
              id="contact_person"
              maxLength={120}
              name="contact_person"
              value={value("contact_person")}
            />
            <FieldError
              errors={
                state.fieldErrors.contact_person
                  ? [{ message: state.fieldErrors.contact_person }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.phone)}>
            <FieldLabel htmlFor="phone">Nomor telepon</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.phone ? true : undefined}
              autoComplete="tel"
              id="phone"
              maxLength={40}
              name="phone"
              type="tel"
              value={value("phone")}
            />
            <FieldError
              errors={
                state.fieldErrors.phone
                  ? [{ message: state.fieldErrors.phone }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.email)}>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.email ? true : undefined}
              autoComplete="email"
              id="email"
              maxLength={254}
              name="email"
              type="email"
              value={value("email")}
            />
            <FieldError
              errors={
                state.fieldErrors.email
                  ? [{ message: state.fieldErrors.email }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.service_hours)}>
            <FieldLabel htmlFor="service_hours">Jam layanan</FieldLabel>
            <Input
              aria-invalid={
                state.fieldErrors.service_hours ? true : undefined
              }
              id="service_hours"
              maxLength={500}
              name="service_hours"
              value={value("service_hours")}
            />
            <FieldError
              errors={
                state.fieldErrors.service_hours
                  ? [{ message: state.fieldErrors.service_hours }]
                  : undefined
              }
            />
          </Field>
        </div>
      </ComponentCard>

      <ComponentCard title="Tautan resmi">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field data-invalid={Boolean(state.fieldErrors.website)}>
            <FieldLabel htmlFor="website">Situs web</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.website ? true : undefined}
              autoComplete="url"
              id="website"
              maxLength={300}
              name="website"
              placeholder="https://"
              type="url"
              value={value("website")}
            />
            <FieldError
              errors={
                state.fieldErrors.website
                  ? [{ message: state.fieldErrors.website }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.facebook)}>
            <FieldLabel htmlFor="facebook">Facebook</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.facebook ? true : undefined}
              autoComplete="url"
              id="facebook"
              maxLength={300}
              name="facebook"
              placeholder="https://"
              type="url"
              value={value("facebook")}
            />
            <FieldError
              errors={
                state.fieldErrors.facebook
                  ? [{ message: state.fieldErrors.facebook }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.instagram)}>
            <FieldLabel htmlFor="instagram">Instagram</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.instagram ? true : undefined}
              autoComplete="url"
              id="instagram"
              maxLength={300}
              name="instagram"
              placeholder="https://"
              type="url"
              value={value("instagram")}
            />
            <FieldError
              errors={
                state.fieldErrors.instagram
                  ? [{ message: state.fieldErrors.instagram }]
                  : undefined
              }
            />
          </Field>
          <Field data-invalid={Boolean(state.fieldErrors.youtube)}>
            <FieldLabel htmlFor="youtube">YouTube</FieldLabel>
            <Input
              aria-invalid={state.fieldErrors.youtube ? true : undefined}
              autoComplete="url"
              id="youtube"
              maxLength={300}
              name="youtube"
              placeholder="https://"
              type="url"
              value={value("youtube")}
            />
            <FieldError
              errors={
                state.fieldErrors.youtube
                  ? [{ message: state.fieldErrors.youtube }]
                  : undefined
              }
            />
          </Field>
        </div>
      </ComponentCard>

      {state.message ? (
        <Alert
          role={state.kind === "error" ? "alert" : "status"}
          variant={state.kind === "success" ? "success" : "destructive"}
        >
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      ) : null}

      <FloatingSaveBar
        pending={pending}
        saveLabel="Simpan pengaturan"
        saved={state.kind === "success"}
      />
    </form>
  );
}
