"use client";

import { useRouter } from "next/navigation";

const materialIconClass = "material-symbols-outlined";

/**
 * Select pengurutan berita. Mengubah parameter ?sort= di URL dan
 * membiarkan halaman server memuat ulang daftar dari database.
 */
export function NewsSortSelect({ value, currentParams }) {
  const router = useRouter();

  const onChange = (event) => {
    const params = new URLSearchParams(currentParams);
    const next = event.target.value;
    if (next === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", next);
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `/berita?${query}` : "/berita");
  };

  return (
    <div className="relative">
      <select
        className="font-label-sm text-label-sm text-on-surface bg-surface-container-lowest cursor-pointer appearance-none rounded-lg py-1.5 pr-8 pl-3 shadow-sm focus:outline-none"
        id="sortNews"
        onChange={onChange}
        value={value}
      >
        <option value="newest">Terbaru (Default)</option>
        <option value="popular">Terpopuler</option>
        <option value="oldest">Terlama</option>
      </select>
      <span
        className={`${materialIconClass} text-on-surface-variant pointer-events-none absolute top-1.5 right-2 text-[18px]`}
      >
        expand_more
      </span>
    </div>
  );
}
