"use client";

import { useEffect } from "react";

const infographicMarkup = String.raw`<header class="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"><div class="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md"><div class="flex items-center gap-3 shrink-0"><img alt="Logo Pemerintah Desa" class="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1UK2JG7Zb9JjcjhZr1NqzKtur9_E3PzIr5rdRaLiwW-O3V-fsEbbBmSywnjjFVHFR0RTDZgWW7eD9-KyHBTtytXcUX0IlZl8yEKd4iZRJBhKcEva362DN3JOdWRg8TSmEcyA6Qq5tLGTsmTfdBQpNXvupqJj6dG-6PzmS1ntixdHGYowuWB3T34I3b75aphexMgcCdkX0tpC99MIUhqTkOMdtK9_GK9tQMe6ND0Dw3EmzctQbejaOrRsw"><div class="flex flex-col"><span class="font-label-lg text-label-lg text-on-surface leading-tight tracking-tight">Pemerintah Desa</span><span class="font-label-sm text-label-sm text-on-surface-variant font-medium">Sistem Informasi Pelayanan</span></div></div><nav class="hidden xl:flex items-center gap-6 justify-end flex-1" data-active-classes="text-primary font-bold"><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="beranda" href="/">Beranda</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="profil-desa" href="/profil">Profil Desa</a><div class="relative group py-2"><button class="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface inline-flex items-center gap-1 transition-colors cursor-pointer focus:outline-none" type="button">Infografis<span class="material-symbols-outlined text-[18px] transition-transform duration-200 group-hover:rotate-180">expand_more</span></button><div class="absolute left-0 top-full pt-2 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-200 min-w-[220px]"><div class="bg-surface-container-lowest rounded-xl shadow-[0_12px_28px_-4px_rgba(3,4,94,0.12)] p-2 border border-surface-container-high flex flex-col gap-1"><a aria-current="page" class="hover:bg-surface-container-low px-3 py-2 rounded-lg transition-colors block text-primary font-bold" data-path="kependudukan" href="/infografis">Kependudukan</a><a class="font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low px-3 py-2 rounded-lg transition-colors block" data-path="transparansi-apbdes" href="#">Transparansi APBDes</a></div></div></div><a class="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors" data-path="berita" href="#">Berita</a></nav><div class="flex items-center gap-space-sm"><div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm"><span class="material-symbols-outlined text-on-primary text-[18px]">person</span></div></div></div></header><main class="w-full pt-20 bg-surface min-h-[calc(100vh-80px)]"><div class="flex flex-col w-full">
<!-- Top Breadcrumb & Administrative Header Segment -->
<section class="relative w-full bg-surface-bright pt-6 pb-10 overflow-hidden">
<div class="absolute -top-32 -right-24 w-96 h-96 rounded-full bg-secondary-fixed/25 blur-3xl pointer-events-none"></div>
<div class="absolute top-12 left-1/3 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
<div class="max-w-7xl mx-auto px-gutter relative z-10">
<!-- Breadcrumb navigation -->
<nav class="flex items-center gap-2 mb-6 text-on-surface-variant font-label-sm text-label-sm">
<a class="hover:text-primary transition-colors flex items-center gap-1" href="/">
<span class="material-symbols-outlined text-[16px]">home</span>
          Beranda
        </a>
<span class="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
<span class="hover:text-primary transition-colors">Infografis</span>
<span class="material-symbols-outlined text-[14px] text-outline-variant">chevron_right</span>
<span class="text-primary font-bold">Kependudukan</span>
</nav>
<!-- Page Title & Operational Metadata Split Layout -->
<div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end justify-between">
<div class="lg:col-span-8 flex flex-col gap-3">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm w-fit">
<span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">verified</span>
            Sistem Informasi Kependudukan Terpadu (SIAK Desa)
          </div>
<h1 class="font-display text-display text-on-surface tracking-tight">Infografis Kependudukan Desa Sukamaju</h1>
<p class="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
            Visualisasi data demografi penduduk yang akurat, mutakhir, dan transparan untuk mendukung perencanaan pembangunan desa serta akuntabilitas tata kelola pemerintahan wilayah.
          </p>
</div>
<!-- Meta info & Actions -->
<div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3.5">
<div class="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm shadow-sm">
<span class="material-symbols-outlined text-primary text-[16px]">update</span>
<span class="">Data Terakhir Diperbarui: <strong>Semester II 2024</strong></span>
</div>
<div class="flex items-center gap-2 w-full sm:w-auto">
<button class="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 rounded-full bg-primary-container text-on-primary font-label-md text-label-md shadow-md hover:bg-primary transition-all active:scale-[0.98]" id="downloadBtn">
<span class="material-symbols-outlined text-[18px]">cloud_download</span>
<span class="">Unduh Rekap Data (PDF/Excel)</span>
</button>
</div>
</div>
</div>
</div>
</section>
<!-- Key Demographic Metrics Cards (Top Summary) -->
<section class="w-full bg-surface py-8">
<div class="max-w-7xl mx-auto px-gutter">
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
<!-- Card 1: Total Penduduk -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
<div class="flex items-center justify-between mb-4">
<span class="font-label-md text-label-md text-on-surface-variant">Total Penduduk</span>
<div class="w-10 h-10 rounded-full bg-primary-fixed/50 flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">groups</span>
</div>
</div>
<div>
<div class="flex items-baseline gap-2 mb-1">
<span class="font-display text-display text-on-surface font-extrabold leading-none">4.825</span>
<span class="font-label-md text-label-md text-on-surface-variant">Jiwa</span>
</div>
<div class="flex items-center gap-1.5 font-label-sm text-label-sm text-secondary pt-2">
<span class="material-symbols-outlined text-[16px]">trending_up</span>
<span class="">+2,4% dibanding tahun lalu (4.712)</span>
</div>
</div>
</div>
<!-- Card 2: Jumlah Kepala Keluarga -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
<div class="flex items-center justify-between mb-4">
<span class="font-label-md text-label-md text-on-surface-variant">Kepala Keluarga (KK)</span>
<div class="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">cottage</span>
</div>
</div>
<div>
<div class="flex items-baseline gap-2 mb-1">
<span class="font-display text-display text-on-surface font-extrabold leading-none">1.412</span>
<span class="font-label-md text-label-md text-on-surface-variant">KK</span>
</div>
<div class="flex items-center gap-1.5 font-body-sm text-body-sm text-on-surface-variant pt-2">
<span class="material-symbols-outlined text-[16px] text-primary">person_outline</span>
<span class="">Rata-rata 3,4 jiwa per rumah tangga</span>
</div>
</div>
</div>
<!-- Card 3: Rasio Jenis Kelamin -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
<div class="flex items-center justify-between mb-3">
<span class="font-label-md text-label-md text-on-surface-variant">Rasio Gender</span>
<span class="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-medium">103:100</span>
</div>
<div>
<div class="grid grid-cols-2 gap-2 mb-2">
<div>
<span class="font-label-sm text-label-sm text-primary flex items-center gap-1 font-semibold">
<span class="material-symbols-outlined text-[14px]">male</span> Laki-laki
                </span>
<p class="font-headline-sm text-headline-sm text-on-surface font-bold">2.450 <span class="font-body-sm text-body-sm font-normal text-on-surface-variant">(50,8%)</span></p>
</div>
<div>
<span class="font-label-sm text-label-sm text-secondary flex items-center gap-1 font-semibold">
<span class="material-symbols-outlined text-[14px]">female</span> Perempuan
                </span>
<p class="font-headline-sm text-headline-sm text-on-surface font-bold">2.375 <span class="font-body-sm text-body-sm font-normal text-on-surface-variant">(49,2%)</span></p>
</div>
</div>
<!-- Dual Tone Progress Bar -->
<div class="w-full h-2 rounded-full overflow-hidden flex bg-surface-container-high">
<div class="h-full bg-primary" style="width: 50.8%;"></div>
<div class="h-full bg-secondary-fixed-dim" style="width: 49.2%;"></div>
</div>
</div>
</div>
<!-- Card 4: Usia Produktif -->
<div class="bg-surface-container-lowest rounded-2xl p-6 shadow-sm flex flex-col justify-between transition-all duration-300 hover:shadow-md hover:-translate-y-1">
<div class="flex items-center justify-between mb-4">
<span class="font-label-md text-label-md text-on-surface-variant">Usia Produktif (15-64 Th)</span>
<div class="w-10 h-10 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-tertiary">
<span class="material-symbols-outlined text-[20px]" style="font-variation-settings: 'FILL' 1;">bolt</span>
</div>
</div>
<div>
<div class="flex items-baseline gap-2 mb-1">
<span class="font-display text-display text-on-surface font-extrabold leading-none">3.120</span>
<span class="font-label-md text-label-md text-on-surface-variant">Jiwa</span>
</div>
<div class="flex items-center justify-between font-label-sm text-label-sm pt-2">
<span class="text-primary font-bold">64,7% Total Populasi</span>
<span class="text-on-surface-variant">Kepadatan: 312 jiwa/km²</span>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Visual Break / Photographic Landscape Panorama -->
<section class="w-full py-4">
<div class="max-w-7xl mx-auto px-gutter">
<div class="relative w-full h-48 md:h-60 rounded-3xl overflow-hidden shadow-sm">
<img class="w-full h-full object-cover" data-alt="Panoramic landscape of Sukamaju village in rural Indonesia with lush green terraced rice paddies, serene misty volcanic mountains under clear bright cyan-blue sky, local hamlet rooftops blending in morning sun, peaceful agrarian civic atmosphere with calm cyan tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcwl7HQomF1q9XOPp7-cKSxycNGvoz_64e2PH0shNk-3Z-fVbHDdyXxrsATe7VyZIoDl5PZFClBAMpKwrw1TNdBP5jJHbuQcQxTQyxJgDcvVtb4G36PPTlEd4F9iq1P5QylljdiRrip446rggqUnR7dGNJNkt5LmkVNDgnfcep4amBSML1fZYAYgnU_z2g9iww9gDeZiEn_trMi1UsPFi7EvFquNa2ZCn_mgIln46M480qkebff_1Q">
<div class="absolute inset-0 bg-gradient-to-r from-on-surface/85 via-on-surface/40 to-transparent flex items-center p-8 md:p-12">
<div class="max-w-xl text-on-primary">
<span class="inline-block px-3 py-1 rounded-full bg-primary-fixed/20 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm mb-2 uppercase tracking-wider">Potret Wilayah</span>
<h3 class="font-headline-md text-headline-md text-on-primary font-bold mb-1">Desa Sukamaju Mandiri Berkelanjutan</h3>
<p class="font-body-sm text-body-sm text-surface-container-high leading-relaxed">
              Meliputi luas wilayah 15,46 km² dengan 4 kedusunan, 19 Rukun Warga (RW), dan 70 Rukun Tetangga (RT) yang guyub rukun dan produktif.
            </p>
</div>
</div>
</div>
</div>
</section>
<!-- Section 3: Pembagian Jumlah Penduduk Per Dusun (Donut Chart & Detailed Regional Grid) -->
<section class="w-full py-10 bg-surface">
<div class="max-w-7xl mx-auto px-gutter">
<div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Geografi &amp; Teritorial</span>
<h2 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Distribusi Penduduk Berdasarkan Wilayah Dusun
          </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">
            Proporsi sebaran penduduk di 4 wilayah kedusunan Desa Sukamaju beserta kelengkapan satuan lingkungan setempat.
          </p>
</div>
<!-- Interactive Territory Filter Chips -->
<div class="flex items-center gap-2 overflow-x-auto pb-1" id="dusunFilterGroup">
<button class="dusun-tab-btn active px-4 py-2 rounded-full font-label-sm text-label-sm bg-primary text-on-primary shadow-sm transition-all whitespace-nowrap" data-filter="all">Semua Dusun</button>
<button class="dusun-tab-btn px-4 py-2 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary transition-all whitespace-nowrap" data-filter="krajan">Krajan</button>
<button class="dusun-tab-btn px-4 py-2 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary transition-all whitespace-nowrap" data-filter="sukosari">Sukosari</button>
<button class="dusun-tab-btn px-4 py-2 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary transition-all whitespace-nowrap" data-filter="wonorejo">Wonorejo</button>
<button class="dusun-tab-btn px-4 py-2 rounded-full font-label-sm text-label-sm bg-surface-container-high text-on-surface-variant hover:text-primary transition-all whitespace-nowrap" data-filter="sidomulyo">Sidomulyo</button>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-container-lowest p-6 md:p-10 rounded-3xl shadow-sm">
<!-- Left: Donut Chart Visualization (Inline SVG) -->
<div class="lg:col-span-5 flex flex-col items-center justify-center p-4">
<div class="relative w-64 h-64 sm:w-72 sm:h-72">
<!-- Accessible SVG Donut Chart with theme-precise civic palette -->
<svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
<!-- Background circle -->
<circle cx="50" cy="50" fill="transparent" r="38" stroke="#eff4f6" stroke-width="15"></circle>
<!-- Dusun Krajan (35% -> stroke-dasharray 75.4 214.6) #005d90 (primary) -->
<circle class="transition-all duration-500 hover:opacity-80 cursor-pointer" cx="50" cy="50" fill="transparent" id="arcKrajan" r="38" stroke="#005d90" stroke-dasharray="83.57 238.76" stroke-dashoffset="0" stroke-width="15">
</circle>
<!-- Dusun Sukosari (26% -> 62.08) #0077b6 (primary-container) -->
<circle class="transition-all duration-500 hover:opacity-80 cursor-pointer" cx="50" cy="50" fill="transparent" id="arcSukosari" r="38" stroke="#0077b6" stroke-dasharray="62.08 238.76" stroke-dashoffset="-83.57" stroke-width="15">
</circle>
<!-- Dusun Wonorejo (21% -> 50.14) #00677d (secondary) -->
<circle class="transition-all duration-500 hover:opacity-80 cursor-pointer" cx="50" cy="50" fill="transparent" id="arcWonorejo" r="38" stroke="#00677d" stroke-dasharray="50.14 238.76" stroke-dashoffset="-145.65" stroke-width="15">
</circle>
<!-- Dusun Sidomulyo (18% -> 42.98) #4cd6fb (secondary-fixed-dim) -->
<circle class="transition-all duration-500 hover:opacity-80 cursor-pointer" cx="50" cy="50" fill="transparent" id="arcSidomulyo" r="38" stroke="#4cd6fb" stroke-dasharray="42.98 238.76" stroke-dashoffset="-195.79" stroke-width="15">
</circle>
</svg>
<!-- Center Centerpieces for Donut -->
<div class="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
<span class="font-label-sm text-label-sm text-on-surface-variant">Total Populasi</span>
<span class="font-headline-lg text-headline-lg text-on-surface font-extrabold leading-none mt-1">4.825</span>
<span class="font-body-sm text-body-sm text-primary font-semibold mt-1">4 Kedusunan</span>
</div>
</div>
<div class="text-center mt-3">
<span class="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 justify-center">
<span class="material-symbols-outlined text-[16px] text-primary">touch_app</span>
              Klik segmen wilayah atau tombol filter untuk penelusuran RT/RW
            </span>
</div>
</div>
<!-- Right: Dusun Data Cards Grid -->
<div class="lg:col-span-7 flex flex-col gap-4">
<!-- Item 1: Dusun Krajan -->
<div class="dusun-item p-4.5 rounded-2xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container" id="dusun-card-krajan">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div class="flex items-center gap-3">
<div class="w-4 h-10 rounded-full bg-primary shrink-0"></div>
<div>
<h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Dusun Krajan</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Pusat Pemerintahan Desa &amp; Kawasan Niaga Utama</p>
</div>
</div>
<div class="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
<span class="font-headline-sm text-headline-sm text-primary font-extrabold">1.688 Jiwa</span>
<span class="font-label-md text-label-md text-on-surface-variant">(35,0%)</span>
</div>
</div>
<div class="mt-3 pt-3 flex flex-wrap items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary">folder_shared</span>
<span class=""><strong>490</strong> KK</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary">apartment</span>
<span class=""><strong>6</strong> Rukun Warga (RW)</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary">home_pin</span>
<span class=""><strong>22</strong> Rukun Tetangga (RT)</span>
</div>
</div>
</div>
<!-- Item 2: Dusun Sukosari -->
<div class="dusun-item p-4.5 rounded-2xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container" id="dusun-card-sukosari">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div class="flex items-center gap-3">
<div class="w-4 h-10 rounded-full bg-primary-container shrink-0"></div>
<div>
<h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Dusun Sukosari</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Sentra Agrikultur Padi &amp; Holtikultura Unggulan</p>
</div>
</div>
<div class="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
<span class="font-headline-sm text-headline-sm text-primary-container font-extrabold">1.255 Jiwa</span>
<span class="font-label-md text-label-md text-on-surface-variant">(26,0%)</span>
</div>
</div>
<div class="mt-3 pt-3 flex flex-wrap items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary-container">folder_shared</span>
<span class=""><strong>368</strong> KK</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary-container">apartment</span>
<span class=""><strong>4</strong> Rukun Warga (RW)</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-primary-container">home_pin</span>
<span class=""><strong>16</strong> Rukun Tetangga (RT)</span>
</div>
</div>
</div>
<!-- Item 3: Dusun Wonorejo -->
<div class="dusun-item p-4.5 rounded-2xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container" id="dusun-card-wonorejo">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div class="flex items-center gap-3">
<div class="w-4 h-10 rounded-full bg-secondary shrink-0"></div>
<div>
<h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Dusun Wonorejo</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Kawasan Perkebunan Kopi &amp; Wisata Hutan Pinus</p>
</div>
</div>
<div class="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
<span class="font-headline-sm text-headline-sm text-secondary font-extrabold">1.013 Jiwa</span>
<span class="font-label-md text-label-md text-on-surface-variant">(21,0%)</span>
</div>
</div>
<div class="mt-3 pt-3 flex flex-wrap items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">folder_shared</span>
<span class=""><strong>296</strong> KK</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">apartment</span>
<span class=""><strong>5</strong> Rukun Warga (RW)</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">home_pin</span>
<span class=""><strong>18</strong> Rukun Tetangga (RT)</span>
</div>
</div>
</div>
<!-- Item 4: Dusun Sidomulyo -->
<div class="dusun-item p-4.5 rounded-2xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container" id="dusun-card-sidomulyo">
<div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
<div class="flex items-center gap-3">
<div class="w-4 h-10 rounded-full bg-secondary-fixed-dim shrink-0"></div>
<div>
<h4 class="font-headline-sm text-headline-sm text-on-surface font-bold">Dusun Sidomulyo</h4>
<p class="font-body-sm text-body-sm text-on-surface-variant">Klaster Peternakan Terpadu &amp; Sentra Kerajinan Bambu</p>
</div>
</div>
<div class="flex items-baseline gap-2 self-start sm:self-auto sm:text-right">
<span class="font-headline-sm text-headline-sm text-on-secondary-fixed-variant font-extrabold">869 Jiwa</span>
<span class="font-label-md text-label-md text-on-surface-variant">(18,0%)</span>
</div>
</div>
<div class="mt-3 pt-3 flex flex-wrap items-center gap-4 text-on-surface-variant font-label-sm text-label-sm">
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">folder_shared</span>
<span class=""><strong>258</strong> KK</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">apartment</span>
<span class=""><strong>4</strong> Rukun Warga (RW)</span>
</div>
<div class="flex items-center gap-1.5">
<span class="material-symbols-outlined text-[16px] text-secondary">home_pin</span>
<span class=""><strong>14</strong> Rukun Tetangga (RT)</span>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Section 4: Pengelompokkan Penduduk Berdasarkan Pekerjaan (Occupation Breakdown) -->
<section class="w-full py-10 bg-surface-container-lowest">
<div class="max-w-7xl mx-auto px-gutter">
<div class="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
<div>
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Ekonomi &amp; Ketahanan Usaha</span>
<h2 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
            Struktur Mata Pencaharian &amp; Pekerjaan Warga
          </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">
            Komposisi profesi masyarakat desa Sukamaju yang menopang ketahanan ekonomi keluarga dan desa.
          </p>
</div>
<div class="flex items-center gap-2">
<span class="font-label-sm text-label-sm text-on-surface-variant">Angkatan Kerja:</span>
<span class="font-label-md text-label-md px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-bold">
            3.645 Jiwa
          </span>
</div>
</div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
<!-- Left: Sector Strategic Highlight Card with image -->
<div class="lg:col-span-4 flex flex-col gap-6">
<div class="bg-surface-container rounded-3xl p-6 shadow-sm flex flex-col justify-between h-full">
<div>
<div class="w-12 h-12 rounded-2xl bg-primary text-on-primary flex items-center justify-center mb-5">
<span class="material-symbols-outlined text-[26px]">agriculture</span>
</div>
<span class="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">Pilar Perekonomian Utama</span>
<h3 class="font-headline-md text-headline-md text-on-surface font-bold mt-1 mb-3">
                Sektor Primer Pertanian &amp; Perkebunan
              </h3>
<p class="font-body-md text-body-md text-on-surface-variant leading-relaxed mb-6">
                Sektor primer (Petani Pemilik &amp; Buruh Tani) tetap menjadi pilar utama dengan kontribusi <strong>45,0%</strong> dari total angkatan kerja produktif di wilayah desa.
              </p>
</div>
<!-- Mini Visual Card Component with Contextual Photo -->
<div class="relative w-full h-40 rounded-2xl overflow-hidden mb-6">
<img class="w-full h-full object-cover" data-alt="Close up photograph of modern Indonesian farmer holding fresh rice paddy harvest in agricultural village Sukamaju with morning dew and sunlight reflecting clean water canals, serene tone." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNsoRJ9WtSWusLAXb6hmeukp6lyABTQnEsU2IPqKDRU7v0qCeM4X1wYc6C8YOMu71oVcX-iKLWynLZiKW2fcRM57JSOydNyW2jU7Bu9oCV7hKnKzolYneNVJ8CVulo6W33XMcck0Z6rMW6qyoskzVq0P9_rUEYzGDcquqw-Ogr6TmpTTJl8yYvp0m34NF4t49zAEu06as30_l_dv3jy_hsMKgdqRKD5YtK-XSTcwfhR2j9qpCKaFVn">
<div class="absolute bottom-2 left-2 right-2 bg-surface/90 backdrop-blur-md px-3 py-2 rounded-xl flex items-center justify-between text-on-surface">
<span class="font-label-sm text-label-sm font-semibold">Produksi Padi Tahunan</span>
<span class="font-label-sm text-label-sm text-primary font-extrabold">2.420 Ton</span>
</div>
</div>
<div class="bg-surface-container-lowest p-4 rounded-2xl flex items-center gap-3">
<div class="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary shrink-0">
<span class="material-symbols-outlined text-[20px]">storefront</span>
</div>
<div class="min-w-0">
<span class="font-label-md text-label-md text-on-surface font-bold block truncate">Pertumbuhan UMKM Desa</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">680 unit usaha mikro aktif binaan BUMDes</span>
</div>
</div>
</div>
</div>
<!-- Right: Horizontal Distribution Bars -->
<div class="lg:col-span-8 bg-surface-container-low rounded-3xl p-6 md:p-8 flex flex-col justify-between shadow-sm">
<div class="flex flex-col gap-5">
<!-- Item 1: Petani & Pekebun -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
                  Petani &amp; Pekebun (Lahan Mandiri)
                </span>
<span class="font-bold">1.450 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(30,1%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-primary rounded-full transition-all duration-700" style="width: 30.1%;"></div>
</div>
</div>
<!-- Item 2: Buruh Tani & Perkebunan -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  Buruh Tani &amp; Perkebunan
                </span>
<span class="font-bold">720 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(14,9%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-primary-container rounded-full transition-all duration-700" style="width: 14.9%;"></div>
</div>
</div>
<!-- Item 3: Wiraswasta & UMKM -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  Wiraswasta, Pengrajin &amp; UMKM
                </span>
<span class="font-bold">680 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(14,1%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full transition-all duration-700" style="width: 14.1%;"></div>
</div>
</div>
<!-- Item 4: Karyawan Swasta & Industri -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-secondary-fixed-dim"></span>
                  Karyawan Swasta &amp; Sektor Industri
                </span>
<span class="font-bold">620 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(12,8%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-secondary-fixed-dim rounded-full transition-all duration-700" style="width: 12.8%;"></div>
</div>
</div>
<!-- Item 5: Pelajar / Mahasiswa -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-tertiary"></span>
                  Pelajar / Mahasiswa
                </span>
<span class="font-bold">420 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(8,7%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-tertiary rounded-full transition-all duration-700" style="width: 8.7%;"></div>
</div>
</div>
<!-- Item 6: Pedagang -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-outline"></span>
                  Pedagang Pasar &amp; Kuliner
                </span>
<span class="font-bold">385 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(8,0%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-outline rounded-full transition-all duration-700" style="width: 8.0%;"></div>
</div>
</div>
<!-- Item 7: Belum/Tidak Bekerja -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-surface-dim"></span>
                  Lainnya / Mengurus Rumah Tangga
                </span>
<span class="font-bold">355 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(7,4%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-surface-dim rounded-full transition-all duration-700" style="width: 7.4%;"></div>
</div>
</div>
<!-- Item 8: PNS & Guru -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="flex items-center gap-2">
<span class="w-2.5 h-2.5 rounded-full bg-primary-fixed-dim"></span>
                  Aparatur Sipil Negara (ASN), TNI/Polri &amp; Guru
                </span>
<span class="font-bold">195 Jiwa <span class="font-normal text-on-surface-variant text-label-sm font-label-sm">(4,0%)</span></span>
</div>
<div class="w-full h-3 bg-surface-container-highest rounded-full overflow-hidden">
<div class="h-full bg-primary-fixed-dim rounded-full transition-all duration-700" style="width: 4.0%;"></div>
</div>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Section 5: Piramida Usia & Tingkat Pendidikan (Civic Demographic Depth) -->
<section class="w-full py-10 bg-surface">
<div class="max-w-7xl mx-auto px-gutter">
<div class="mb-8">
<span class="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Indeks Pembangunan Manusia Desa</span>
<h2 class="font-headline-lg text-headline-lg text-on-surface font-bold tracking-tight mt-1">
          Kelompok Rentang Usia &amp; Tingkat Pendidikan
        </h2>
<p class="font-body-md text-body-md text-on-surface-variant mt-1">
          Pemetaan demografis piramida generasi serta kualifikasi pendidikan untuk intervensi program layanan sosial dan beasiswa.
        </p>
</div>
<div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
<!-- Sub-panel A: Kelompok Usia -->
<div class="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-6">
<div class="flex items-center gap-2.5">
<div class="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
<span class="material-symbols-outlined text-[20px]">hourglass_top</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Rentang Kategori Usia</h3>
</div>
<span class="font-label-sm text-label-sm px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-medium">4 Kategori</span>
</div>
<div class="flex flex-col gap-4">
<!-- Balita & Anak-anak (0-14 Th) -->
<div class="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div>
<span class="font-label-md text-label-md text-on-surface font-bold block">Balita &amp; Anak-anak (0 - 14 Tahun)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Generasi penerus &amp; sasaran posyandu aktif</span>
</div>
<div class="text-right">
<span class="font-headline-sm text-headline-sm text-primary font-extrabold">985</span>
<span class="font-label-sm text-label-sm text-on-surface-variant block">20,4%</span>
</div>
</div>
<!-- Usia Produktif Muda (15-39 Th) -->
<div class="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div>
<span class="font-label-md text-label-md text-on-surface font-bold block">Pemuda Produktif (15 - 39 Tahun)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Karang taruna, inovator digital &amp; tenaga terampil</span>
</div>
<div class="text-right">
<span class="font-headline-sm text-headline-sm text-primary font-extrabold">1.820</span>
<span class="font-label-sm text-label-sm text-on-surface-variant block">37,7%</span>
</div>
</div>
<!-- Usia Dewasa Matang (40-64 Th) -->
<div class="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div>
<span class="font-label-md text-label-md text-on-surface font-bold block">Dewasa Matang (40 - 64 Tahun)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Penggerak ekonomi keluarga dan perdesaan</span>
</div>
<div class="text-right">
<span class="font-headline-sm text-headline-sm text-secondary font-extrabold">1.300</span>
<span class="font-label-sm text-label-sm text-on-surface-variant block">27,0%</span>
</div>
</div>
<!-- Lansia (65+ Th) -->
<div class="p-4 rounded-2xl bg-surface-container-low flex items-center justify-between">
<div>
<span class="font-label-md text-label-md text-on-surface font-bold block">Lanjut Usia (65 Tahun ke atas)</span>
<span class="font-body-sm text-body-sm text-on-surface-variant">Sasaran program posyandu lansia &amp; BLT DD</span>
</div>
<div class="text-right">
<span class="font-headline-sm text-headline-sm text-outline font-extrabold">720</span>
<span class="font-label-sm text-label-sm text-on-surface-variant block">14,9%</span>
</div>
</div>
</div>
</div>
</div>
<!-- Sub-panel B: Jenjang Pendidikan Warga -->
<div class="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-between">
<div>
<div class="flex items-center justify-between mb-6">
<div class="flex items-center gap-2.5">
<div class="w-9 h-9 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
<span class="material-symbols-outlined text-[20px]">school</span>
</div>
<h3 class="font-headline-sm text-headline-sm text-on-surface font-bold">Tingkat Pendidikan Terakhir</h3>
</div>
<span class="font-label-sm text-label-sm px-3 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-medium">Warga Usia &gt;12 Th</span>
</div>
<!-- Education Level Visual Bar Group -->
<div class="flex flex-col gap-4">
<!-- Sarjana & Diploma -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="">Diploma / Sarjana (D3, S1, S2)</span>
<span class="font-bold">485 Jiwa (10,1%)</span>
</div>
<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-primary rounded-full" style="width: 10.1%;"></div>
</div>
</div>
<!-- SMA / SMK Sederajat -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="">SMA / SMK / MA Sederajat</span>
<span class="font-bold">1.820 Jiwa (37,7%)</span>
</div>
<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-primary-container rounded-full" style="width: 37.7%;"></div>
</div>
</div>
<!-- SMP / MTs Sederajat -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="">SMP / MTs Sederajat</span>
<span class="font-bold">1.340 Jiwa (27,8%)</span>
</div>
<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-secondary rounded-full" style="width: 27.8%;"></div>
</div>
</div>
<!-- SD / MI Sederajat -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="">Tamat SD / MI Sederajat</span>
<span class="font-bold">960 Jiwa (19,9%)</span>
</div>
<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-secondary-fixed-dim rounded-full" style="width: 19.9%;"></div>
</div>
</div>
<!-- Belum / Tidak Sekolah -->
<div class="flex flex-col gap-1.5">
<div class="flex justify-between items-center text-on-surface font-label-md text-label-md">
<span class="">Belum / Tidak Tamat Sekolah Dasar</span>
<span class="font-bold">220 Jiwa (4,5%)</span>
</div>
<div class="w-full h-3 bg-surface-container-high rounded-full overflow-hidden">
<div class="h-full bg-outline-variant rounded-full" style="width: 4.5%;"></div>
</div>
</div>
</div>
<!-- Insight Note -->
<div class="mt-6 p-4 rounded-2xl bg-secondary-fixed/30 flex items-center gap-3">
<span class="material-symbols-outlined text-secondary text-[22px]">lightbulb</span>
<p class="font-body-sm text-body-sm text-on-secondary-fixed-variant leading-snug">
                Sebanyak <strong>47,8%</strong> warga telah menuntaskan pendidikan menengah atas hingga perguruan tinggi, meningkatkan peluang adopsi teknologi desa digital.
              </p>
</div>
</div>
</div>
</div>
</div>
</section>
<!-- Section 6: Call To Action & Citizen Self-Service Assistance Card -->
<section class="w-full py-12 bg-surface">
<div class="max-w-7xl mx-auto px-gutter">
<div class="relative bg-gradient-to-br from-primary via-primary-container to-secondary rounded-3xl p-8 md:p-12 text-on-primary shadow-xl overflow-hidden">
<!-- Subtle aquatic ambient shape -->
<div class="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-secondary-fixed/20 blur-2xl pointer-events-none"></div>
<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
<div class="lg:col-span-8 flex flex-col gap-3">
<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-label-sm text-label-sm w-fit">
<span class="material-symbols-outlined text-[16px]">edit_document</span>
              Layanan Mandiri Warga
            </div>
<h2 class="font-headline-lg text-headline-lg text-white font-bold tracking-tight">
              Perlu Pemutakhiran Data Kependudukan Anda?
            </h2>
<p class="font-body-lg text-body-lg text-surface-container-low max-w-2xl leading-relaxed">
              Ajukan permohonan perubahan Kartu Keluarga (KK), Surat Pindah Domisili, Akta Kematian/Kelahiran, atau Surat Pengantar Kependudukan secara daring tanpa antre lama di kantor balai desa.
            </p>
</div>
<div class="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end items-stretch lg:items-end">
<a class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-primary font-label-lg text-label-lg shadow-md hover:bg-surface-container-low transition-all active:scale-[0.98]" href="#">
<span class="material-symbols-outlined text-[20px]">assignment</span>
              Layanan Administrasi Desa
            </a>
<a class="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-transparent text-white font-label-lg text-label-lg shadow-none border border-white/40 hover:bg-white/10 transition-all" href="#">
<span class="material-symbols-outlined text-[20px]">support_agent</span>
              Hubungi Petugas Registrasi
            </a>
</div>
</div>
</div>
</div>
</section>
</div>
</main><footer class="w-full bg-inverse-surface text-inverse-on-surface pt-16 pb-12"><div class="max-w-7xl mx-auto px-gutter"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-xl pb-12"><div class="flex flex-col gap-4"><div class="flex items-center gap-3"><img alt="Logo Pemerintah Desa" class="h-8 w-auto object-contain brightness-0 invert" src="https://lh3.googleusercontent.com/aida/AEtjO1UK2JG7Zb9JjcjhZr1NqzKtur9_E3PzIr5rdRaLiwW-O3V-fsEbbBmSywnjjFVHFR0RTDZgWW7eD9-KyHBTtytXcUX0IlZl8yEKd4iZRJBhKcEva362DN3JOdWRg8TSmEcyA6Qq5tLGTsmTfdBQpNXvupqJj6dG-6PzmS1ntixdHGYowuWB3T34I3b75aphexMgcCdkX0tpC99MIUhqTkOMdtK9_GK9tQMe6ND0Dw3EmzctQbejaOrRsw"><span class="font-headline-sm text-headline-sm text-inverse-on-surface font-bold">Pemerintah Desa</span></div><p class="font-body-sm text-body-sm text-surface-dim leading-relaxed">Mewujudkan tata kelola pemerintahan desa yang amanah, transparan, mandiri, dan berkeadaban dengan pelayanan publik terpadu ramah warga.</p><div class="flex items-center gap-3 pt-2"><div class="w-9 h-9 rounded-full bg-surface-variant/20 flex items-center justify-center text-inverse-on-surface"><span class="material-symbols-outlined text-[18px]">mail</span></div><div class="w-9 h-9 rounded-full bg-surface-variant/20 flex items-center justify-center text-inverse-on-surface"><span class="material-symbols-outlined text-[18px]">call</span></div><div class="w-9 h-9 rounded-full bg-surface-variant/20 flex items-center justify-center text-inverse-on-surface"><span class="material-symbols-outlined text-[18px]">share</span></div></div></div><div class="flex flex-col gap-4"><h4 class="font-headline-sm text-headline-sm text-inverse-on-surface font-bold tracking-tight">Pemerintahan</h4><ul class="flex flex-col gap-2.5 font-body-sm text-body-sm text-surface-dim"><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="sambutan" href="#">Sambutan Kepala Desa</a></li><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="sotk" href="#">Struktur Organisasi (SOTK)</a></li><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="transparansi-apbdes" href="#">Transparansi APB Desa</a></li><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="berita" href="#">Warta &amp; Pengumuman</a></li></ul></div><div class="flex flex-col gap-4"><h4 class="font-headline-sm text-headline-sm text-inverse-on-surface font-bold tracking-tight">Layanan Mandiri</h4><ul class="flex flex-col gap-2.5 font-body-sm text-body-sm text-surface-dim"><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="administrasi" href="#">Surat Keterangan Usaha (SKU)</a></li><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="administrasi" href="#">Surat Pengantar Domisili</a></li><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="administrasi" href="#">Surat Keterangan Tidak Mampu</a></li><li class=""><a class="hover:text-inverse-on-surface transition-colors" data-path="galeri" href="#">Dokumentasi Kegiatan Desa</a></li></ul></div><div class="flex flex-col gap-4"><h4 class="font-headline-sm text-headline-sm text-inverse-on-surface font-bold tracking-tight">Kantor Pelayanan</h4><div class="flex flex-col gap-2 font-body-sm text-body-sm text-surface-dim"><p class="">Jl. Raya Utama Kantor Balai Desa No. 01</p><p class="">Kecamatan Nusantara, Kode Pos 61253</p><p class="pt-1 font-label-sm text-label-sm text-secondary-fixed-dim">Senin – Jumat: 08.00 – 15.30 WIB</p></div><div class="pt-1"><a class="inline-flex items-center gap-2 font-label-md text-label-md text-secondary-fixed hover:text-inverse-on-surface transition-colors" data-path="kontak" href="#">Hubungi Balai Desa<span class="material-symbols-outlined text-[16px]">arrow_forward</span></a></div></div></div><div class="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-surface-dim"><p class="">© 2025 Pemerintah Desa. Seluruh hak cipta dilindungi undang-undang.</p><div class="flex items-center gap-6 font-label-sm text-label-sm"><a class="hover:text-inverse-on-surface transition-colors" href="#">Kebijakan Privasi</a><a class="hover:text-inverse-on-surface transition-colors" href="#">Keterbukaan Informasi</a><a class="hover:text-inverse-on-surface transition-colors" href="#">Peta Situs</a></div></div></div></footer>

`;

