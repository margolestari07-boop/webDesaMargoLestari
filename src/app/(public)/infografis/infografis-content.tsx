"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function InfografisContent() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [downloadState, setDownloadState] = useState<
    "idle" | "loading" | "done"
  >("idle");

  useEffect(() => {
    if (downloadState === "idle") return;
    const timer = window.setTimeout(
      () => setDownloadState(downloadState === "loading" ? "done" : "idle"),
      downloadState === "loading" ? 1200 : 2000,
    );
    return () => window.clearTimeout(timer);
  }, [downloadState]);

  return (
    <main className="bg-surface simple-beranda simple-infografis font-body-md text-on-surface min-h-[calc(100vh-80px)] w-full pt-20 antialiased">
      <div className="flex w-full flex-col">
        <section className="bg-surface-bright relative w-full overflow-hidden pt-6 pb-10">
          <div className="bg-secondary-fixed/25 pointer-events-none absolute -top-32 -right-24 h-96 w-96 rounded-full blur-3xl"></div>
          <div className="bg-primary-fixed/20 pointer-events-none absolute top-12 left-1/3 h-80 w-80 rounded-full blur-3xl"></div>
          <div className="px-gutter relative z-10 mx-auto max-w-7xl">
            <nav className="text-on-surface-variant font-label-sm text-label-sm mb-6 flex items-center gap-2">
              <Link
                className="hover:text-primary flex items-center gap-1 transition-colors"
                href="/"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {"home"}
                </span>{" "}
                {"Beranda"}{" "}
              </Link>
              <span className="material-symbols-outlined text-outline-variant text-[14px]">
                {"chevron_right"}
              </span>
              <span className="hover:text-primary transition-colors">
                {"Infografis"}
              </span>
              <span className="material-symbols-outlined text-outline-variant text-[14px]">
                {"chevron_right"}
              </span>
              <span className="text-primary font-bold">{"Kependudukan"}</span>
            </nav>
            <div className="grid grid-cols-1 items-end justify-between gap-6 lg:grid-cols-12">
              <div className="flex flex-col gap-3 lg:col-span-8">
                <div className="bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm inline-flex w-fit items-center gap-2 rounded-full px-3 py-1">
                  <span
                    className="material-symbols-outlined text-[14px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {"verified"}
                  </span>{" "}
                  {"Sistem Informasi Kependudukan Terpadu (SIAK Desa)"}{" "}
                </div>
                <h1 className="font-display text-display text-on-surface tracking-tight">
                  {"Infografis Kependudukan Desa Sukamaju"}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                  {" "}
                  {
                    "Visualisasi data demografi penduduk yang akurat, mutakhir, dan transparan untuk mendukung perencanaan pembangunan desa serta akuntabilitas tata kelola pemerintahan wilayah."
                  }{" "}
                </p>
              </div>
              <div className="flex flex-col items-start gap-3.5 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
                <div className="bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm flex items-center gap-2 rounded-full px-3.5 py-1.5 shadow-sm">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    {"update"}
                  </span>
                  <span className="">
                    {"Data Terakhir Diperbarui:"}{" "}
                    <strong>{"Semester II 2024"}</strong>
                  </span>
                </div>
                <div className="flex w-full items-center gap-2 sm:w-auto">
                  <button
                    className="bg-primary-container text-on-primary font-label-md text-label-md hover:bg-primary flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 shadow-md transition-all active:scale-[0.98] sm:w-auto"
                    id="downloadBtn"
                    onClick={() => setDownloadState("loading")}
                  >
                    {downloadState === "idle" ? (
                      <>
                        <span className="material-symbols-outlined text-[18px]">
                          {"cloud_download"}
                        </span>
                        <span className="">
                          {"Unduh Rekap Data (PDF/Excel)"}
                        </span>
                      </>
                    ) : downloadState === "loading" ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-[18px]">
                          refresh
                        </span>
                        <span>Menyiapkan Dokumen...</span>
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-[18px]">
                          check_circle
                        </span>
                        <span>Unduhan Dimulai</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface w-full py-8">
          <div className="px-gutter mx-auto max-w-7xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-surface-container-lowest flex flex-col justify-between rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {"Total Penduduk"}
                  </span>
                  <div className="bg-primary-fixed/50 text-primary flex h-10 w-10 items-center justify-center rounded-full">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"groups"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="font-display text-display text-on-surface leading-none font-extrabold">
                      {"4.825"}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      {"Jiwa"}
                    </span>
                  </div>
                  <div className="font-label-sm text-label-sm text-secondary flex items-center gap-1.5 pt-2">
                    <span className="material-symbols-outlined text-[16px]">
                      {"trending_up"}
                    </span>
                    <span className="">
                      {"+2,4% dibanding tahun lalu (4.712)"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest flex flex-col justify-between rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {"Kepala Keluarga (KK)"}
                  </span>
                  <div className="bg-secondary-fixed/50 text-secondary flex h-10 w-10 items-center justify-center rounded-full">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"cottage"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="font-display text-display text-on-surface leading-none font-extrabold">
                      {"1.412"}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      {"KK"}
                    </span>
                  </div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1.5 pt-2">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      {"person_outline"}
                    </span>
                    <span className="">
                      {"Rata-rata 3,4 jiwa per rumah tangga"}
                    </span>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest flex flex-col justify-between rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-3 flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {"Rasio Gender"}
                  </span>
                  <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface rounded-full px-2.5 py-0.5 font-medium">
                    {"103:100"}
                  </span>
                </div>
                <div>
                  <div className="mb-2 grid grid-cols-2 gap-2">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">
                          {"male"}
                        </span>{" "}
                        {"Laki-laki"}{" "}
                      </span>
                      <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {"2.450"}{" "}
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                          {"(50,8%)"}
                        </span>
                      </p>
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm text-secondary flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">
                          {"female"}
                        </span>{" "}
                        {"Perempuan"}{" "}
                      </span>
                      <p className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {"2.375"}{" "}
                        <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                          {"(49,2%)"}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-high flex h-2 w-full overflow-hidden rounded-full">
                    <div
                      className="bg-primary h-full"
                      style={{ width: "50.8%" }}
                    ></div>
                    <div
                      className="bg-secondary-fixed-dim h-full"
                      style={{ width: "49.2%" }}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest flex flex-col justify-between rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                <div className="mb-4 flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    {"Usia Produktif (15-64 Th)"}
                  </span>
                  <div className="bg-tertiary-fixed/60 text-tertiary flex h-10 w-10 items-center justify-center rounded-full">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"bolt"}
                    </span>
                  </div>
                </div>
                <div>
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="font-display text-display text-on-surface leading-none font-extrabold">
                      {"3.120"}
                    </span>
                    <span className="font-label-md text-label-md text-on-surface-variant">
                      {"Jiwa"}
                    </span>
                  </div>
                  <div className="font-label-sm text-label-sm flex items-center justify-between pt-2">
                    <span className="text-primary font-bold">
                      {"64,7% Total Populasi"}
                    </span>
                    <span className="text-on-surface-variant">
                      {"Kepadatan: 312 jiwa/km²"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-4">
          <div className="px-gutter mx-auto max-w-7xl">
            <div className="relative h-48 w-full overflow-hidden rounded-3xl shadow-sm md:h-60">
              <img
                className="h-full w-full object-cover"
                alt="Panoramic landscape of Sukamaju village in rural Indonesia with lush green terraced rice paddies, serene misty volcanic mountains under clear bright cyan-blue sky, local hamlet rooftops blending in morning sun, peaceful agrarian civic atmosphere with calm cyan tones."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcwl7HQomF1q9XOPp7-cKSxycNGvoz_64e2PH0shNk-3Z-fVbHDdyXxrsATe7VyZIoDl5PZFClBAMpKwrw1TNdBP5jJHbuQcQxTQyxJgDcvVtb4G36PPTlEd4F9iq1P5QylljdiRrip446rggqUnR7dGNJNkt5LmkVNDgnfcep4amBSML1fZYAYgnU_z2g9iww9gDeZiEn_trMi1UsPFi7EvFquNa2ZCn_mgIln46M480qkebff_1Q"
              />
              <div className="from-on-surface/85 via-on-surface/40 absolute inset-0 flex items-center bg-gradient-to-r to-transparent p-8 md:p-12">
                <div className="text-on-primary max-w-xl">
                  <span className="bg-primary-fixed/20 text-secondary-fixed font-label-sm text-label-sm mb-2 inline-block rounded-full px-3 py-1 tracking-wider uppercase backdrop-blur-md">
                    {"Potret Wilayah"}
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-primary mb-1 font-bold">
                    {"Desa Sukamaju Mandiri Berkelanjutan"}
                  </h3>
                  <p className="font-body-sm text-body-sm text-surface-container-high leading-relaxed">
                    {" "}
                    {
                      "Meliputi luas wilayah 15,46 km² dengan 4 kedusunan, 19 Rukun Warga (RW), dan 70 Rukun Tetangga (RT) yang guyub rukun dan produktif."
                    }{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface w-full py-10">
          <div className="px-gutter mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">
                  {"Geografi & Teritorial"}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-bold tracking-tight">
                  {" "}
                  {"Distribusi Penduduk Berdasarkan Wilayah Dusun"}{" "}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {" "}
                  {
                    "Proporsi sebaran penduduk di 4 wilayah kedusunan Desa Sukamaju beserta kelengkapan satuan lingkungan setempat."
                  }{" "}
                </p>
              </div>
              <div
                className="flex items-center gap-2 overflow-x-auto pb-1"
                id="dusunFilterGroup"
              >
                <button
                  data-filter="all"
                  className={
                    activeFilter === "all"
                      ? "dusun-tab-btn active font-label-sm text-label-sm bg-primary text-on-primary rounded-full px-4 py-2 whitespace-nowrap shadow-sm transition-all"
                      : "dusun-tab-btn active font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant rounded-full px-4 py-2 whitespace-nowrap transition-all"
                  }
                  onClick={() => setActiveFilter("all")}
                >
                  {"Semua Dusun"}
                </button>
                <button
                  data-filter="krajan"
                  className={
                    activeFilter === "krajan"
                      ? "dusun-tab-btn font-label-sm text-label-sm bg-primary text-on-primary hover:text-primary rounded-full px-4 py-2 whitespace-nowrap shadow-sm transition-all"
                      : "dusun-tab-btn font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary rounded-full px-4 py-2 whitespace-nowrap transition-all"
                  }
                  onClick={() => setActiveFilter("krajan")}
                >
                  {"Krajan"}
                </button>
                <button
                  data-filter="sukosari"
                  className={
                    activeFilter === "sukosari"
                      ? "dusun-tab-btn font-label-sm text-label-sm bg-primary text-on-primary hover:text-primary rounded-full px-4 py-2 whitespace-nowrap shadow-sm transition-all"
                      : "dusun-tab-btn font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary rounded-full px-4 py-2 whitespace-nowrap transition-all"
                  }
                  onClick={() => setActiveFilter("sukosari")}
                >
                  {"Sukosari"}
                </button>
                <button
                  data-filter="wonorejo"
                  className={
                    activeFilter === "wonorejo"
                      ? "dusun-tab-btn font-label-sm text-label-sm bg-primary text-on-primary hover:text-primary rounded-full px-4 py-2 whitespace-nowrap shadow-sm transition-all"
                      : "dusun-tab-btn font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary rounded-full px-4 py-2 whitespace-nowrap transition-all"
                  }
                  onClick={() => setActiveFilter("wonorejo")}
                >
                  {"Wonorejo"}
                </button>
                <button
                  data-filter="sidomulyo"
                  className={
                    activeFilter === "sidomulyo"
                      ? "dusun-tab-btn font-label-sm text-label-sm bg-primary text-on-primary hover:text-primary rounded-full px-4 py-2 whitespace-nowrap shadow-sm transition-all"
                      : "dusun-tab-btn font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary rounded-full px-4 py-2 whitespace-nowrap transition-all"
                  }
                  onClick={() => setActiveFilter("sidomulyo")}
                >
                  {"Sidomulyo"}
                </button>
              </div>
            </div>
            <div className="bg-surface-container-lowest grid grid-cols-1 items-center gap-8 rounded-3xl p-6 shadow-sm md:p-10 lg:grid-cols-12">
              <div className="flex flex-col items-center justify-center p-4 lg:col-span-5">
                <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                  <svg
                    className="h-full w-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="transparent"
                      r="38"
                      stroke="#eff4f6"
                      strokeWidth="15"
                    ></circle>
                    <circle
                      className="cursor-pointer transition-all duration-500 hover:opacity-80"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      id="arcKrajan"
                      r="38"
                      stroke="#005d90"
                      strokeDasharray="83.57 238.76"
                      strokeDashoffset="0"
                      strokeWidth="15"
                      onClick={() => setActiveFilter("krajan")}
                      role="button"
                      aria-label="Filter krajan"
                    ></circle>
                    <circle
                      className="cursor-pointer transition-all duration-500 hover:opacity-80"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      id="arcSukosari"
                      r="38"
                      stroke="#0077b6"
                      strokeDasharray="62.08 238.76"
                      strokeDashoffset="-83.57"
                      strokeWidth="15"
                      onClick={() => setActiveFilter("sukosari")}
                      role="button"
                      aria-label="Filter sukosari"
                    ></circle>
                    <circle
                      className="cursor-pointer transition-all duration-500 hover:opacity-80"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      id="arcWonorejo"
                      r="38"
                      stroke="#00677d"
                      strokeDasharray="50.14 238.76"
                      strokeDashoffset="-145.65"
                      strokeWidth="15"
                      onClick={() => setActiveFilter("wonorejo")}
                      role="button"
                      aria-label="Filter wonorejo"
                    ></circle>
                    <circle
                      className="cursor-pointer transition-all duration-500 hover:opacity-80"
                      cx="50"
                      cy="50"
                      fill="transparent"
                      id="arcSidomulyo"
                      r="38"
                      stroke="#4cd6fb"
                      strokeDasharray="42.98 238.76"
                      strokeDashoffset="-195.79"
                      strokeWidth="15"
                      onClick={() => setActiveFilter("sidomulyo")}
                      role="button"
                      aria-label="Filter sidomulyo"
                    ></circle>
                  </svg>
                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {"Total Populasi"}
                    </span>
                    <span className="font-headline-lg text-headline-lg text-on-surface mt-1 leading-none font-extrabold">
                      {"4.825"}
                    </span>
                    <span className="font-body-sm text-body-sm text-primary mt-1 font-semibold">
                      {"4 Kedusunan"}
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      {"touch_app"}
                    </span>{" "}
                    {
                      "Klik segmen wilayah atau tombol filter untuk penelusuran RT/RW"
                    }{" "}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-4 lg:col-span-7">
                <div
                  className="dusun-item bg-surface-container-low hover:bg-surface-container rounded-2xl p-4.5 transition-all duration-300"
                  id="dusun-card-krajan"
                  style={{
                    display:
                      activeFilter === "all" || activeFilter === "krajan"
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary h-10 w-4 shrink-0 rounded-full"></div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"Dusun Krajan"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Pusat Pemerintahan Desa & Kawasan Niaga Utama"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
                      <span className="font-headline-sm text-headline-sm text-primary font-extrabold">
                        {"1.688 Jiwa"}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        {"(35,0%)"}
                      </span>
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-label-sm text-label-sm mt-3 flex flex-wrap items-center gap-4 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        {"folder_shared"}
                      </span>
                      <span className="">
                        <strong>{"490"}</strong> {"KK"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        {"apartment"}
                      </span>
                      <span className="">
                        <strong>{"6"}</strong> {"Rukun Warga (RW)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary text-[16px]">
                        {"home_pin"}
                      </span>
                      <span className="">
                        <strong>{"22"}</strong> {"Rukun Tetangga (RT)"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="dusun-item bg-surface-container-low hover:bg-surface-container rounded-2xl p-4.5 transition-all duration-300"
                  id="dusun-card-sukosari"
                  style={{
                    display:
                      activeFilter === "all" || activeFilter === "sukosari"
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary-container h-10 w-4 shrink-0 rounded-full"></div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"Dusun Sukosari"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Sentra Agrikultur Padi & Holtikultura Unggulan"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
                      <span className="font-headline-sm text-headline-sm text-primary-container font-extrabold">
                        {"1.255 Jiwa"}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        {"(26,0%)"}
                      </span>
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-label-sm text-label-sm mt-3 flex flex-wrap items-center gap-4 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary-container text-[16px]">
                        {"folder_shared"}
                      </span>
                      <span className="">
                        <strong>{"368"}</strong> {"KK"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary-container text-[16px]">
                        {"apartment"}
                      </span>
                      <span className="">
                        <strong>{"4"}</strong> {"Rukun Warga (RW)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-primary-container text-[16px]">
                        {"home_pin"}
                      </span>
                      <span className="">
                        <strong>{"16"}</strong> {"Rukun Tetangga (RT)"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="dusun-item bg-surface-container-low hover:bg-surface-container rounded-2xl p-4.5 transition-all duration-300"
                  id="dusun-card-wonorejo"
                  style={{
                    display:
                      activeFilter === "all" || activeFilter === "wonorejo"
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary h-10 w-4 shrink-0 rounded-full"></div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"Dusun Wonorejo"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Kawasan Perkebunan Kopi & Wisata Hutan Pinus"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
                      <span className="font-headline-sm text-headline-sm text-secondary font-extrabold">
                        {"1.013 Jiwa"}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        {"(21,0%)"}
                      </span>
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-label-sm text-label-sm mt-3 flex flex-wrap items-center gap-4 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        {"folder_shared"}
                      </span>
                      <span className="">
                        <strong>{"296"}</strong> {"KK"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        {"apartment"}
                      </span>
                      <span className="">
                        <strong>{"5"}</strong> {"Rukun Warga (RW)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        {"home_pin"}
                      </span>
                      <span className="">
                        <strong>{"18"}</strong> {"Rukun Tetangga (RT)"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className="dusun-item bg-surface-container-low hover:bg-surface-container rounded-2xl p-4.5 transition-all duration-300"
                  id="dusun-card-sidomulyo"
                  style={{
                    display:
                      activeFilter === "all" || activeFilter === "sidomulyo"
                        ? "block"
                        : "none",
                  }}
                >
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-secondary-fixed-dim h-10 w-4 shrink-0 rounded-full"></div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"Dusun Sidomulyo"}
                        </h4>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {
                            "Klaster Peternakan Terpadu & Sentra Kerajinan Bambu"
                          }
                        </p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
                      <span className="font-headline-sm text-headline-sm text-on-secondary-fixed-variant font-extrabold">
                        {"869 Jiwa"}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface-variant">
                        {"(18,0%)"}
                      </span>
                    </div>
                  </div>
                  <div className="text-on-surface-variant font-label-sm text-label-sm mt-3 flex flex-wrap items-center gap-4 pt-3">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        {"folder_shared"}
                      </span>
                      <span className="">
                        <strong>{"258"}</strong> {"KK"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        {"apartment"}
                      </span>
                      <span className="">
                        <strong>{"4"}</strong> {"Rukun Warga (RW)"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-secondary text-[16px]">
                        {"home_pin"}
                      </span>
                      <span className="">
                        <strong>{"14"}</strong> {"Rukun Tetangga (RT)"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface-container-lowest w-full py-10">
          <div className="px-gutter mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">
                  {"Ekonomi & Ketahanan Usaha"}
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-bold tracking-tight">
                  {" "}
                  {"Struktur Mata Pencaharian & Pekerjaan Warga"}{" "}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {" "}
                  {
                    "Komposisi profesi masyarakat desa Sukamaju yang menopang ketahanan ekonomi keluarga dan desa."
                  }{" "}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {"Angkatan Kerja:"}
                </span>
                <span className="font-label-md text-label-md bg-primary-fixed text-on-primary-fixed rounded-full px-3 py-1 font-bold">
                  {" "}
                  {"3.645 Jiwa"}{" "}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
              <div className="flex flex-col gap-6 lg:col-span-4">
                <div className="bg-surface-container flex h-full flex-col justify-between rounded-3xl p-6 shadow-sm">
                  <div>
                    <div className="bg-primary text-on-primary mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                      <span className="material-symbols-outlined text-[26px]">
                        {"agriculture"}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">
                      {"Pilar Perekonomian Utama"}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mt-1 mb-3 font-bold">
                      {" "}
                      {"Sektor Primer Pertanian & Perkebunan"}{" "}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 leading-relaxed">
                      {" "}
                      {
                        "Sektor primer (Petani Pemilik & Buruh Tani) tetap menjadi pilar utama dengan kontribusi"
                      }{" "}
                      <strong>{"45,0%"}</strong>{" "}
                      {
                        "dari total angkatan kerja produktif di wilayah desa."
                      }{" "}
                    </p>
                  </div>
                  <div className="relative mb-6 h-40 w-full overflow-hidden rounded-2xl">
                    <img
                      className="h-full w-full object-cover"
                      alt="Close up photograph of modern Indonesian farmer holding fresh rice paddy harvest in agricultural village Sukamaju with morning dew and sunlight reflecting clean water canals, serene tone."
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNsoRJ9WtSWusLAXb6hmeukp6lyABTQnEsU2IPqKDRU7v0qCeM4X1wYc6C8YOMu71oVcX-iKLWynLZiKW2fcRM57JSOydNyW2jU7Bu9oCV7hKnKzolYneNVJ8CVulo6W33XMcck0Z6rMW6qyoskzVq0P9_rUEYzGDcquqw-Ogr6TmpTTJl8yYvp0m34NF4t49zAEu06as30_l_dv3jy_hsMKgdqRKD5YtK-XSTcwfhR2j9qpCKaFVn"
                    />
                    <div className="bg-surface/90 text-on-surface absolute right-2 bottom-2 left-2 flex items-center justify-between rounded-xl px-3 py-2 backdrop-blur-md">
                      <span className="font-label-sm text-label-sm font-semibold">
                        {"Produksi Padi Tahunan"}
                      </span>
                      <span className="font-label-sm text-label-sm text-primary font-extrabold">
                        {"2.420 Ton"}
                      </span>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest flex items-center gap-3 rounded-2xl p-4">
                    <div className="bg-secondary-fixed text-secondary flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                      <span className="material-symbols-outlined text-[20px]">
                        {"storefront"}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <span className="font-label-md text-label-md text-on-surface block truncate font-bold">
                        {"Pertumbuhan UMKM Desa"}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {"680 unit usaha mikro aktif binaan BUMDes"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-low flex flex-col justify-between rounded-3xl p-6 shadow-sm md:p-8 lg:col-span-8">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-primary h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Petani & Pekebun (Lahan Mandiri)"}{" "}
                      </span>
                      <span className="font-bold">
                        {"1.450 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(30,1%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-700"
                        style={{ width: "30.1%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-primary-container h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Buruh Tani & Perkebunan"}{" "}
                      </span>
                      <span className="font-bold">
                        {"720 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(14,9%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary-container h-full rounded-full transition-all duration-700"
                        style={{ width: "14.9%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-secondary h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Wiraswasta, Pengrajin & UMKM"}{" "}
                      </span>
                      <span className="font-bold">
                        {"680 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(14,1%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-secondary h-full rounded-full transition-all duration-700"
                        style={{ width: "14.1%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-secondary-fixed-dim h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Karyawan Swasta & Sektor Industri"}{" "}
                      </span>
                      <span className="font-bold">
                        {"620 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(12,8%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-secondary-fixed-dim h-full rounded-full transition-all duration-700"
                        style={{ width: "12.8%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-tertiary h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Pelajar / Mahasiswa"}{" "}
                      </span>
                      <span className="font-bold">
                        {"420 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(8,7%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-tertiary h-full rounded-full transition-all duration-700"
                        style={{ width: "8.7%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-outline h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Pedagang Pasar & Kuliner"}{" "}
                      </span>
                      <span className="font-bold">
                        {"385 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(8,0%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-outline h-full rounded-full transition-all duration-700"
                        style={{ width: "8.0%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-surface-dim h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Lainnya / Mengurus Rumah Tangga"}{" "}
                      </span>
                      <span className="font-bold">
                        {"355 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(7,4%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-surface-dim h-full rounded-full transition-all duration-700"
                        style={{ width: "7.4%" }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <span className="bg-primary-fixed-dim h-2.5 w-2.5 rounded-full"></span>{" "}
                        {"Aparatur Sipil Negara (ASN), TNI/Polri & Guru"}{" "}
                      </span>
                      <span className="font-bold">
                        {"195 Jiwa"}{" "}
                        <span className="text-on-surface-variant text-label-sm font-label-sm font-normal">
                          {"(4,0%)"}
                        </span>
                      </span>
                    </div>
                    <div className="bg-surface-container-highest h-3 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary-fixed-dim h-full rounded-full transition-all duration-700"
                        style={{ width: "4.0%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface w-full py-10">
          <div className="px-gutter mx-auto max-w-7xl">
            <div className="mb-8">
              <span className="font-label-sm text-label-sm text-primary font-bold tracking-wider uppercase">
                {"Indeks Pembangunan Manusia Desa"}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 font-bold tracking-tight">
                {" "}
                {"Kelompok Rentang Usia & Tingkat Pendidikan"}{" "}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {" "}
                {
                  "Pemetaan demografis piramida generasi serta kualifikasi pendidikan untuk intervensi program layanan sosial dan beasiswa."
                }{" "}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <div className="bg-surface-container-lowest flex flex-col justify-between rounded-3xl p-6 shadow-sm md:p-8">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-primary-fixed text-primary flex h-9 w-9 items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-[20px]">
                          {"hourglass_top"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {"Rentang Kategori Usia"}
                      </h3>
                    </div>
                    <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant rounded-full px-3 py-1 font-medium">
                      {"4 Kategori"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="bg-surface-container-low flex items-center justify-between rounded-2xl p-4">
                      <div>
                        <span className="font-label-md text-label-md text-on-surface block font-bold">
                          {"Balita & Anak-anak (0 - 14 Tahun)"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Generasi penerus & sasaran posyandu aktif"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm text-primary font-extrabold">
                          {"985"}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"20,4%"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low flex items-center justify-between rounded-2xl p-4">
                      <div>
                        <span className="font-label-md text-label-md text-on-surface block font-bold">
                          {"Pemuda Produktif (15 - 39 Tahun)"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Karang taruna, inovator digital & tenaga terampil"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm text-primary font-extrabold">
                          {"1.820"}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"37,7%"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low flex items-center justify-between rounded-2xl p-4">
                      <div>
                        <span className="font-label-md text-label-md text-on-surface block font-bold">
                          {"Dewasa Matang (40 - 64 Tahun)"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Penggerak ekonomi keluarga dan perdesaan"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm text-secondary font-extrabold">
                          {"1.300"}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"27,0%"}
                        </span>
                      </div>
                    </div>
                    <div className="bg-surface-container-low flex items-center justify-between rounded-2xl p-4">
                      <div>
                        <span className="font-label-md text-label-md text-on-surface block font-bold">
                          {"Lanjut Usia (65 Tahun ke atas)"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Sasaran program posyandu lansia & BLT DD"}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-headline-sm text-headline-sm text-outline font-extrabold">
                          {"720"}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"14,9%"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-surface-container-lowest flex flex-col justify-between rounded-3xl p-6 shadow-sm md:p-8">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="bg-secondary-fixed text-secondary flex h-9 w-9 items-center justify-center rounded-full">
                        <span className="material-symbols-outlined text-[20px]">
                          {"school"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                        {"Tingkat Pendidikan Terakhir"}
                      </h3>
                    </div>
                    <span className="font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant rounded-full px-3 py-1 font-medium">
                      {"Warga Usia >12 Th"}
                    </span>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                      <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                        <span className="">
                          {"Diploma / Sarjana (D3, S1, S2)"}
                        </span>
                        <span className="font-bold">{"485 Jiwa (10,1%)"}</span>
                      </div>
                      <div className="bg-surface-container-high h-3 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: "10.1%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                        <span className="">{"SMA / SMK / MA Sederajat"}</span>
                        <span className="font-bold">
                          {"1.820 Jiwa (37,7%)"}
                        </span>
                      </div>
                      <div className="bg-surface-container-high h-3 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-primary-container h-full rounded-full"
                          style={{ width: "37.7%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                        <span className="">{"SMP / MTs Sederajat"}</span>
                        <span className="font-bold">
                          {"1.340 Jiwa (27,8%)"}
                        </span>
                      </div>
                      <div className="bg-surface-container-high h-3 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-secondary h-full rounded-full"
                          style={{ width: "27.8%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                        <span className="">{"Tamat SD / MI Sederajat"}</span>
                        <span className="font-bold">{"960 Jiwa (19,9%)"}</span>
                      </div>
                      <div className="bg-surface-container-high h-3 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-secondary-fixed-dim h-full rounded-full"
                          style={{ width: "19.9%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <div className="text-on-surface font-label-md text-label-md flex items-center justify-between">
                        <span className="">
                          {"Belum / Tidak Tamat Sekolah Dasar"}
                        </span>
                        <span className="font-bold">{"220 Jiwa (4,5%)"}</span>
                      </div>
                      <div className="bg-surface-container-high h-3 w-full overflow-hidden rounded-full">
                        <div
                          className="bg-outline-variant h-full rounded-full"
                          style={{ width: "4.5%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-secondary-fixed/30 mt-6 flex items-center gap-3 rounded-2xl p-4">
                    <span className="material-symbols-outlined text-secondary text-[22px]">
                      {"lightbulb"}
                    </span>
                    <p className="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-snug">
                      {" "}
                      {"Sebanyak"} <strong>{"47,8%"}</strong>{" "}
                      {
                        "warga telah menuntaskan pendidikan menengah atas hingga perguruan tinggi, meningkatkan peluang adopsi teknologi desa digital."
                      }{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-surface w-full py-12">
          <div className="px-gutter mx-auto max-w-7xl">
            <div className="from-primary via-primary-container to-secondary text-on-primary relative overflow-hidden rounded-3xl bg-gradient-to-br p-8 shadow-xl md:p-12">
              <div className="bg-secondary-fixed/20 pointer-events-none absolute -right-16 -bottom-16 h-80 w-80 rounded-full blur-2xl"></div>
              <div className="relative z-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
                <div className="flex flex-col gap-3 lg:col-span-8">
                  <div className="font-label-sm text-label-sm inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-white backdrop-blur-md">
                    <span className="material-symbols-outlined text-[16px]">
                      {"edit_document"}
                    </span>{" "}
                    {"Layanan Mandiri Warga"}{" "}
                  </div>
                  <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-white">
                    {" "}
                    {"Perlu Pemutakhiran Data Kependudukan Anda?"}{" "}
                  </h2>
                  <p className="font-body-lg text-body-lg text-surface-container-low max-w-2xl leading-relaxed">
                    {" "}
                    {
                      "Ajukan permohonan perubahan Kartu Keluarga (KK), Surat Pindah Domisili, Akta Kematian/Kelahiran, atau Surat Pengantar Kependudukan secara daring tanpa antre lama di kantor balai desa."
                    }{" "}
                  </p>
                </div>
                <div className="flex flex-col items-stretch justify-end gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
                  <span className="text-primary font-label-lg text-label-lg hover:bg-surface-container-low inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 shadow-md transition-all active:scale-[0.98]">
                    <span className="material-symbols-outlined text-[20px]">
                      {"assignment"}
                    </span>{" "}
                    {"Layanan Administrasi Desa"}{" "}
                  </span>
                  <span className="font-label-lg text-label-lg inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-transparent px-8 py-3.5 text-white shadow-none transition-all hover:bg-white/10">
                    <span className="material-symbols-outlined text-[20px]">
                      {"support_agent"}
                    </span>{" "}
                    {"Hubungi Petugas Registrasi"}{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
