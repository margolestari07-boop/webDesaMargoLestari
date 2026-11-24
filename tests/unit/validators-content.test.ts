import { describe, expect, it } from "vitest";
import {
  apbdesRealizationSchema,
  apbdesReportSchema,
  apbdesRevenueSourceSchema,
  apbdesSpendingFieldSchema,
  boundaryDirectionSchema,
  homeContentSchema,
  homeGalleryItemSchema,
  populationAreaUseSchema,
  populationOccupationSchema,
  populationReportSchema,
  profileBoundariesSchema,
  profileBoundarySchema,
  profileContentSchema,
  sectionKeySchema,
  villageDocumentSchema,
  villageOfficerSchema,
} from "@/lib/validators/content";

/** Hasil safeParse dari skema zod apa pun (hanya bagian yang dipakai di sini). */
type SafeParseResultLike =
  | { success: true }
  | {
      success: false;
      error: { issues: { path: PropertyKey[]; message: string }[] };
    };

/** Ambil pesan error pertama untuk sebuah path dari hasil safeParse. */
function errorAt(
  result: SafeParseResultLike,
  path: string,
): string | undefined {
  if (result.success) return undefined;
  return result.error.issues.find((issue) => issue.path.join(".") === path)
    ?.message;
}

describe("enum section / arah batas", () => {
  it("menerima nilai enum yang valid", () => {
    expect(sectionKeySchema.safeParse("home").success).toBe(true);
    expect(sectionKeySchema.safeParse("apbdes").success).toBe(true);
    expect(boundaryDirectionSchema.safeParse("north").success).toBe(true);
  });

  it("menolak nilai di luar enum", () => {
    expect(sectionKeySchema.safeParse("berita").success).toBe(false);
    expect(boundaryDirectionSchema.safeParse("northeast").success).toBe(false);
  });
});

describe("villageOfficerSchema", () => {
  const valid = {
    full_name: "Sonjaya, S.H.",
    position: "Kepala Desa",
    description: "",
    parent_id: "",
    photo_asset_id: "",
    sort_order: "",
    is_active: true,
  };

  it("menerima pejabat valid dengan nilai kosong menjadi default", () => {
    const result = villageOfficerSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.description).toBeNull();
      expect(result.data.parent_id).toBeNull();
      expect(result.data.sort_order).toBe(0);
    }
  });

  it("menolak nama dan jabatan kosong", () => {
    const result = villageOfficerSchema.safeParse({
      ...valid,
      full_name: "   ",
      position: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "full_name")).toBe("Nama wajib diisi.");
      expect(errorAt(result, "position")).toBe("Jabatan wajib diisi.");
    }
  });

  it("menolak urutan negatif dan parent_id bukan UUID", () => {
    const result = villageOfficerSchema.safeParse({
      ...valid,
      sort_order: "-2",
      parent_id: "bukan-uuid",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "sort_order")).toBe(
        "Urutan tidak boleh negatif.",
      );
      expect(errorAt(result, "parent_id")).toBeDefined();
    }
  });
});

describe("homeContentSchema dan homeGalleryItemSchema", () => {
  it("mengubah string kosong menjadi null dan memangkas spasi", () => {
    const result = homeContentSchema.safeParse({
      hero_title: "  Selamat Datang  ",
      hero_subtitle: "",
      help_phone: "",
      help_note: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.hero_title).toBe("Selamat Datang");
      expect(result.data.hero_subtitle).toBeNull();
      expect(result.data.help_phone).toBeNull();
    }
  });

  it("menolak judul galeri yang melebihi batas karakter", () => {
    const result = homeGalleryItemSchema.safeParse({
      media_asset_id: "550e8400-e29b-41d4-a716-446655440000",
      title: "x".repeat(201),
      sort_order: 1,
    });
    expect(result.success).toBe(false);
  });

  it("menolak media_asset_id yang bukan UUID", () => {
    const result = homeGalleryItemSchema.safeParse({
      media_asset_id: "tidak-valid",
      sort_order: 0,
    });
    expect(result.success).toBe(false);
  });
});