export default function InfografisContent({
  fontClassName,
}: {
  fontClassName: string;
}) {
  useEffect(() => {
    const page = document.querySelector(".simple-infografis");
    if (!page) return;

    const cleanups: Array<() => void> = [];
    const timers: number[] = [];
    const buttons = Array.from(
      page.querySelectorAll<HTMLButtonElement>(".dusun-tab-btn"),
    );
    const cards: Record<string, HTMLElement | null> = {
      krajan: page.querySelector("#dusun-card-krajan"),
      sukosari: page.querySelector("#dusun-card-sukosari"),
      wonorejo: page.querySelector("#dusun-card-wonorejo"),
      sidomulyo: page.querySelector("#dusun-card-sidomulyo"),
    };

    buttons.forEach((button) => {
      const onClick = () => {
        buttons.forEach((item) => {
          item.classList.remove("bg-primary", "text-on-primary", "shadow-sm");
          item.classList.add("bg-surface-container-high", "text-on-surface-variant");
        });

        button.classList.add("bg-primary", "text-on-primary", "shadow-sm");
        button.classList.remove("bg-surface-container-high", "text-on-surface-variant");

        const filter = button.getAttribute("data-filter");
        Object.entries(cards).forEach(([key, card]) => {
          if (!card) return;
          if (filter === "all" || filter === key) {
            card.style.display = "block";
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          } else {
            card.style.display = "none";
          }
        });
      };

      button.addEventListener("click", onClick);
      cleanups.push(() => button.removeEventListener("click", onClick));
    });

    const arcMap: Record<string, string> = {
      arcKrajan: "krajan",
      arcSukosari: "sukosari",
      arcWonorejo: "wonorejo",
      arcSidomulyo: "sidomulyo",
    };

    Object.entries(arcMap).forEach(([arcId, filter]) => {
      const arc = page.querySelector("#" + arcId);
      if (!arc) return;

      const onClick = () => {
        page
          .querySelector<HTMLButtonElement>('button[data-filter="' + filter + '"]')
          ?.click();
      };
      arc.addEventListener("click", onClick);
      cleanups.push(() => arc.removeEventListener("click", onClick));
    });

    const downloadButton = page.querySelector<HTMLButtonElement>("#downloadBtn");
    if (downloadButton) {
      const onDownload = () => {
        const originalText = downloadButton.innerHTML;
        downloadButton.innerHTML =
          '<span class="material-symbols-outlined text-[18px] animate-spin">refresh</span><span>Menyiapkan Dokumen...</span>';
        timers.push(
          window.setTimeout(() => {
            downloadButton.innerHTML =
              '<span class="material-symbols-outlined text-[18px]">check_circle</span><span>Unduhan Dimulai</span>';
            timers.push(
              window.setTimeout(() => {
                downloadButton.innerHTML = originalText;
              }, 2000),
            );
          }, 1200),
        );
      };

      downloadButton.addEventListener("click", onDownload);
      cleanups.push(() => downloadButton.removeEventListener("click", onDownload));
    }

    return () => {
      cleanups.forEach((cleanup) => cleanup());
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, []);

  return (
    <div
      className={`${fontClassName} simple-beranda simple-infografis bg-surface font-body-md text-on-surface antialiased`}
      dangerouslySetInnerHTML={{ __html: infographicMarkup }}
      id="main-content"
    />
  );
}
