import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const port = 3107;
const baseUrl = `http://127.0.0.1:${port}`;
const server = spawn(
  process.execPath,
  [
    "node_modules/next/dist/bin/next",
    "start",
    "--hostname",
    "127.0.0.1",
    "--port",
    String(port),
  ],
  { cwd: process.cwd(), stdio: "ignore" },
);
const serverExited = new Promise((resolve) => server.once("exit", resolve));
const routeChecks = [
  {
    path: "/",
    requiredContent: [
      'lang="id"',
      'href="#main-content"',
      "Pusat informasi Desa Margo Lestari",
      "Jelajahi informasi",
      "Margo Lestari akan ditambahkan",
      "Tanjung Bintang",
      "Jati Agung",
    ],
  },
  {
    path: "/profil",
    requiredContent: [
      "Identitas wilayah",
      "Kecamatan",
      "Perlu diverifikasi",
      "Jati Agung",
      "Visi desa belum tersedia",
      "Misi desa belum tersedia",
    ],
  },
  {
    path: "/sejarah",
    requiredContent: [
      "Jejak Desa Margo Lestari",
      "Sebelum 1986",
      "Desa/Kelurahan Gedung Meneng",
      "1986",
      "Desa Persiapan Margo Lestari",
      "Kecamatan Tanjung Bintang",
    ],
  },
  {
    path: "/admin/login",
    requiredContent: [
      "Masuk panel pengelola",
      "Akses ini hanya untuk akun yang telah didaftarkan",
      'type="password"',
    ],
  },
];

let lastError;

try {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Next.js server exited with code ${server.exitCode}`);
    }

    try {
      await fetch(`${baseUrl}/`, { signal: AbortSignal.timeout(4_000) });
      break;
    } catch (error) {
      lastError = error;
      await sleep(500);
    }
  }

  for (const route of routeChecks) {
    const response = await fetch(`${baseUrl}${route.path}`, {
      signal: AbortSignal.timeout(4_000),
    });
    assert.equal(
      response.status,
      200,
      `${route.path} should respond with HTTP 200`,
    );

    const html = (await response.text()).replaceAll("<!-- -->", "");
    for (const content of route.requiredContent) {
      assert.ok(
        html.includes(content),
        `${route.path} is missing expected content: ${content}`,
      );
    }
  }

  const adminResponse = await fetch(`${baseUrl}/admin`, {
    redirect: "manual",
    signal: AbortSignal.timeout(4_000),
  });
  assert.equal(
    adminResponse.status,
    307,
    "Unauthenticated /admin should redirect to /admin/login",
  );
  assert.equal(
    new URL(adminResponse.headers.get("location"), baseUrl).pathname,
    "/admin/login",
    "Unauthenticated /admin should redirect to the login page",
  );

  console.log(
    `Production HTTP smoke check passed for ${routeChecks.length} routes and unauthenticated admin redirect.`,
  );
} catch (error) {
  if (
    lastError &&
    error instanceof Error &&
    error.message.includes("fetch failed")
  ) {
    throw new Error(`Production server did not respond: ${lastError}`);
  }
  throw error;
} finally {
  if (server.exitCode === null) {
    server.kill();
    const exited = await Promise.race([
      serverExited.then(() => true),
      sleep(5_000).then(() => false),
    ]);
    if (!exited) server.kill("SIGKILL");
  }
}
