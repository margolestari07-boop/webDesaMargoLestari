import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

// Unit test saja (tests/unit). E2E tetap di Playwright (tests/e2e) dan
// smoke test HTTP tetap di scripts/smoke-check.mjs.
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts"],
  },
});
