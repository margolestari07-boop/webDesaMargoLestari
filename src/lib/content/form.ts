import { z } from "zod";

export type FormState = {
  kind: "idle" | "success" | "error";
  message: string | null;
  fieldErrors: Record<string, string>;
  values?: Record<string, string>;
  /**
   * ID aset media yang baru diunggah selama penyimpanan ini, dipetakan
   * dari kunci baris form (clientId pejabat, atau indeks baris galeri).
   * Dipakai form untuk menambal state lokal setelah simpan berhasil,
   * supaya simpan berikutnya tidak menimpa tautan foto/galeri yang baru.
   */
  uploadedAssets?: Record<string, string>;
};

export const idleFormState: FormState = {
  kind: "idle",
  message: null,
  fieldErrors: {},
};

/** Baris dinamis dikirim form sebagai JSON di satu hidden input. */
export function parseRowsJson(
  value: FormDataEntryValue | null,
): unknown[] | null {
  if (typeof value !== "string" || value.trim() === "") return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

/** Ambil pesan error pertama per field teratas dari ZodError. */
export function zodFieldErrors(error: z.ZodError): Record<string, string> {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const field = issue.path[0];
    if (typeof field === "string" && !fieldErrors[field]) {
      fieldErrors[field] = issue.message;
    }
    if (typeof field === "number" && !fieldErrors.rows) {
      fieldErrors.rows = issue.message;
    }
  }
  return fieldErrors;
}

export function readFormStrings(formData: FormData): Record<string, string> {
  const values: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") values[key] = value;
  }
  return values;
}
