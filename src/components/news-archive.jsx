"use client";

import { useState } from "react";

const materialIconClass = "material-symbols-outlined";

const archives = [
  {
    year: "Tahun 2025 (48 Berita)",
    icon: "folder_open",
    months: [
      ["Oktober 2025", "6", true],
      ["September 2025", "8"],
      ["Agustus 2025", "5"],
      ["Juli 2025", "7"],
      ["Semester I 2025", "22"],
    ],
  },
  {
    year: "Tahun 2024 (28 Berita)",
    icon: "folder",
    months: [
      ["Semester II 2024", "16 berita"],
      ["Semester I 2024", "12 berita"],
    ],
  },
  {
    year: "Tahun 2023 (34 Berita)",
    icon: "folder",
    months: [["Arsip Lengkap 2023", "34 berita"]],
  },
  {
    year: "Tahun 2022 (24 Berita)",
    icon: "folder",
    months: [["Arsip Lengkap 2022", "24 berita"]],
  },
  {
    year: "Tahun 2021 & Sebelumnya (16 Berita)",
    icon: "history",
    months: [["Arsip Historis Desa", "16 berita"]],
  },
];

export function NewsArchive() {
  const [openYear, setOpenYear] = useState(0);

  return (
    <div className="bg-surface-container-lowest flex flex-col gap-4 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center gap-2.5 pb-2">
        <span className="bg-secondary-fixed text-primary-container flex h-8 w-8 items-center justify-center rounded-full">
          <span className={`${materialIconClass} text-[20px]`}>
            inventory_2
          </span>
        </span>
        <div className="flex flex-col">
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Arsip Berita
          </h2>
          <span className="font-label-sm text-label-sm text-on-surface-variant">
            Dokumentasi warta per periode
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {archives.map((archive, index) => {
          const isOpen = openYear === index;
          return (
            <div
              className="bg-surface-container-low overflow-hidden rounded-2xl transition-all"
              key={archive.year}
            >
              <button
                aria-expanded={isOpen}
                className={`hover:bg-surface-container w-full px-4 ${index === 0 ? "font-label-lg text-label-lg text-primary-container py-3.5 font-bold" : "font-label-md text-label-md text-on-surface py-3"} flex items-center justify-between text-left transition-colors`}
                onClick={() => setOpenYear(isOpen ? -1 : index)}
                type="button"
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`${materialIconClass} text-[20px] ${index === 0 ? "" : "text-outline"}`}
                  >
                    {archive.icon}
                  </span>
                  {archive.year}
                </span>
                <span
                  className={`${materialIconClass} chevron text-[20px] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                >
                  expand_more
                </span>
              </button>
              <div
                className={`${index === 0 ? `${isOpen ? "flex" : "hidden"} font-body-sm text-body-sm flex-col gap-2 px-4 pt-1 pb-4` : `${isOpen ? "" : "hidden"} text-on-surface-variant font-body-sm text-body-sm flex-col gap-1 px-4 pt-1 pb-3`}`}
              >
                {archive.months.map(([label, count, isCurrent]) => (
                  <div
                    className={
                      index === 0
                        ? `flex items-center justify-between rounded-lg px-3 py-1.5 transition-colors ${isCurrent ? "bg-surface-container-lowest text-primary font-semibold" : "text-on-surface-variant hover:bg-surface-container-lowest"}`
                        : "text-on-surface-variant flex justify-between rounded px-2 py-1"
                    }
                    key={label}
                  >
                    <span className="flex items-center gap-2">
                      {index === 0 && (
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${isCurrent ? "bg-primary" : "bg-outline-variant"}`}
                        />
                      )}
                      {label}
                    </span>
                    <span
                      className={
                        index === 0
                          ? `rounded-full px-2 py-0.5 text-xs ${isCurrent ? "bg-primary-fixed text-on-primary-fixed-variant" : "bg-surface-container text-on-surface-variant"}`
                          : ""
                      }
                    >
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
