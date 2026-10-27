import { expect, test } from "@playwright/test";

test("beranda mengikuti konten portal Desa Sukamaju", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Selamat Datang di Portal Resmi Desa Sukamaju",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Jelajahi Desa" }),
  ).toHaveAttribute("href", "#galeri");
  await expect(
    page.getByRole("heading", { name: "Sambutan Hangat Kepala Desa Sukamaju" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Dokumentasi & Galeri Desa" }),
  ).toBeVisible();
});

test("profil menandai kecamatan dan data yang belum tersedia", async ({
  page,
}) => {
  await page.goto("/profil");

  await expect(
    page.getByRole("heading", { name: "Desa Margo Lestari" }),
  ).toBeVisible();
  await expect(page.getByText("Perlu diverifikasi")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Visi desa belum tersedia" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Misi desa belum tersedia" }),
  ).toBeVisible();
});

test("sejarah menampilkan dua peristiwa sesuai urutan kronologis", async ({
  page,
}) => {
  await page.goto("/sejarah");

  await expect(
    page.getByRole("heading", { name: "Jejak Desa Margo Lestari" }),
  ).toBeVisible();
  await expect(page.getByText("Sebelum 1986")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Pemekaran dari Gedung Meneng" }),
  ).toBeVisible();
  await expect(page.locator(".history-entry")).toHaveCount(2);

  const entries = page.locator(".history-entry");
  await expect(entries.nth(0)).toContainText("Sebelum 1986");
  await expect(entries.nth(1)).toContainText("1986");
  await expect(entries.nth(1)).toContainText("Desa Persiapan Margo Lestari");
});

test("halaman login admin tersedia tanpa pendaftaran publik", async ({
  page,
}) => {
  await page.goto("/admin/login");

  await expect(
    page.getByRole("heading", { name: "Masuk panel pengelola" }),
  ).toBeVisible();
  await expect(page.getByLabel("Email")).toBeVisible();
  await expect(page.getByLabel("Kata sandi")).toBeVisible();
  await expect(
    page.getByRole("link", { name: /daftar|registrasi/i }),
  ).toHaveCount(0);
});

test("pengunjung tanpa sesi dialihkan dari panel admin ke login", async ({
  page,
}) => {
  await page.goto("/admin");

  await expect(page).toHaveURL("http://127.0.0.1:3000/admin/login");
  await expect(
    page.getByRole("heading", { name: "Masuk panel pengelola" }),
  ).toBeVisible();
});

test("navigasi mobile dapat dibuka dan ditutup dengan kontrol berlabel", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const openMenu = page.getByRole("button", { name: "Buka menu navigasi" });
  await expect(openMenu).toBeVisible();
  await openMenu.click();
  await expect(
    page.getByRole("button", { name: "Tutup menu navigasi" }),
  ).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByRole("navigation", { name: "Navigasi utama" }),
  ).toBeVisible();
});