describe("profileContentSchema", () => {
  const base = {
    history_text: "",
    area_value: "",
    area_unit: "",
    population_count: "",
    distance_to_capital_value: "",
    distance_to_capital_unit: "",
    source_note: "",
  };

  it("menerima profil kosong (semua opsional)", () => {
    expect(profileContentSchema.safeParse(base).success).toBe(true);
  });

  it("menolak luas wilayah tanpa satuan", () => {
    const result = profileContentSchema.safeParse({
      ...base,
      area_value: "1011.5",
      area_unit: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "area_unit")).toBe(
        "Satuan wajib diisi saat luas wilayah terisi.",
      );
    }
  });

  it("menolak jarak tanpa satuan dan nilai negatif", () => {
    const result = profileContentSchema.safeParse({
      ...base,
      distance_to_capital_value: "-5",
      distance_to_capital_unit: "km",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "distance_to_capital_value")).toBe(
        "Nilai tidak boleh negatif.",
      );
    }
  });

  it("menerima pasangan nilai + satuan yang lengkap", () => {
    const result = profileContentSchema.safeParse({
      ...base,
      area_value: "1011.5",
      area_unit: "Ha",
      population_count: "3062",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.area_value).toBe(1011.5);
      expect(result.data.population_count).toBe(3062);
    }
  });
});

describe("profileBoundariesSchema", () => {
  const boundary = (direction: string) => ({
    direction,
    label: "Desa Tetangga",
    description: "",
    source_note: "",
    sort_order: 0,
  });

  it("menerima 4 arah yang berbeda", () => {
    const result = profileBoundariesSchema.safeParse([
      boundary("north"),
      boundary("south"),
      boundary("east"),
      boundary("west"),
    ]);
    expect(result.success).toBe(true);
  });

  it("menolak lebih dari 4 baris", () => {
    const result = profileBoundariesSchema.safeParse([
      boundary("north"),
      boundary("south"),
      boundary("east"),
      boundary("west"),
      boundary("north"),
    ]);
    expect(result.success).toBe(false);
  });

  it("menolak arah yang sama dua kali", () => {
    const result = profileBoundariesSchema.safeParse([
      boundary("north"),
      boundary("north"),
    ]);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(
        "Setiap arah hanya boleh ada satu baris.",
      );
    }
  });

  it("menolak label batas yang kosong", () => {
    const result = profileBoundarySchema.safeParse({
      ...boundary("north"),
      label: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "label")).toBe("Batas wajib diisi.");
    }
  });
});

describe("villageDocumentSchema", () => {
  const valid = {
    title: "Perdes APBDes 2024",
    doc_type: "Peraturan Desa",
    description: "",
    storage_path: "dokumen/apbdes-2024.pdf",
    mime_type: "application/pdf",
    size_bytes: "12345",
    alt_text: "",
    sort_order: 0,
    is_public: true,
  };

  it("menerima dokumen valid", () => {
    const result = villageDocumentSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.size_bytes).toBe(12345);
    }
  });

  it("menolak judul, jenis, dan lokasi file yang kosong", () => {
    const result = villageDocumentSchema.safeParse({
      ...valid,
      title: "",
      doc_type: "",
      storage_path: "  ",
    });
    expect(result.success).toBe(false);
  });
});

describe("populationReportSchema", () => {
  const base = {
    period_label: "Tahun 2025",
    period_start: "2025-01-01",
    period_end: "2025-12-31",
    source_name: "Profil Desa 2025",
    source_reference: "",
    data_updated_at: "",
    total_population: "3062",
    total_households: "952",
    male_count: "1500",
    female_count: "1562",
    productive_age_count: "",
    area_value: "",
    area_unit: "",
    area_uses: [],
    occupations: [],
  };

  it("menerima laporan valid dengan rincian laki-laki + perempuan cocok", () => {
    const result = populationReportSchema.safeParse(base);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.total_population).toBe(3062);
      expect(result.data.area_uses).toEqual([]);
      expect(result.data.occupations).toEqual([]);
    }
  });

  it("menolak bila laki-laki + perempuan tidak sama dengan total", () => {
    const result = populationReportSchema.safeParse({
      ...base,
      male_count: "1500",
      female_count: "1500",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "total_population")).toContain(
        "harus sama dengan total penduduk",
      );
    }
  });

  it("menolak tanggal akhir sebelum tanggal mulai", () => {
    const result = populationReportSchema.safeParse({
      ...base,
      period_start: "2025-06-01",
      period_end: "2025-01-01",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "period_end")).toBe(
        "Tanggal akhir periode tidak boleh sebelum tanggal mulai.",
      );
    }
  });

  it("menolak periode kosong dan jumlah negatif", () => {
    const result = populationReportSchema.safeParse({
      ...base,
      period_label: "",
      total_households: "-3",
    });
    expect(result.success).toBe(false);
  });

  it("menolak format tanggal yang salah", () => {
    const result = populationReportSchema.safeParse({
      ...base,
      period_start: "01/01/2025",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "period_start")).toBe(
        "Gunakan format tanggal YYYY-MM-DD.",
      );
    }
  });
});

