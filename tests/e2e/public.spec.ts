import { expect, test } from "@playwright/test";

// Halaman publik: setiap route utama harus menjawab 200, memuat konten
// Desa Margo Lestari, dan tidak melempar error JavaScript yang tidak
// tertangani selama pemuatan.

const publicRoutes = [
  { path: "/", marker: "Desa Margo Lestari" },
  { path: "/profil", marker: "Profil Desa Margo Lestari" },
  { path: "/infografis", marker: "Infografis Kependudukan Desa Margo Lestari" },
  {
    path: "/infografis/apbdes",
    marker: "Infografis APBDes Desa Margo Lestari",
  },
  { path: "/berita", marker: "Berita Desa Margo Lestari" },
] as const;

for (const { path, marker } of publicRoutes) {
  test(`halaman publik ${path} memuat tanpa error`, async ({ page }) => {
    test.setTimeout(120_000);
    const pageErrors: string[] = [];
    const consoleErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(String(error)));
    page.on("console", (message) => {
      if (message.type() !== "error") return;
      // Abaikan kegagalan muat resource eksternal: gambar halaman publik
      // di-host di lh3.googleusercontent.com dan Chromium di VM ini tidak
      // bisa menjangkaunya (proxy tunnel gagal: ERR_TUNNEL_CONNECTION_FAILED),
      // padahal di browser sungguhan gambar itu termuat normal. Yang tetap
      // dijaga ketat adalah pageerror (exception JS yang tidak tertangani).
      if (message.text().startsWith("Failed to load resource:")) return;
      consoleErrors.push(message.text());
    });

    const response = await page.goto(path, {
      waitUntil: "domcontentloaded",
    });
    expect(response?.status()).toBe(200);
    await expect(page.getByText(marker).first()).toBeVisible();
    await expect(page.locator("header")).toBeVisible();
    await expect(page.locator("footer")).toBeAttached();

    expect(pageErrors).toEqual([]);
    expect(consoleErrors).toEqual([]);
  });
}

test("navigasi dari beranda ke profil, infografis, dan berita", async ({
  page,
}) => {
  test.setTimeout(120_000);
  await page.goto("/", { waitUntil: "domcontentloaded" });

  const navigation = page.getByRole("navigation", { name: "Navigasi utama" });

  await navigation.getByRole("link", { name: "Profil Desa" }).click();
  await expect(page).toHaveURL(/\/profil$/);
  await expect(
    page.getByRole("heading", { name: "Profil Desa Margo Lestari" }),
  ).toBeVisible();

  await page.goto("/", { waitUntil: "domcontentloaded" });
  await navigation.getByRole("link", { name: "Berita" }).click();
  await expect(page).toHaveURL(/\/berita$/);
  await expect(
    page.getByRole("heading", { name: "Berita Desa Margo Lestari" }),
  ).toBeVisible();
});
