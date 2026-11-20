import { z } from "zod";

// Helpers mengikuti pola src/lib/validators/site-settings.ts: input form
// datang sebagai string, string kosong berarti null.

const optionalText = (maxLength: number) =>
  z
    .string()
    .trim()
    .max(maxLength, `Maksimal ${maxLength} karakter.`)
    .transform((value) => value || null);

const requiredText = (maxLength: number, label: string) =>
  z
    .string()
    .trim()
    .min(1, `${label} wajib diisi.`)
    .max(maxLength, `Maksimal ${maxLength} karakter.`);

const optionalInt = z
  .preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : Number(value),
    z.number().int("Nilai harus bilangan bulat.").nullable(),
  )
  .refine((value) => value === null || value >= 0, {
    message: "Nilai tidak boleh negatif.",
  });

const sortOrderField = z.preprocess(
  (value) =>
    value === "" || value === undefined || value === null
      ? 0
      : Number(value),
  z.number().int("Urutan harus bilangan bulat.").min(0, "Urutan tidak boleh negatif."),
);

// Uang Rupiah numeric(19,2): bilangan >= 0 dengan maksimal 2 desimal.
const moneyField = z
  .preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : Number(value),
    z.number().nullable(),
  )
  .refine((value) => value === null || value >= 0, {
    message: "Nilai tidak boleh negatif.",
  })
  .refine(
    (value) =>
      value === null ||
      Math.abs(value * 100 - Math.round(value * 100)) < 1e-6,
    { message: "Gunakan maksimal 2 angka desimal." },
  );

const optionalDate = z
  .preprocess(
    (value) =>
      typeof value === "string" && value.trim() === "" ? null : value,
    z.string().nullable(),
  )
  .refine(
    (value) => value === null || /^\d{4}-\d{2}-\d{2}$/.test(value),
    { message: "Gunakan format tanggal YYYY-MM-DD." },
  );

const optionalUuid = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? null : value,
  z.uuid().nullable(),
);

const optionalIsoDateTime = optionalText(40).refine(
  (value) => value === null || !Number.isNaN(Date.parse(value)),
  { message: "Gunakan format tanggal-waktu yang valid." },
);

// ---------------------------------------------------------------------------
// Section dan revisi
// ---------------------------------------------------------------------------

export const sectionKeySchema = z.enum(["home", "profile", "population", "apbdes"]);
export const revisionStatusSchema = z.enum(["draft", "published", "archived"]);
export const boundaryDirectionSchema = z.enum(["north", "south", "east", "west"]);

// ---------------------------------------------------------------------------
// Struktur organisasi (satu sumber untuk Beranda dan Profil)
// ---------------------------------------------------------------------------

export const villageOfficerSchema = z.object({
  full_name: requiredText(120, "Nama"),
  position: requiredText(120, "Jabatan"),
  description: optionalText(500),
  parent_id: optionalUuid,
  photo_asset_id: optionalUuid,
  sort_order: sortOrderField,
  is_active: z.boolean(),
});

export type VillageOfficerFormValues = z.output<typeof villageOfficerSchema>;

// ---------------------------------------------------------------------------
// Beranda
// ---------------------------------------------------------------------------

export const homeContentSchema = z.object({
  hero_title: optionalText(200),
  hero_subtitle: optionalText(500),
  help_phone: optionalText(40),
  help_note: optionalText(500),
});

export type HomeContentFormValues = z.output<typeof homeContentSchema>;

export const homeGalleryItemSchema = z.object({
  media_asset_id: z.uuid("ID media tidak valid."),
  title: optionalText(200),
  caption: optionalText(500),
  alt_override: optionalText(200),
  sort_order: sortOrderField,
});

export type HomeGalleryItemFormValues = z.output<typeof homeGalleryItemSchema>;

// ---------------------------------------------------------------------------
// Profil Desa
// ---------------------------------------------------------------------------

export const profileContentSchema = z
  .object({
    history_text: optionalText(10000),
    area_value: moneyField,
    area_unit: optionalText(20),
    population_count: optionalInt,
    distance_to_capital_value: moneyField,
    distance_to_capital_unit: optionalText(20),
    source_note: optionalText(500),
  })
  .refine(
    ({ area_value, area_unit }) => (area_value === null) === (area_unit === null),
    {
      message: "Satuan wajib diisi saat luas wilayah terisi.",
      path: ["area_unit"],
    },
  )
  .refine(
    ({ distance_to_capital_value, distance_to_capital_unit }) =>
      (distance_to_capital_value === null) ===
      (distance_to_capital_unit === null),
    {
      message: "Satuan wajib diisi saat jarak terisi.",
      path: ["distance_to_capital_unit"],
    },
  );

export type ProfileContentFormValues = z.output<typeof profileContentSchema>;

export const profileBoundarySchema = z.object({
  direction: boundaryDirectionSchema,
  label: requiredText(200, "Batas"),
  description: optionalText(500),
  source_note: optionalText(500),
  sort_order: sortOrderField,
});

