import { describe, expect, it } from "vitest";
import { siteSettingsSchema } from "@/lib/validators/site-settings";

type SafeParseResultLike =
  | { success: true }
  | {
      success: false;
      error: { issues: { path: PropertyKey[]; message: string }[] };
    };

function errorAt(
  result: SafeParseResultLike,
  path: string,
): string | undefined {
  if (result.success) return undefined;
  return result.error.issues.find((issue) => issue.path.join(".") === path)
    ?.message;
}

const valid = {
  village_name: "Desa Margo Lestari",
  tagline: "",
  subdistrict: "Tanjung Bintang",
  regency: "Lampung Selatan",
  province: "Lampung",
  address: "Jl. Raya Margo Lestari No. 1",
  latitude: "",
  longitude: "",
  contact_person: "",
  phone: "",
  email: "",
  service_hours: "",
  website: "",
  facebook: "",
  instagram: "",
  youtube: "",
};

describe("siteSettingsSchema", () => {
  it("menerima pengaturan valid dan mengubah string kosong menjadi null", () => {
    const result = siteSettingsSchema.safeParse(valid);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.tagline).toBeNull();
      expect(result.data.latitude).toBeNull();
      expect(result.data.email).toBeNull();
    }
  });

  it("menolak nama desa, kecamatan, kabupaten, dan provinsi yang kosong", () => {
    const result = siteSettingsSchema.safeParse({
      ...valid,
      village_name: "  ",
      subdistrict: "",
      regency: "",
      province: "",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(errorAt(result, "village_name")).toBe("Nama desa wajib diisi.");
      expect(errorAt(result, "subdistrict")).toBe("Kecamatan wajib diisi.");
      expect(errorAt(result, "regency")).toBe("Kabupaten wajib diisi.");
      expect(errorAt(result, "province")).toBe("Provinsi wajib diisi.");
    }
  });


  it("menolak latitude tanpa longitude dan sebaliknya", () => {
    const onlyLat = siteSettingsSchema.safeParse({
      ...valid,
      latitude: "-5.3",
      longitude: "",
    });
    expect(onlyLat.success).toBe(false);
    if (!onlyLat.success) {
      expect(errorAt(onlyLat, "latitude")).toBe(
        "Isi latitude dan longitude bersamaan, atau kosongkan keduanya.",
      );
    }

    const onlyLng = siteSettingsSchema.safeParse({
      ...valid,
      latitude: "",
      longitude: "105.4",
    });
    expect(onlyLng.success).toBe(false);
  });

  it("menerima pasangan koordinat yang lengkap dan valid", () => {
    const result = siteSettingsSchema.safeParse({
      ...valid,
      latitude: "-5.3",
      longitude: "105.4",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.latitude).toBe(-5.3);
      expect(result.data.longitude).toBe(105.4);
    }
  });

  it("menolak koordinat di luar rentang", () => {
    expect(
      siteSettingsSchema.safeParse({
        ...valid,
        latitude: "91",
        longitude: "105.4",
      }).success,
    ).toBe(false);
    const lng = siteSettingsSchema.safeParse({
      ...valid,
      latitude: "-5.3",
      longitude: "181",
    });
    expect(lng.success).toBe(false);
    if (!lng.success) {
      expect(errorAt(lng, "longitude")).toBe(
        "Nilai harus berada antara -180 dan 180.",
      );
    }
  });

  it("menolak email yang tidak valid dan menerima email kosong", () => {
    expect(
      siteSettingsSchema.safeParse({ ...valid, email: "bukan-email" })
        .success,
    ).toBe(false);
    const empty = siteSettingsSchema.safeParse({ ...valid, email: "" });
    expect(empty.success).toBe(true);
    if (empty.success) expect(empty.data.email).toBeNull();
    const ok = siteSettingsSchema.safeParse({
      ...valid,
      email: "  admin@desa.id  ",
    });
    expect(ok.success).toBe(true);
    if (ok.success) expect(ok.data.email).toBe("admin@desa.id");
  });

  it("menolak tautan bukan HTTPS dan menerima tautan kosong", () => {
    const http = siteSettingsSchema.safeParse({
      ...valid,
      website: "http://desa.id",
    });
    expect(http.success).toBe(false);
    if (!http.success) {
      expect(errorAt(http, "website")).toBe("Gunakan tautan HTTPS yang valid.");
    }

    const garbage = siteSettingsSchema.safeParse({
      ...valid,
      facebook: "bukan-tautan",
    });
    expect(garbage.success).toBe(false);

    const ok = siteSettingsSchema.safeParse({
      ...valid,
      website: "https://margolestari.desa.id",
    });
    expect(ok.success).toBe(true);
  });

  it("menolak teks yang melebihi batas karakter", () => {
    expect(
      siteSettingsSchema.safeParse({ ...valid, tagline: "x".repeat(181) })
        .success,
    ).toBe(false);
    expect(
      siteSettingsSchema.safeParse({ ...valid, village_name: "x".repeat(121) })
        .success,
    ).toBe(false);
  });
});
