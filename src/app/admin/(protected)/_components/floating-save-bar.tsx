"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/tailadmin/ui/button";

// Bar simpan mengambang untuk form admin: menempel di bawah viewport
// (sticky) supaya tombol simpan selalu terlihat tanpa scroll ke bawah.
// Status di kiri memberitahu apakah ada perubahan yang belum disimpan;
// deteksinya membandingkan isi form saat ini dengan cuplikan awal
// (FormData), jadi perubahan lewat tombol tambah/hapus baris pun ikut
// terhitung, bukan hanya ketikan.
export function FloatingSaveBar({
  pending = false,
  saved = false,
  saveLabel = "Simpan perubahan",
  savingLabel = "Menyimpan…",
  hint = "Perubahan langsung tampil di halaman publik setelah disimpan.",
}: {
  pending?: boolean;
  saved?: boolean;
  saveLabel?: string;
  savingLabel?: string;
  hint?: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const snapshotRef = useRef<string>("");
  const wasPendingRef = useRef(false);
  const resnapshotRef = useRef<() => void>(() => {});
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    const serialize = () => {
      const form = barRef.current?.closest("form");
      if (!form) return "";
      const data = new FormData(form);
      return JSON.stringify([...data.entries()].sort());
    };
    const check = () => {
      // Tunggu satu frame agar React selesai me-render perubahan state
      // (mis. tambah/hapus baris galeri) sebelum membandingkan.
      requestAnimationFrame(() => {
        setDirty(serialize() !== snapshotRef.current);
      });
    };
    resnapshotRef.current = () => {
      snapshotRef.current = serialize();
      setDirty(false);
    };
    snapshotRef.current = serialize();
    const form = barRef.current?.closest("form");
    if (!form) return;
    form.addEventListener("input", check);
    form.addEventListener("change", check);
    form.addEventListener("click", check);
    return () => {
      form.removeEventListener("input", check);
      form.removeEventListener("change", check);
      form.removeEventListener("click", check);
    };
  }, []);

  // Setelah simpan berhasil, cuplikan diperbarui supaya status kembali
  // bersih. Dilacak lewat transisi pending agar simpan kedua, ketiga,
  // dan seterusnya juga ikut direset.
  useEffect(() => {
    if (pending) {
      wasPendingRef.current = true;
      return;
    }
    if (wasPendingRef.current && saved) {
      resnapshotRef.current();
      wasPendingRef.current = false;
    }
  }, [pending, saved]);

  return (
    <div
      ref={barRef}
      className="sticky bottom-4 z-30 flex flex-col gap-3 rounded-2xl border border-gray-200 bg-white/95 p-3 shadow-theme-lg backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:p-4"
    >
      <p
        aria-live="polite"
        className="flex items-center gap-2 text-sm text-gray-600"
      >
        <span
          aria-hidden
          className={
            pending
              ? "size-2.5 animate-pulse rounded-full bg-brand-500"
              : dirty
                ? "size-2.5 animate-pulse rounded-full bg-amber-500"
                : "size-2.5 rounded-full bg-green-500"
          }
        />
        {pending
          ? savingLabel
          : dirty
            ? "Ada perubahan yang belum disimpan"
            : hint}
      </p>
      <Button className="w-full sm:w-auto" disabled={pending} type="submit">
        {pending ? savingLabel : saveLabel}
      </Button>
    </div>
  );
}