export const profileBoundariesSchema = z
  .array(profileBoundarySchema)
  .max(4, "Maksimal 4 arah batas (utara, selatan, timur, barat).")
  .refine(
    (boundaries) =>
      new Set(boundaries.map((item) => item.direction)).size ===
      boundaries.length,
    { message: "Setiap arah hanya boleh ada satu baris." },
  );

export type ProfileBoundaryFormValues = z.output<typeof profileBoundarySchema>;

export const villageDocumentSchema = z.object({
  title: requiredText(200, "Judul dokumen"),
  doc_type: requiredText(100, "Jenis dokumen"),
  description: optionalText(500),
  storage_path: requiredText(500, "Lokasi file"),
  mime_type: optionalText(120),
  size_bytes: optionalInt,
  alt_text: optionalText(200),
  sort_order: sortOrderField,
  is_public: z.boolean(),
});

export type VillageDocumentFormValues = z.output<typeof villageDocumentSchema>;

// ---------------------------------------------------------------------------
// Kependudukan
// ---------------------------------------------------------------------------

export const populationAreaUseSchema = z
  .object({
    category: requiredText(120, "Kategori"),
    area_value: moneyField,
    area_unit: optionalText(20),
    sort_order: sortOrderField,
    source_note: optionalText(500),
  })
  .refine(
    ({ area_value, area_unit }) => (area_value === null) === (area_unit === null),
    {
      message: "Satuan wajib diisi saat luas terisi.",
      path: ["area_unit"],
    },
  );

export const populationOccupationSchema = z.object({
  name: requiredText(120, "Nama pekerjaan"),
  person_count: optionalInt,
  sort_order: sortOrderField,
  source_note: optionalText(500),
});

export const populationReportSchema = z
  .object({
    period_label: requiredText(200, "Periode laporan"),
    period_start: optionalDate,
    period_end: optionalDate,
    source_name: optionalText(200),
    source_reference: optionalText(500),
    data_updated_at: optionalIsoDateTime,
    total_population: optionalInt,
    total_households: optionalInt,
    male_count: optionalInt,
    female_count: optionalInt,
    productive_age_count: optionalInt,
    area_value: moneyField,
    area_unit: optionalText(20),
    area_uses: z.array(populationAreaUseSchema).default([]),
    occupations: z.array(populationOccupationSchema).default([]),
  })
  .refine(
    ({ total_population, male_count, female_count }) =>
      total_population === null ||
      male_count === null ||
      female_count === null ||
      male_count + female_count === total_population,
    {
      message:
        "Jumlah laki-laki + perempuan harus sama dengan total penduduk jika ketiganya terisi.",
      path: ["total_population"],
    },
  )
  .refine(
    ({ period_start, period_end }) =>
      period_start === null ||
      period_end === null ||
      period_end >= period_start,
    {
      message: "Tanggal akhir periode tidak boleh sebelum tanggal mulai.",
      path: ["period_end"],
    },
  )
  .refine(
    ({ area_value, area_unit }) => (area_value === null) === (area_unit === null),
    {
      message: "Satuan wajib diisi saat luas wilayah terisi.",
      path: ["area_unit"],
    },
  );

export type PopulationReportFormValues = z.output<typeof populationReportSchema>;

// ---------------------------------------------------------------------------
// APBDes (tahun 2000-2100, pagu/realisasi >= 0 dan boleh kosong)
// ---------------------------------------------------------------------------

const apbdesMoneyRows = {
  budget: moneyField,
  realization: moneyField,
  sort_order: sortOrderField,
  source_note: optionalText(500),
};

export const apbdesRealizationSchema = z.object({
  kind: z.enum(["operasional", "pembiayaan"]),
  label: requiredText(200, "Label"),
  ...apbdesMoneyRows,
});

export const apbdesSpendingFieldSchema = z.object({
  field_name: requiredText(200, "Nama bidang"),
  ...apbdesMoneyRows,
});

export const apbdesRevenueSourceSchema = z.object({
  source_name: requiredText(200, "Nama sumber"),
  ...apbdesMoneyRows,
});

export const apbdesReportSchema = z
  .object({
    fiscal_year: z.preprocess(
      (value) => Number(value),
      z
        .number()
        .int("Tahun anggaran harus bilangan bulat.")
        .min(2000, "Tahun anggaran minimal 2000.")
        .max(2100, "Tahun anggaran maksimal 2100."),
    ),
    period_label: requiredText(200, "Periode laporan"),
    period_start: optionalDate,
    period_end: optionalDate,
    source_document: optionalText(500),
    source_note: optionalText(500),
    notes: optionalText(1000),
    realizations: z.array(apbdesRealizationSchema).default([]),
    spending_fields: z.array(apbdesSpendingFieldSchema).default([]),
    revenue_sources: z.array(apbdesRevenueSourceSchema).default([]),
  })
  .refine(
    ({ period_start, period_end }) =>
      period_start === null ||
      period_end === null ||
      period_end >= period_start,
    {
      message: "Tanggal akhir periode tidak boleh sebelum tanggal mulai.",
      path: ["period_end"],
    },
  );

export type ApbdesReportFormValues = z.output<typeof apbdesReportSchema>;
