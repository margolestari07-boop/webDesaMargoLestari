import { describe, expect, it } from "vitest";
import { z } from "zod";
import {
  idleFormState,
  parseRowsJson,
  readFormStrings,
  zodFieldErrors,
} from "@/lib/content/form";

describe("parseRowsJson", () => {
  it("mengembalikan array kosong untuk null dan string kosong", () => {
    expect(parseRowsJson(null)).toEqual([]);
    expect(parseRowsJson("")).toEqual([]);
    expect(parseRowsJson("   ")).toEqual([]);
  });

  it("mengembalikan array dari JSON yang valid", () => {
    expect(parseRowsJson('[{"a":1},{"a":2}]')).toEqual([{ a: 1 }, { a: 2 }]);
    expect(parseRowsJson("[]")).toEqual([]);
  });

  it("mengembalikan null untuk JSON bukan array dan JSON rusak", () => {
    expect(parseRowsJson('{"a":1}')).toBeNull();
    expect(parseRowsJson('"teks"')).toBeNull();
    expect(parseRowsJson("[{")).toBeNull();
    expect(parseRowsJson("bukan json")).toBeNull();
  });
});

describe("zodFieldErrors", () => {
  it("mengambil pesan error pertama per field teratas", () => {
    const schema = z.object({
      nama: z.string().min(1, "Nama wajib diisi."),
      tahun: z.number().min(2000, "Tahun minimal 2000."),
    });
    const result = schema.safeParse({ nama: "", tahun: 1999 });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(zodFieldErrors(result.error)).toEqual({
        nama: "Nama wajib diisi.",
        tahun: "Tahun minimal 2000.",
      });
    }
  });

  it("memetakan error pada indeks array ke kunci rows", () => {
    const schema = z.object({
      rows: z
        .array(z.object({ label: z.string().min(1, "Label wajib diisi.") }))
        .min(1),
    });
    const result = schema.safeParse({ rows: [{ label: "" }] });
    expect(result.success).toBe(false);
    if (!result.success) {
      const errors = zodFieldErrors(result.error);
      expect(errors.rows).toBe("Label wajib diisi.");
    }
  });

  it("mengembalikan objek kosong bila tidak ada error", () => {
    expect(zodFieldErrors(new z.ZodError([]))).toEqual({});
  });
});

describe("readFormStrings", () => {
  it("membaca semua entri string dan melewati File", () => {
    const formData = new FormData();
    formData.set("nama", "Margo Lestari");
    formData.set("tahun", "2024");
    formData.set("lampiran", new File(["isi"], "dokumen.pdf"));

    expect(readFormStrings(formData)).toEqual({
      nama: "Margo Lestari",
      tahun: "2024",
    });
  });

  it("mengembalikan objek kosong untuk FormData kosong", () => {
    expect(readFormStrings(new FormData())).toEqual({});
  });
});

describe("idleFormState", () => {
  it("berbentuk idle tanpa pesan dan tanpa error field", () => {
    expect(idleFormState).toEqual({
      kind: "idle",
      message: null,
      fieldErrors: {},
    });
  });
});
