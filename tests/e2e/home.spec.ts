import { expect, test } from "@playwright/test";

// Catatan 2026-11-19: ekspektasi diperbarui dari prototipe Desa Sukamaju ke
// konten nyata Desa Margo Lestari (lihat smoke test yang sudah diperbaiki
// sebelumnya). Judul/angka lama ("Sambutan Hangat", "4.825", filter dusun
// "sidomulyo") sudah tidak ada di aplikasi saat ini.

test("beranda mengikuti konten portal Desa Margo Lestari", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Selamat Datang di Portal Resmi Desa Margo Lestari",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Jelajahi Desa" }),
  ).toHaveAttribute("href", "#galeri");
  await expect(
    page.getByRole("heading", { name: "Dokumentasi & Galeri Desa" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Struktur Organisasi & Perangkat Desa Margo Lestari",
    }),
  ).toBeVisible();
});

test("infografis memuat ringkasan kependudukan", async ({ page }) => {
  await page.goto("/infografis");

  await expect(
    page.getByRole("heading", {
      name: "Infografis Kependudukan Desa Margo Lestari",
    }),
  ).toBeVisible();
  await expect(page.getByText(/3\.062/).first()).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Total penduduk" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Kepala keluarga" }),
  ).toBeVisible();
});

test("berita menampilkan daftar artikel dan komponen shell bersama", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto("/berita", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: "Berita Desa Margo Lestari" }),
  ).toBeVisible();
  await expect(page.locator("article")).toHaveCount(6);
  // Halaman berita dinamis: 6 artikel per halaman dari 13 artikel terbit.
  await expect(page.getByText(/Menampilkan/)).toBeVisible();
  await expect(page.getByText("1–6")).toBeVisible();
  await expect(page.getByText("Berita Terbit")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Arsip Berita" }),
  ).toBeVisible();
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("footer")).toBeAttached();
  await expect(page.locator('a[href="#"]')).toHaveCount(0);

  const newsLink = page.locator('header a[href="/berita"]');
  await expect(newsLink).toHaveAttribute("aria-current", "page");

  // Arsip kini dihitung dari database per kategori, bukan per tahun statis.
  const archiveFirst = page.getByRole("button", {
    name: /Pemerintahan \(3 Berita\)/,
  });
  await expect(archiveFirst).toHaveAttribute("aria-expanded", "true");
  await archiveFirst.click();
  await expect(archiveFirst).toHaveAttribute("aria-expanded", "false");
});

test("APBDes menampilkan laporan dan submenu Infografis aktif", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto("/infografis/apbdes", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: "Infografis APBDes Desa Margo Lestari" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Ringkasan Realisasi APBDes Tahun 2024",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "5 Bidang Penyerapan Belanja Desa" }),
  ).toBeVisible();
  await expect(
    page.locator('header a[href="/infografis/apbdes"]'),
  ).toHaveAttribute("aria-current", "page");
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("footer")).toBeAttached();
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});

test("submenu Infografis mengarahkan ke route yang benar", async ({ page }) => {
  test.setTimeout(120_000);

  const navigation = page.getByRole("navigation", { name: "Navigasi utama" });
  const infografisMenu = navigation.getByRole("button", { name: "Infografis" });

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await infografisMenu.click();
  await navigation.getByRole("link", { name: "Kependudukan" }).click();
  await expect(page).toHaveURL(/\/infografis$/);

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await infografisMenu.click();
  await navigation.getByRole("link", { name: "Transparansi APBDes" }).click();
  await expect(page).toHaveURL(/\/infografis\/apbdes$/);
});

test("profil menampilkan identitas dan struktur Desa Margo Lestari", async ({
  page,
}) => {
  await page.goto("/profil");

  await expect(
    page.getByRole("heading", { name: "Profil Desa Margo Lestari" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Sejarah & Perkembangan Desa Margo Lestari",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Bagan Struktur Organisasi Pemerintah Desa (SOTK)",
    }),
  ).toBeVisible();
});

test("navbar dan footer bersama tidak menampilkan route yang belum diimplementasikan", async ({
  page,
}) => {
  for (const route of [
    "/",
    "/profil",
    "/infografis",
    "/infografis/apbdes",
    "/berita",
  ]) {
    await page.goto(route);

    const header = page.locator("header");
    const footer = page.locator("footer");
    await expect(header).toBeVisible();
    await expect(footer).toBeAttached();
    await expect(header.getByRole("link", { name: "Beranda" })).toHaveAttribute(
      "href",
      "/",
    );
    await expect(
      header.getByRole("link", { name: "Profil Desa" }),
    ).toHaveAttribute("href", "/profil");
    await expect(header.locator('a[href="/infografis"]')).toHaveCount(1);
    await expect(header.locator('a[href="/infografis/apbdes"]')).toHaveCount(1);
    await expect(header.locator('a[href="/berita"]')).toHaveCount(1);
    await expect(page.locator('a[href="#"]')).toHaveCount(0);

    for (const unavailablePath of [
      "/potensi",
      "/kegiatan",
      "/galeri",
      "/layanan",
      "/transparansi",
      "/lokasi",
      "/kontak",
      "/sejarah",
    ]) {
      await expect(page.locator(`a[href="${unavailablePath}"]`)).toHaveCount(0);
    }
  }
});

test("sejarah menampilkan dua peristiwa sesuai urutan kronologis", async ({
  page,
}) => {
  await page.goto("/sejarah");

  await expect(
    page.getByRole("heading", { name: "Jejak Desa Margo Lestari" }),
  ).toBeVisible();
  await expect(page.getByText("Sebelum 1986")).toBeVisible();
  await expect(page.getByText("Pemekaran dari Gedung Meneng")).toBeVisible();
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
  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Kata sandi", { exact: true })).toBeVisible();
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

test("navbar sumber tetap memakai shell bersama di viewport mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await expect(page.locator("header")).toBeVisible();
  await expect(page.getByAltText("Logo Pemerintah Desa").first()).toBeVisible();
  await expect(
    page.getByRole("navigation", { name: "Navigasi utama" }),
  ).toBeHidden();
  await expect(page.locator('a[href="#"]')).toHaveCount(0);
});
