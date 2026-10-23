"use server";

import { revalidatePath, updateTag } from "next/cache";
import { siteSettingsSchema } from "@/lib/validators/site-settings";
import { requireAdmin } from "@/lib/supabase/authorization";
import { SITE_SETTINGS_CACHE_TAG } from "@/lib/site-settings";

const formFields = [
  "village_name",
  "tagline",
  "subdistrict",
  "regency",
  "province",
  "address",
  "latitude",
  "longitude",
  "contact_person",
  "phone",
  "email",
  "service_hours",
  "website",
  "facebook",
  "instagram",
  "youtube",
  "status",
] as const;

export type SettingsState = {
  kind: "idle" | "error" | "success";
  message: string | null;
  fieldErrors: Record<string, string>;
  values?: Record<string, string>;
};

function readFormValues(formData: FormData) {
  return Object.fromEntries(
    formFields.map((field) => {
      const value = formData.get(field);
      return [field, typeof value === "string" ? value : ""];
    }),
  );
}

export async function saveSiteSettings(
  _previousState: SettingsState,
  formData: FormData,
): Promise<SettingsState> {
  const { supabase } = await requireAdmin();
  const values = readFormValues(formData);
  const parsed = siteSettingsSchema.safeParse(values);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};

    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    }

    return {
      kind: "error",
      message: "Periksa kembali isian yang ditandai.",
      fieldErrors,
      values,
    };
  }

  const settings = parsed.data;
  const socialLinks = {
    website: settings.website,
    facebook: settings.facebook,
    instagram: settings.instagram,
    youtube: settings.youtube,
  };
  const { data, error } = await supabase
    .from("site_settings")
    .update({
      village_name: settings.village_name,
      tagline: settings.tagline,
      subdistrict: settings.subdistrict,
      regency: settings.regency,
      province: settings.province,
      address: settings.address,
      latitude: settings.latitude,
      longitude: settings.longitude,
      contact_person: settings.contact_person,
      phone: settings.phone,
      email: settings.email,
      service_hours: settings.service_hours,
      social_links: socialLinks,
      status: settings.status,
    })
    .eq("singleton", true)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return {
      kind: "error",
      message: "Pengaturan belum tersimpan. Silakan coba lagi.",
      fieldErrors: {},
      values,
    };
  }

  updateTag(SITE_SETTINGS_CACHE_TAG);
  revalidatePath("/", "layout");
  revalidatePath("/admin/pengaturan");

  return {
    kind: "success",
    message:
      settings.status === "published"
        ? "Pengaturan tersimpan dan diterbitkan ke situs publik."
        : "Draf pengaturan berhasil disimpan.",
    fieldErrors: {},
    values,
  };
}
