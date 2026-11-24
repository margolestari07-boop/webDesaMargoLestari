import type { Metadata } from "next";
import { Alert, AlertDescription } from "@/components/tailadmin/ui/alert";
import { requireAdmin } from "@/lib/supabase/authorization";
import { logout } from "./actions";
import { AdminShell } from "./_components/admin-shell";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

function isRedirectError(error: unknown): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    "digest" in error &&
    typeof (error as { digest?: unknown }).digest === "string" &&
    ((error as { digest: string }).digest.startsWith("NEXT_REDIRECT") ||
      (error as { digest: string }).digest.startsWith("NEXT_NOT_FOUND"))
  );
}

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  try {
    await requireAdmin();
  } catch (error) {
    // requireAdmin mengarahkan ke /admin/login lewat redirect(); lempar
    // ulang agar pengalihan tetap berjalan. Error lain (mis. env Supabase
    // belum dikonfigurasi) ditampilkan sebagai pesan jelas, bukan crash.
    if (isRedirectError(error)) throw error;
    return (
      <div className="ta-root flex min-h-svh items-center justify-center bg-gray-50 p-4">
        <main
          className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-sm"
          id="admin-main"
        >
          <p className="text-sm font-medium text-brand-600">
            Panel pengelola
          </p>
          <h1
            className="mt-1 text-xl font-semibold text-gray-800"
            id="admin-error-title"
          >
            Panel belum dapat dibuka
          </h1>
          <Alert className="mt-4" variant="destructive">
            <AlertDescription>
              Konfigurasi Supabase (NEXT_PUBLIC_SUPABASE_URL dan
              NEXT_PUBLIC_SUPABASE_ANON_KEY) belum tersedia atau database
              belum dapat dihubungi. Periksa file .env.local, lalu muat ulang
              halaman ini.
            </AlertDescription>
          </Alert>
        </main>
      </div>
    );
  }

  return <AdminShell logoutAction={logout}>{children}</AdminShell>;
}
