import { expect, test } from "@playwright/test";

// Panel admin (tanpa login): redirect, form login, dan pesan error generik
// untuk kredensial salah. Kredensial yang dipakai di sini sengaja salah
// (akun dummy yang tidak ada) — TIDAK ADA kredensial asli di file ini.
//
// Tes dengan login sungguhan hanya berjalan bila env TEST_ADMIN_EMAIL dan
// TEST_ADMIN_PASSWORD tersedia; tanpa keduanya, tes tersebut di-skip dengan
// pesan yang jelas. Contoh menjalankan:
//   TEST_ADMIN_EMAIL=admin@desa.id TEST_ADMIN_PASSWORD='...' npm run test:e2e

test("pengunjung tanpa sesi dialihkan ke halaman login admin", async ({
  page,
}) => {
  await page.goto("/admin");
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(
    page.getByRole("heading", { name: "Masuk panel pengelola" }),
  ).toBeVisible();
});

test("halaman login menampilkan form email dan kata sandi", async ({
  page,
}) => {
  await page.goto("/admin/login");

  await expect(page.getByLabel("Email", { exact: true })).toBeVisible();
  await expect(page.getByLabel("Kata sandi", { exact: true })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Masuk", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: /Tampilkan kata sandi/ }),
  ).toBeVisible();
});

test("login dengan kredensial salah menampilkan pesan generik", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto("/admin/login");

  await page.getByLabel("Email", { exact: true }).fill("salah@contoh.id");
  await page.getByLabel("Kata sandi", { exact: true }).fill("Salah1234!");
  await page
    .getByRole("button", { name: "Masuk", exact: true })
    .click();

  // #login-message adalah elemen pesan error login; getByRole("alert") saja
  // tidak bisa dipakai karena Next.js juga me-render #__next-route-announcer__
  // dengan role="alert" (strict mode violation).
  await expect(page.locator("#login-message")).toContainText(
    "Email atau kata sandi tidak cocok",
  );
  await expect(page).toHaveURL(/\/admin\/login$/);
});

test.describe("panel admin setelah login", () => {
  const email = process.env.TEST_ADMIN_EMAIL;
  const password = process.env.TEST_ADMIN_PASSWORD;

  test.skip(
    !email || !password,
    "Butuh TEST_ADMIN_EMAIL dan TEST_ADMIN_PASSWORD untuk tes login admin.",
  );

  test.beforeEach(async ({ page }) => {
    test.setTimeout(120_000);
    await page.goto("/admin/login");
    await page.getByLabel("Email").fill(email as string);
    await page.getByLabel("Kata sandi").fill(password as string);
    await page
      .getByRole("button", { name: "Masuk", exact: true })
      .click();
    await expect(page).toHaveURL(/\/admin$/);
  });

  test("dashboard memuat panel pengelola dan sidebar", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Panel pengelola" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Ringkasan" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Konten Beranda" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Laporan Kependudukan" }),
    ).toBeVisible();
    await expect(page.getByRole("link", { name: "APBDes" })).toBeVisible();
  });

  test("ikon sidebar tampil sebagai ikon SVG, bukan teks literal", async ({
    page,
  }) => {
    // Regresi bug ikon 2026-11-19 (diperbarui 2026-11-20): panel admin
    // kini memakai ikon SVG TailAdmin asli. Sidebar harus memuat <svg>
    // dan tidak boleh ada teks nama ikon literal yang bocor.
    const sidebarIcon = page
      .locator('[data-slot="sidebar"] svg')
      .first();
    await expect(sidebarIcon).toBeAttached();
    for (const literal of [
      "holiday_village",
      "dashboard",
      "account_balance_wallet",
      "table_chart",
      "pie_chart",
      "person",
      "settings",
    ]) {
      await expect(page.getByText(literal, { exact: true })).toHaveCount(0);
    }
  });

  test("halaman kependudukan memuat form edit langsung", async ({ page }) => {
    await page.goto("/admin/kependudukan");
    await expect(page).toHaveURL(/\/admin\/kependudukan$/);
    await expect(
      page.getByRole("heading", { name: "Kependudukan" }),
    ).toBeVisible();
    // Edit langsung: tidak ada lagi tombol buat draf/terbit; penyimpanan
    // memakai tombol "Simpan perubahan" yang langsung tampil di publik.
    await expect(
      page.getByRole("button", { name: "Simpan perubahan" }),
    ).toBeVisible();
    await expect(page.getByText("Buat draf baru")).toHaveCount(0);
    await expect(page.getByText("Terbitkan draf ini")).toHaveCount(0);
  });
});
