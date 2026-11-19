import { redirect } from "next/navigation";

/**
 * Struktur organisasi hanya dikelola di /admin/struktur (satu sumber
 * untuk Beranda dan Profil Desa). Rute ini hanya pengalihan.
 */
export default function BerandaStrukturRedirect() {
  redirect("/admin/struktur");
}