describe("populationAreaUseSchema dan populationOccupationSchema", () => {
  it("menolak penggunaan wilayah dengan luas tanpa satuan", () => {
    const result = populationAreaUseSchema.safeParse({
      category: "Sawah",
      area_value: "500",
      area_unit: "",
      sort_order: 0,
      source_note: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "area_unit")).toBe(
        "Satuan wajib diisi saat luas terisi.",
      );
    }
  });

  it("menolak pekerjaan tanpa nama", () => {
    const result = populationOccupationSchema.safeParse({
      name: "",
      person_count: "10",
      sort_order: 0,
      source_note: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("apbdesReportSchema", () => {
  const base = {
    fiscal_year: "2024",
    period_label: "Tahun Anggaran 2024",
    period_start: "2024-01-01",
    period_end: "2024-12-31",
    source_document: "",
    source_note: "",
    notes: "",
    realizations: [],
    spending_fields: [],
    revenue_sources: [],
  };

  it("menerima laporan valid dan mengubah tahun string menjadi angka", () => {
    const result = apbdesReportSchema.safeParse(base);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fiscal_year).toBe(2024);
    }
  });

  it("menolak tahun anggaran di bawah 2000 dan di atas 2100", () => {
    expect(
      apbdesReportSchema.safeParse({ ...base, fiscal_year: "1999" }).success,
    ).toBe(false);
    const tooHigh = apbdesReportSchema.safeParse({
      ...base,
      fiscal_year: "2101",
    });
    expect(tooHigh.success).toBe(false);
    if (!tooHigh.success) {
      expect(errorAt(tooHigh, "fiscal_year")).toBe(
        "Tahun anggaran maksimal 2100.",
      );
    }
  });

  it("menerima batas tahun 2000 dan 2100", () => {
    expect(
      apbdesReportSchema.safeParse({ ...base, fiscal_year: "2000" }).success,
    ).toBe(true);
    expect(
      apbdesReportSchema.safeParse({ ...base, fiscal_year: "2100" }).success,
    ).toBe(true);
  });

  it("menolak tahun bukan bilangan bulat", () => {
    const result = apbdesReportSchema.safeParse({
      ...base,
      fiscal_year: "2024.5",
    });
    expect(result.success).toBe(false);
  });

  it("menolak tanggal akhir sebelum tanggal mulai", () => {
    const result = apbdesReportSchema.safeParse({
      ...base,
      period_start: "2024-12-01",
      period_end: "2024-01-01",
    });
    expect(result.success).toBe(false);
  });

  it("menolak pagu negatif dan realisasi lebih dari 2 desimal", () => {
    const negative = apbdesRealizationSchema.safeParse({
      kind: "operasional",
      label: "Belanja Pegawai",
      budget: "-1000",
      realization: "",
      sort_order: 0,
      source_note: "",
    });
    expect(negative.success).toBe(false);
    if (!negative.success) {
      expect(errorAt(negative, "budget")).toBe("Nilai tidak boleh negatif.");
    }

    const decimals = apbdesSpendingFieldSchema.safeParse({
      field_name: "Pendidikan",
      budget: "1000.123",
      realization: "",
      sort_order: 0,
      source_note: "",
    });
    expect(decimals.success).toBe(false);
    if (!decimals.success) {
      expect(errorAt(decimals, "budget")).toBe(
        "Gunakan maksimal 2 angka desimal.",
      );
    }
  });

  it("menolak baris APBDes tanpa label/nama", () => {
    expect(
      apbdesRealizationSchema.safeParse({
        kind: "pembiayaan",
        label: "",
        budget: "",
        realization: "",
        sort_order: 0,
        source_note: "",
      }).success,
    ).toBe(false);
    expect(
      apbdesSpendingFieldSchema.safeParse({
        field_name: "",
        budget: "",
        realization: "",
        sort_order: 0,
        source_note: "",
      }).success,
    ).toBe(false);
    expect(
      apbdesRevenueSourceSchema.safeParse({
        source_name: "",
        budget: "",
        realization: "",
        sort_order: 0,
        source_note: "",
      }).success,
    ).toBe(false);
  });

  it("menerima baris APBDes dengan nilai kosong (boleh kosong)", () => {
    const result = apbdesRevenueSourceSchema.safeParse({
      source_name: "Dana Desa",
      budget: "",
      realization: "",
      sort_order: "",
      source_note: "",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.budget).toBeNull();
      expect(result.data.realization).toBeNull();
      expect(result.data.sort_order).toBe(0);
    }
  });
});
