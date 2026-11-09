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

test("infografis memuat data dan filter wilayah dusun", async ({ page }) => {
  await page.goto("/infografis");

  await expect(
    page.getByRole("heading", {
      name: "Infografis Kependudukan Desa Sukamaju",
    }),
  ).toBeVisible();
  await expect(page.getByText("4.825", { exact: true }).first()).toBeVisible();

  await page
    .locator('button[data-filter="sidomulyo"]')
    .evaluate((button) => (button as HTMLButtonElement).click());
  await expect(page.locator("#dusun-card-sidomulyo")).toBeVisible();
  await expect(page.locator("#dusun-card-krajan")).toBeHidden();
});

test("berita menampilkan daftar artikel dan komponen shell bersama", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto("/berita", { waitUntil: "domcontentloaded" });

  await expect(
    page.getByRole("heading", { name: "Warta & Berita Desa Sukamaju" }),
  ).toBeVisible();
  await expect(page.locator("article")).toHaveCount(9);
  await expect(
    page.getByRole("heading", { name: "Arsip Berita" }),
  ).toBeVisible();
  await expect(page.locator("header")).toBeVisible();
  await expect(page.locator("footer")).toBeAttached();
  await expect(page.locator('a[href="#"]')).toHaveCount(0);

  const newsLink = page.locator('header a[href="/berita"]');
  await expect(newsLink).toHaveAttribute("aria-current", "page");

  const archive2024 = page.getByRole("button", { name: /Tahun 2024/ });
  await archive2024.click();
  await expect(archive2024).toHaveAttribute("aria-expanded", "true");
  await expect(page.getByText("Semester II 2024")).toBeVisible();
});

test("profil menampilkan identitas dan struktur Desa Sukamaju", async ({
  page,
}) => {
  await page.goto("/profil");

  await expect(
    page.getByRole("heading", { name: "Profil Desa Sukamaju" }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Sejarah & Perkembangan Desa Sukamaju",
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
  for (const route of ["/", "/profil", "/infografis", "/berita"]) {
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
