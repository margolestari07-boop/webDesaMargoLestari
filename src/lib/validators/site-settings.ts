import { z } from "zod";

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, `Maksimal ${maxLength} karakter.`)
    .transform((value) => value || null);

const coordinate = (min: number, max: number) =>
  z
    .preprocess(
      (value) =>
        typeof value === "string" && value.trim() === "" ? null : Number(value),
      z.number().nullable(),
    )
    .refine((value) => value === null || (value >= min && value <= max), {
      message: `Nilai harus berada antara ${min} dan ${max}.`,
    });

const optionalEmail = z
  .preprocess(
    (value) => (typeof value === "string" ? value.trim() : value),
    z.union([z.literal(""), z.email("Masukkan alamat email yang valid.")]),
  )
  .transform((value) => value || null);

const optionalHttpsUrl = z
  .string()
  .trim()
  .max(300, "Maksimal 300 karakter.")
  .refine(
    (value) => {
      if (!value) return true;

      try {
        return new URL(value).protocol === "https:";
      } catch {
        return false;
      }
    },
    { message: "Gunakan tautan HTTPS yang valid." },
  )
  .transform((value) => value || null);

export const siteSettingsSchema = z
  .object({
    village_name: z.string().trim().min(1, "Nama desa wajib diisi.").max(120),
    tagline: optionalText(180),
    subdistrict: z.string().trim().min(1, "Kecamatan wajib diisi.").max(120),
    regency: z.string().trim().min(1, "Kabupaten wajib diisi.").max(120),
    province: z.string().trim().min(1, "Provinsi wajib diisi.").max(120),
    address: optionalText(500),
    latitude: coordinate(-90, 90),
    longitude: coordinate(-180, 180),
    contact_person: optionalText(120),
    phone: optionalText(40),
    email: optionalEmail,
    service_hours: optionalText(500),
    website: optionalHttpsUrl,
    facebook: optionalHttpsUrl,
    instagram: optionalHttpsUrl,
    youtube: optionalHttpsUrl,
    status: z.enum(["draft", "published"]),
  })
  .refine(
    ({ latitude, longitude }) => (latitude === null) === (longitude === null),
    {
      message: "Isi latitude dan longitude bersamaan, atau kosongkan keduanya.",
      path: ["latitude"],
    },
  );

export type SiteSettingsFormValues = z.output<typeof siteSettingsSchema>;
