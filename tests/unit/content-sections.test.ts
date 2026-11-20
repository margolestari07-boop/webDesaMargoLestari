import { describe, expect, it, vi } from "vitest";

// Modul di bawah mengimpor "server-only" (melempar bila dievaluasi di luar
// server). Di unit test, stub modul itu — yang diuji di sini adalah logika
// pemilihan section/revisi, bukan runtime Next.js.
vi.mock("server-only", () => ({}));

import { sectionLabel } from "@/lib/content/revisions";
import {
  SECTION_KEYS,
  getPublishedSection,
  getWorkingRevision,
  listRevisions,
} from "@/lib/content/sections";

type Row = Record<string, unknown>;

type FakeClientOptions = {
  /** Nama tabel yang simulasinya mengembalikan error. */
  errorTable?: string;
};

/**
 * Klien Supabase palsu minimal: hanya rantai query yang dipakai
 * getPublishedSection / getWorkingRevision / listRevisions
 * (from → select → eq → order → limit → maybeSingle / await langsung).
 */
function createFakeClient(
  seed: Record<string, Row[]>,
  options: FakeClientOptions = {},
) {
  return {
    from(table: string) {
      const rows = [...(seed[table] ?? [])];
      const filters: Array<(row: Row) => boolean> = [];
      let sortKey: string | null = null;
      let sortAscending = true;
      let limitCount: number | null = null;

      const apply = (): Row[] => {
        let result = rows.filter((row) => filters.every((f) => f(row)));
        if (sortKey) {
          result = [...result].sort((a, b) => {
            const av = a[sortKey as string];
            const bv = b[sortKey as string];
            if (typeof av === "number" && typeof bv === "number") {
              return sortAscending ? av - bv : bv - av;
            }
            return 0;
          });
        }
        if (limitCount !== null) result = result.slice(0, limitCount);
        return result;
      };

      const builder: Record<string, unknown> = {
        select() {
          return builder;
        },
        eq(column: string, value: unknown) {
          filters.push((row) => row[column] === value);
          return builder;
        },
        order(column: string, opts: { ascending: boolean }) {
          sortKey = column;
          sortAscending = opts.ascending;
          return builder;
        },
        limit(count: number) {
          limitCount = count;
          return builder;
        },
        async maybeSingle() {
          if (options.errorTable === table) {
            return { data: null, error: { message: "simulasi error" } };
          }
          const found = apply();
          return { data: found[0] ?? null, error: null };
        },
        // Builder Supabase adalah thenable: listRevisions meng-await langsung.
        then(
          onFulfilled: (value: unknown) => unknown,
          onRejected: (reason: unknown) => unknown,
        ) {
          const value =
            options.errorTable === table
              ? { data: null, error: { message: "simulasi error" } }
              : { data: apply(), error: null };
          return Promise.resolve(value).then(onFulfilled, onRejected);
        },
      };
      return builder;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
}

const sectionRow = {
  id: "section-1",
  key: "population",
  published_revision_id: "rev-2",
};

const revisions = [
  { id: "rev-1", section_id: "section-1", status: "draft", revision_no: 1 },
  {
    id: "rev-2",
    section_id: "section-1",
    status: "published",
    revision_no: 2,
  },
];

describe("SECTION_KEYS", () => {
  it("memuat tepat 4 section konten", () => {
    expect([...SECTION_KEYS]).toEqual([
      "home",
      "profile",
      "population",
      "apbdes",
    ]);
  });
});

describe("sectionLabel", () => {
  it("mengembalikan label Indonesia untuk setiap section", () => {
    expect(sectionLabel("home")).toBe("Beranda");
    expect(sectionLabel("profile")).toBe("Profil Desa");
    expect(sectionLabel("population")).toBe("Kependudukan");
    expect(sectionLabel("apbdes")).toBe("APBDes");
  });
});

describe("getPublishedSection", () => {
  const seed = {
    content_sections: [sectionRow],
    content_revisions: revisions,
  };

  it("mengembalikan section + revisi terbit yang ditunjuk", async () => {
    const client = createFakeClient(seed);
    const result = await getPublishedSection(client, "population");
    expect(result).not.toBeNull();
    expect(result?.section.id).toBe("section-1");
    expect(result?.revision.id).toBe("rev-2");
    expect(result?.revision.status).toBe("published");
  });

  it("mengembalikan null bila section tidak ditemukan", async () => {
    const client = createFakeClient({ content_sections: [], content_revisions: [] });
    expect(await getPublishedSection(client, "population")).toBeNull();
  });

  it("mengembalikan null bila belum ada revisi terbit yang ditunjuk", async () => {
    const client = createFakeClient({
      content_sections: [{ ...sectionRow, published_revision_id: null }],
      content_revisions: revisions,
    });
    expect(await getPublishedSection(client, "population")).toBeNull();
  });

  it("mengembalikan null bila revisi yang ditunjuk bukan published", async () => {
    const client = createFakeClient({
      content_sections: [{ ...sectionRow, published_revision_id: "rev-1" }],
      content_revisions: revisions,
    });
    expect(await getPublishedSection(client, "population")).toBeNull();
  });

  it("mengembalikan null bila query section error (revisi kerja tidak bocor)", async () => {
    const client = createFakeClient(seed, { errorTable: "content_sections" });
    expect(await getPublishedSection(client, "population")).toBeNull();
  });

  it("mengembalikan null bila query revisi error", async () => {
    const client = createFakeClient(seed, { errorTable: "content_revisions" });
    expect(await getPublishedSection(client, "population")).toBeNull();
  });
});

describe("getWorkingRevision", () => {
  const seed = {
    content_sections: [sectionRow],
    content_revisions: revisions,
  };

  it("mengembalikan revisi kerja terbaru dari section", async () => {
    const client = createFakeClient(seed);
    const revision = await getWorkingRevision(client, "population");
    expect(revision?.id).toBe("rev-1");
    expect(revision?.status).toBe("draft");
  });

  it("mengembalikan null bila section tidak ditemukan", async () => {
    const client = createFakeClient({ content_sections: [], content_revisions: [] });
    expect(await getWorkingRevision(client, "population")).toBeNull();
  });

  it("mengembalikan null bila tidak ada revisi kerja", async () => {
    const client = createFakeClient({
      content_sections: [sectionRow],
      content_revisions: [revisions[1]],
    });
    expect(await getWorkingRevision(client, "population")).toBeNull();
  });
});

describe("listRevisions", () => {
  const seed = {
    content_sections: [sectionRow],
    content_revisions: revisions,
  };

  it("mengembalikan revisi dengan nomor terbaru dulu", async () => {
    const client = createFakeClient(seed);
    const rows = await listRevisions(client, "population");
    expect(rows.map((row) => row.id)).toEqual(["rev-2", "rev-1"]);
  });

  it("mengembalikan array kosong bila section tidak ditemukan", async () => {
    const client = createFakeClient({ content_sections: [], content_revisions: [] });
    expect(await listRevisions(client, "population")).toEqual([]);
  });

  it("mengembalikan array kosong bila query error", async () => {
    const client = createFakeClient(seed, { errorTable: "content_revisions" });
    expect(await listRevisions(client, "population")).toEqual([]);
  });

  it("menghormati batas limit", async () => {
    const client = createFakeClient(seed);
    const rows = await listRevisions(client, "population", 1);
    expect(rows).toHaveLength(1);
    expect(rows[0]?.id).toBe("rev-2");
  });
});
