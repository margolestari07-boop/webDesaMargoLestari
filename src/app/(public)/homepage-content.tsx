"use client";

import Image from "next/image";
import { useRef } from "react";

const officers = [
  {
    name: "H. Suryadi, S.Sos.",
    role: "Kepala Desa",
    badge: "Pimpinan",
    id: "NIPD: 19740512 200103 1 004",
    detail: "Masa Tugas: 2021 – 2027",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKbK5Ii9akDYNk1w9fwkOAYykKVGxB9CvmJexhVy9uTfmVMuZJ10qh0pPW_Oyn3gofJOOrtbYIh_R-wKr-H7H1cazpuBOj7bAeSNRVB4bOMuaorb5XlSHbdJQ1RCYDhQiCuOf6U2OEnCkQyNHLbAT2a3fLsz4kjJXhYj_uhIG3KTWQKRH6-DGKQNWwHweXRk-qKrUVCo2DZFi1kB7MaBV192pMmiSGMahma-BGcjSHio_AIlTU7KY",
    alt: "Official civic portrait photo of a mid-fifties Indonesian male village head Kepala Desa",
    badgeClass: "bg-primary-container text-on-primary",
  },
  {
    name: "Siti Rahmawati, S.E.",
    role: "Sekretaris Desa",
    badge: "Sekretariat",
    id: "NIPD: 19820315 200801 2 007",
    detail: "Tata Usaha & Administrasi",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbbaG6eMtXv40xBp6Uy_jL0s_opcPtOGfCbL_oOYashiLdXP7AGsJIsseMWVt9qUodv7hpckGu23Ry3MJ2n8NpD05Do-y5xuKrdZr990ZyQraKGr0LGnSHmq_MDlb4MO5cqoGb6-rowI6DATDnOh8SYGcDTWZVJFAOcDUX_KRrTQIoEWk5ggbu_Vexq5LR2L77H9g2wjs21BQhAsOB94GqHcdCGGqzVFJyr7l_AKrXvKTVgVIvtzE",
    alt: "Official civic portrait photo of a polite Indonesian female village secretary Sekretaris Desa",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Bambang Wijaya, A.Md.",
    role: "Kaur Keuangan",
    badge: "Keuangan",
    id: "NIPD: 19891104 201502 1 009",
    detail: "APBDes & Perbendaharaan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChcQmIxELDQ1s0E745_nm7fSisWOOVj9Z9Usxm6dfbCMqYAJWG17kn8FSJdL1Qz47Hnm4qso1RA-9gN_3NtowwdnLOzTQ-BN90abQfFe13FnxSRPIMXrWiCRdO96qbW98KDxm1pNsx5I_zwpsXaQzBOpUZVRYEJJCfUAkSg68WKz7LbukA9zMfNNHeKPGm9_dGkeJcWrUGo-6Kwnpn-Ls9Z1qzPr_bk_bn1Lwbo7lvFQaA9Ihtt60",
    alt: "Official civic portrait photo of a young professional Indonesian male village financial officer Kaur Keuangan",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Ahmad Fauzi, S.T.",
    role: "Kaur Perencanaan",
    badge: "Perencanaan",
    id: "NIPD: 19860719 201204 1 003",
    detail: "Aset Desa & Tata Ruang",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCS0u4NJsQ0OTre8P-K_vKmNxSU2qkZQ-bFoOC6V3zaQEeGcxspnpfHrNE6vQD-MZNX8Jt96m73F9cIjH6C40A5qqJW1AryHHvpoLFo7mqa1YDWdY85OjSO2-O3fq8CvDIG1ZLVhoUA4RiVPXtZsewTUSxBPNJiY9x7eOI9cXGIBqdq202Jq7SGuWsQBI7Ti6DtoM0pcv8zZOU7sOWP6v3dU10QQNInJJYwn-P6mzFp2UzmGVcF6Fo",
    alt: "Official civic portrait photo of an Indonesian male village planning officer Kaur Umum",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Raden Hendra, S.IP.",
    role: "Kasi Pemerintahan",
    badge: "Pemerintahan",
    id: "NIPD: 19840211 201103 1 002",
    detail: "Regulasi & Wilayah Desa",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKrb4jSXW98S94PotLbx0uEmX1zLceZRBIuaj2jxYtZC_QlIDUk1_yGdhDNK29I4FXOci7xWjJrBNxk5c-fDFa0K_u3sLEovOxwc4dZKZpY4xwoNNwPVc5WQuG0wiszsAkhENYYA9aW409xsIYFQjf01YYuwlWEft1vEQa-xnRNffZpQYuKa7GXqWw5Mrtxf1cggtBV8KXpSLLjivVBMdzTg8YZpeJ2AKtnhwd5TUWXZwcUQIs-Rc",
    alt: "Official portrait photo of Kasi Pemerintahan village administrator",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Nur Annisa, S.Sos.",
    role: "Kasi Kesejahteraan",
    badge: "Kesejahteraan",
    id: "NIPD: 19880924 201402 2 005",
    detail: "Pemberdayaan & Bansos",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwT00Qbt3CfMDxCXxpkUlhHqUN6ZuQ45XkTKoRkn5c5qMiEToP6NIC2RgmwBIIYBXQ8qpXwNReouVgMvlCLIo4xalO2WxiMZTchZAyFXtQYM-IpNVRu261ubC9Qnqm_Ou9qcmXymjwf6S8cgo22VlRPRbUkE9hQwaWU8CQkwVLlgHFZDzEhAvhs5bNWzh4ZTeTu8aAqRjGly1raPcCVEBncTyW8MFfLKdJZ4gHVR5JUp4TZ0K7K7o",
    alt: "Official portrait photo of female Kasi Kesejahteraan village welfare coordinator",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Dedi Prasetyo, S.Kom.",
    role: "Kasi Pelayanan",
    badge: "Pelayanan",
    id: "NIPD: 19910518 201801 1 008",
    detail: "Layanan Warga & Kependudukan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4V2uWC11W9-wJ-6SytuG9wmtRDofArviSmvjw_Hsu_jVNYENN7ylAX2hcSkEgYaOJSgZqyCSdrXKJxTZLwKi7Uh3u6rLkFd87KROm52K_rboOhC53Jx_8a96pyvSbA9nVugICVn2_SStNhYZZxUOgE5LR3Vg-0TDX5TEGXGDeldT9Ih7dl6r9GmnYP-jFP_tkxoIy5DLOS9zeIb59P87P9gjqTfgVod9rgmLi-1MSrH1FV4gMfoY",
    alt: "Official portrait photo of Kasi Pelayanan village public service officer",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
  {
    name: "Sutrisno",
    role: "Koordinator Kadus",
    badge: "Kewilayahan",
    id: "NIPD: 19780102 200602 1 011",
    detail: "Wilayah Dusun 1 – 4 Sukamaju",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2VsL0NucROBe0ExeNVpYOa_JbnF96Tip7xhm0_LR1rN1IQPyjxFRSjPpiLmR0u05P7fXXpP5uSGCgPGO1ZcUusL6tI7mJXsF7kXdaW3uuakU9WsjRUOR338aaPgbY72aSXHoLYbwSQU9h3p5UicZuTcKu8h90W7EZVpGDiSUR6qLw-cTs2nBmf9326vJtOeo3upf8nfOOcTMp2doZkIygGxFvXbHzt_s5ek5Ivv5DbArengd0Ik",
    alt: "Official portrait photo of senior village hamlet head Kadus",
    badgeClass: "bg-surface-variant/90 text-on-surface",
  },
];

const news = [
  {
    category: "Pembangunan",
    date: "24 Oktober 2025",
    title: "Penyelesaian Pembangunan Saluran Irigasi Tersier Dusun Krajan",
    summary:
      "Saluran irigasi sepanjang 650 meter resmi selesai dibangun dan kini mengairi 45 hektar sawah kelompok tani secara optimal menyongsong musim tanam.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDlpqykdWAqBbcGEy3cNTLq8FJhoDQXzFA_99L1QBxK6GSk_G6xBTbN1pHUlE25Xxx8h83LpClgsQ7YYvME5YN2y7Au7OWAhZLhRqd-jpiFpLdv4g_mdhu7U2ZLsKIW2oczHSBFGfxumBMrfxWahOHQHDoTWyZlQoiDRH9knCGL-Z73lWFjuqEYmQYTQvuI9X0aIEjZd88HOD5cesSCmmYnNDoM9tqLYy2QHLCE-PBJCIW6QI8AcMM",
    alt: "Village construction workers and farmers actively constructing a modern concrete tertiary irrigation water canal across emerald green rural rice fields, sunny tropical afternoon, crisp civic documentation.",
    badgeClass: "bg-primary-container text-on-primary",
  },
  {
    category: "Kesehatan",
    date: "22 Oktober 2025",
    title: "Pelaksanaan Posyandu Balita dan Pencegahan Stunting Serentak",
    summary:
      "Pemerintah desa berkolaborasi dengan Puskesmas menggelar pemantauan gizi, imunisasi, dan distribusi makanan tambahan di 4 pos dusun.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAwT00Qbt3CfMDxCXxpkUlhHqUN6ZuQ45XkTKoRkn5c5qMiEToP6NIC2RgmwBIIYBXQ8qpXwNReouVgMvlCLIo4xalO2WxiMZTchZAyFXtQYM-IpNVRu261ubC9Qnqm_Ou9qcmXymjwf6S8cgo22VlRPRbUkE9hQwaWU8CQkwVLlgHFZDzEhAvhs5bNWzh4ZTeTu8aAqRjGly1raPcCVEBncTyW8MFfLKdJZ4gHVR5JUp4TZ0K7K7o",
    alt: "Indonesian female healthcare cadres and mothers holding happy toddlers at a community Posyandu healthcare post inside village hall, weighing scale and nutritious supplementary feeding program, warm cheerful atmosphere.",
    badgeClass: "bg-secondary-fixed/50 text-secondary",
  },
  {
    category: "Pertanian",
    date: "19 Oktober 2025",
    title: "Pelatihan Budidaya Pertanian Organik Bersama Kelompok Tani Desa",
    summary:
      "Meningkatkan efisiensi biaya tanam dan menjaga kesuburan tanah dengan pemanfaatan pupuk hayati mandiri berbasis potensi limbah ternak.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCVsJaeNZ2AX60RD5lYHCo4Ar3GgT-6sTbz403mynK4MQxM6kkroJSGoU8Tfyfjrpx4g9jEiV_hVSJmjI272WllA3jwTHp7CD36Diejmne6e9XjnMJE1FhAAmZmMNNXpg5TkV6TO2LovcWCa0y8Tr63MNOpGk1s13dejh-Ds08T_moUvqIrBXH55NyJnNSrJsQRq--GSjCImhHJ5D8c0Y9-zPNd_JFaeIcL_XB5J_-7ECnHuoc6-2Q",
    alt: "Indonesian organic farmers group gathered in an open-air agricultural field receiving training on composting and eco-enzymes from an agricultural extension officer, hands-on demonstration, vibrant lush crops.",
    badgeClass: "bg-secondary-fixed/50 text-secondary",
  },
  {
    category: "Pengumuman",
    date: "15 Oktober 2025",
    title: "Sosialisasi Pemutakhiran Data Terpadu Kesejahteraan Sosial (DTKS)",
    summary:
      "Warga diimbau memverifikasi berkas identitas keluarga melalui ketua RT masing-masing guna ketepatan sasaran bantuan perlindungan sosial.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBKrb4jSXW98S94PotLbx0uEmX1zLceZRBIuaj2jxYtZC_QlIDUk1_yGdhDNK29I4FXOci7xWjJrBNxk5c-fDFa0K_u3sLEovOxwc4dZKZpY4xwoNNwPVc5WQuG0wiszsAkhENYYA9aW409xsIYFQjf01YYuwlWEft1vEQa-xnRNffZpQYuKa7GXqWw5Mrtxf1cggtBV8KXpSLLjivVBMdzTg8YZpeJ2AKtnhwd5TUWXZwcUQIs-Rc",
    alt: "Village hall socialization hall with presentation projector and attentive neighborhood leaders RT RW listening to explanation about integrated social welfare database DTKS, professional civil setting.",
    badgeClass: "bg-tertiary-fixed text-tertiary",
  },
  {
    category: "Kemasyarakatan",
    date: "11 Oktober 2025",
    title: "Gotong Royong Kebersihan Lingkungan Menyambut Musim Penghujan",
    summary:
      "Aksi serentak pembersihan saluran air dan perindangan lingkungan di seluruh wilayah RT untuk antisipasi luapan air dan penyakit demam berdarah.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDnHoqNYS78_mMTIMbybENKSe3R6_KigKzQdmREG7_pBafSD3uLMThjRVBVUVcc20PLLuvih1N75A9atuwI6Vr1fzn4ldjEQJaZSQV9HggeWLG0KXuDX5CxDi1mxVYX4KPEQCUjH7CKBEWaW1MX-xbNLg4SLJF-19vOq75hqmHvcENvu0tfVL0kbquqbbMDYzj5YKYSdgZLDaZqKwkGGviB49C9uzpZ1XbG17zURdkCcXK8n4EsvW8",
    alt: "Enthusiastic Indonesian neighborhood residents doing community cleanup gotong royong clearing drainage canals and trimming village roadside greenery together on Sunday morning with cheerful camaraderie.",
    badgeClass: "bg-secondary-fixed/50 text-secondary",
  },
  {
    category: "Pemberdayaan",
    date: "05 Oktober 2025",
    title: "Pengembangan Usaha BUMDes Melalui Pemasaran Produk UMKM Lokal",
    summary:
      "Badan Usaha Milik Desa meresmikan pusat kurasi dan promosi produk pangan olahan unggulan hasil karya ibu-ibu PKK ke jaringan supermarket regional.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4V2uWC11W9-wJ-6SytuG9wmtRDofArviSmvjw_Hsu_jVNYENN7ylAX2hcSkEgYaOJSgZqyCSdrXKJxTZLwKi7Uh3u6rLkFd87KROm52K_rboOhC53Jx_8a96pyvSbA9nVugICVn2_SStNhYZZxUOgE5LR3Vg-0TDX5TEGXGDeldT9Ih7dl6r9GmnYP-jFP_tkxoIy5DLOS9zeIb59P87P9gjqTfgVod9rgmLi-1MSrH1FV4gMfoY",
    alt: "Village enterprise BUMDes modern storefront displaying local Indonesian artisanal foods, packaged coffee, banana chips, and handicrafts with young village entrepreneurs smiling proudly behind checkout counter.",
    badgeClass: "bg-primary-fixed text-primary",
  },
];

const gallery = [
  {
    title: "Gedung Balai Desa & Pusat Pelayanan Terpadu",
    category: "Pemerintahan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD8O2cwndykcxfZLvdO2_q9Dcfq2RUyPni6Al4LfDJqQKVUcTKncLOUn6GQiLJjf50cZaVSChIPbqzNuB11-lwP_kcnOAejGB-3D0GZHRv-mmBBikX8Mcv0_s7s_0yXtL7Q5DXbo2GdfkAFXKwyjXuqK6vbv78-HTiK4s8YU8e9YBwZjwJ-h38xm6Km63jJzAld8RDZCZDR-qmRogUjB2WAQsVCYuHHFP2yeopBsgi7jZV2LUSpFL8",
    alt: "Wide scenic view of the grand traditional contemporary Balai Desa village hall of an Indonesian village with a manicured front lawn and Indonesian flag fluttering under clear blue skies, crisp architectural photography.",
    size: "sm:col-span-2 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
  {
    title: "Pentas Seni & Festival Adat Bersih Desa",
    category: "Budaya",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBTPTvJDhIOEVVrTwm_7hYZV-Ao5mjn7opj_fqaOHrJYp2Kz9twsaD4ZyOBEW4k6P05s4oik3hSenOPxn6bVZtpoxSb9mGhzJg9oJYbciMBJ5cr-rnT9XGmEmHxHEnz8m19La1Pn7CVfcPaSqsPeaDmuOeCNRXkEooGQ50OwvgZvj3-SBepyuZpmSK1SmR9DfM31O9Ia3zgiU1TD0mCbI3Nnyl0IFLmMwzL4Mwi4oiGgg9WvA_IhSk",
    alt: "Vertical portrait shot of traditional Indonesian village cultural festival with youth dressed in ornate colorful Javanese batik traditional garments performing traditional gamelan music in festive village courtyard.",
    size: "sm:col-span-1 row-span-2",
    tagClass: "bg-tertiary text-on-tertiary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
  {
    title: "Semarak Panen Raya Sawah Krajan",
    category: "Alam",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCI4sS_Q7X8Z8f7gxhnr49JogxoI6MLr3tXajefcIBp8p28CKIApvnZb-qpXjkkbXsXTFY2MJDYtOUG2dnwxAkpUr707TbNjQhleEvmkCNRD8L61j3csFq3yC13oz7H55B_1HK801-Q0tOb5PlEt79EYifWF4OK2EMHZ_xCVMhf9ycEwYJ_er6HOLn-pqcMCoVxGevpYYrjqs29eF3khooTkfgQr4Luy2qxt9VICEbXH3nFd_Misgs",
    alt: "Golden hour shot of rural Indonesian farmers with conical bamboo hats rejoicing during a bountiful golden rice harvest panen raya in vast countryside terraces.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-secondary text-on-secondary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    title: "Aksi Gotong Royong Jembatan Dusun",
    category: "Kegiatan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-p3lZe-k_PqJgb4YRVon2IGLqn4uwBvqSlGp5Y5xrRyxxVSgE0Pp7m13aeokl1s0GU2DjrghA1xD5kJLE-X3ez0Vv75CGuWPEwhPlqDM-BDXqljrp5CI6R7ggMQkJLk2c2vHZ6LZTVYG_OCkIu_CpQosbQCM0sQvNwLm0NjzTAuyfohh1mNs5C7WXt_FB51rZLdsuHaqP3r9zNVZyCPaZaVQ8W4V0ENyo0nC7TcijW4gCLIw1KmA",
    alt: "Group of spirited Indonesian villagers collaborating to repair wooden community footbridge over clear mountain stream during sunny gotong royong morning.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    title: "Musyawarah Kerukunan Warga RT",
    category: "Kegiatan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBr2VsL0NucROBe0ExeNVpYOa_JbnF96Tip7xhm0_LR1rN1IQPyjxFRSjPpiLmR0u05P7fXXpP5uSGCgPGO1ZcUusL6tI7mJXsF7kXdaW3uuakU9WsjRUOR338aaPgbY72aSXHoLYbwSQU9h3p5UicZuTcKu8h90W7EZVpGDiSUR6qLw-cTs2nBmf9326vJtOeo3upf8nfOOcTMp2doZkIygGxFvXbHzt_s5ek5Ivv5DbArengd0Ik",
    alt: "Warm indoor setting of Indonesian village elders and neighborhood leaders engaged in peaceful consensus deliberation musyawarah warga in the balai pertemuan.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    title: "Pelayanan Posyandu Balita & Lansia",
    category: "Kegiatan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3t8oBqGCZST4a5Fj9Lvuwue-xyc3vlSYmuOsF1IFJgEe2vfYkIofcQySN667FkFOke_iDhH4V6l7JkDiwpPi294TlXbXK2CTfWaC9OBuy-u0CZaSShgve9iHj0putZmiptj5YZwvfbw6KUN4URdq-JDIs_DrjJ_hZlXOMpvPLleipvxMOkKP2djmRMUmwfHs5GjySfDDl7T-1BWkrKuiDhTiJuBZ3LdVPbHOmXMntPNctTKNa7as",
    alt: "Dedicated Posyandu health cadres weighing an infant baby and counseling a smiling young mother in village community center, bright clean sanitary environment.",
    size: "sm:col-span-1 row-span-1",
    tagClass: "bg-secondary text-on-secondary",
    titleClass: "font-label-lg text-label-lg",
    padding: "p-4",
  },
  {
    title: "Keindahan Alam Lembah & Persawahan Sukamaju",
    category: "Alam",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClSyUtAd0TfVya-tS4mBk15XUiMtEbLRk73yTjWM_5AFOb_HMSxjveICrqy_bLq972vUu3VLKUBf6tYuvAQ7BiH3iM1jPskwINc1OCXByL1EEVOUDREHiIpf6xVzaERZN5q5JC0T0WcXUseSFhIH4Hoq01ytXeOlqMLBsPS3Z3ObQN0Ba5PGCyI4K3oNo78BqH1QBIM1RYLTErBQKuIv-MUix1ZIZQiCaLcdDtJTvcXADuenTT-xs",
    alt: "Panoramic breathtaking morning landscape photograph of sunrise mist settling over cascading green rice terraces and river valley in Java, Indonesia.",
    size: "sm:col-span-2 row-span-1",
    tagClass: "bg-secondary text-on-secondary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
  {
    title: "Peresmian Fasilitas Air Bersih & Lampu Tenaga Surya",
    category: "Pembangunan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYDh4gtTFq7ibXo9Db4GbimAL6CWwa1zUNUTbK7kqb-M14NhumCCbqc6k8rqhJUpZZdcfTC3e3NbHp5-y9ocJPYO43rJ2To2nNhZ5Zn8ixICtXve2JNPBSIc4e3rrU4BQFlaSk3RkD_dfoan9Q2xIZrSZdWIGFCb2yPLm6UR67AU6e8lApSviZI7OnePiGnGdWcNWH3hdq33cfQHCZIbGuHvJzSClK_cBq7m0CzitIWFD4DHtB0ag",
    alt: "Village paving and clean water facility infrastructure newly completed by local village committee with neat concrete gutters and solar street lighting in rural neighborhood.",
    size: "sm:col-span-2 row-span-1",
    tagClass: "bg-primary-container text-on-primary",
    titleClass: "font-headline-sm text-headline-sm",
    padding: "p-5",
  },
];

const materialIconClass = "material-symbols-outlined";

function RemoteImage({
  src,
  alt,
  sizes = "(max-width: 768px) 100vw, 50vw",
  className = "",
}: {
  src: string;
  alt: string;
  sizes?: string;
  className?: string;
}) {
  return (
    <Image
      alt={alt}
      className={className}
      fill
      sizes={sizes}
      src={src}
      unoptimized
    />
  );
}

export default function HomepageContent({
  fontClassName,
}: {
  fontClassName: string;
}) {
  const sotkTrack = useRef<HTMLDivElement>(null);

  const scrollTrack = (left: number, by = false) => {
    const track = sotkTrack.current;
    if (!track) return;
    if (by) track.scrollBy({ left, behavior: "smooth" });
    else track.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <div
      className={`${fontClassName} simple-beranda bg-surface font-body-md text-on-surface antialiased`}
    >
      <header className="fixed left-0 top-0 z-50 w-full bg-surface/90 shadow-[0_1px_8px_rgba(0,0,0,0.04)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-space-md px-gutter">
          <div className="flex shrink-0 items-center gap-3">
            <img
              alt="Logo Pemerintah Desa"
              className="h-12 w-auto max-w-16 object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UK2JG7Zb9JjcjhZr1NqzKtur9_E3PzIr5rdRaLiwW-O3V-fsEbbBmSywnjjFVHFR0RTDZgWW7eD9-KyHBTtytXcUX0IlZl8yEKd4iZRJBhKcEva362DN3JOdWRg8TSmEcyA6Qq5tLGTsmTfdBQpNXvupqJj6dG-6PzmS1ntixdHGYowuWB3T34I3b75aphexMgcCdkX0tpC99MIUhqTkOMdtK9_GK9tQMe6ND0Dw3EmzctQbejaOrRsw"
            />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg leading-tight tracking-tight text-on-surface">
                Pemerintah Desa
              </span>
              <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                Sistem Informasi Pelayanan
              </span>
            </div>
          </div>
          <nav
            aria-label="Navigasi utama"
            className="hidden flex-1 items-center justify-end gap-6 xl:flex"
            data-active-classes="text-primary font-bold"
          >
            <a
              aria-current="page"
              className="font-bold text-primary transition-colors"
              data-path="beranda"
              href="#"
            >
              Beranda
            </a>
            <a
              className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
              data-path="profil-desa"
              href="#sotk"
            >
              Profil Desa
            </a>
            <div className="group relative inline-block">
              <button
                aria-expanded="false"
                aria-haspopup="true"
                className="font-label-md text-label-md flex items-center gap-1 py-2 text-on-surface-variant transition-colors hover:text-on-surface focus:outline-none"
                id="infografis-menu-button"
                type="button"
              >
                <span>Infografis</span>
                <span className={`${materialIconClass} text-[16px] text-on-surface-variant transition-transform duration-200 group-hover:rotate-180`}>
                  keyboard_arrow_down
                </span>
              </button>
              <div className="absolute left-0 top-full z-50 hidden min-w-[210px] pt-1.5 group-hover:block group-focus-within:block">
                <div className="flex flex-col gap-0.5 rounded-xl border border-surface-variant/50 bg-surface-container-lowest p-1.5 shadow-lg">
                  <a
                    className="font-body-sm flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-on-surface transition-colors hover:bg-surface-container-low hover:text-primary-container"
                    href="#layanan"
                  >
                    <span className={`${materialIconClass} text-[18px] text-primary`}>
                      groups
                    </span>
                    <span>Kependudukan</span>
                  </a>
                  <a
                    className="font-body-sm flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-on-surface transition-colors hover:bg-surface-container-low hover:text-primary-container"
                    href="#"
                  >
                    <span className={`${materialIconClass} text-[18px] text-primary`}>
                      account_balance_wallet
                    </span>
                    <span>Transparansi APBDes</span>
                  </a>
                </div>
              </div>
            </div>
            <a
              className="font-label-md text-label-md text-on-surface-variant transition-colors hover:text-on-surface"
              data-path="berita"
              href="#"
            >
              Berita
            </a>
          </nav>
          <div className="flex items-center gap-space-sm">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary shadow-sm">
              <span className={`${materialIconClass} text-[18px] text-on-primary`}>
                person
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="min-h-[calc(100vh-80px)] w-full bg-surface pt-20">
        <div className="flex w-full flex-col">
          <section className="relative flex min-h-[580px] w-full flex-col justify-center overflow-hidden py-16 md:py-24">
            <div className="absolute inset-0 z-0">
              <RemoteImage
                alt="Pemandangan Alam Desa Sukamaju"
                className="object-cover"
                sizes="100vw"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCztjVmdRTGFO0Ar9XpHJzN2Fc7JApSHymHFYrxJ9XMdmA7rMHM7m7-amiehJuwl52zmxQv7DakF8ReJekSgUtc7jFnHZd3aHl2dIiryfFs17WZvrRuFyIeVASWnWzgM3tEpj40OVM9asRaoz8RnzZ_jM5Kov41JovAQPH3g7q6vYAOG1Uhsp44x1v8-J0GzU-hIe85FtDHYs_OmFbKWdMP_ggmI3GZOrXDiAM_VXMdmzRxGWqqltY"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-on-surface/90 via-on-surface/60 to-on-surface/50" />
              <div className="absolute inset-0 backdrop-blur-[2px]" />
            </div>
            <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-gutter text-center">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full border border-secondary-fixed/30 bg-surface-container-lowest/20 px-4 py-1.5 text-secondary-fixed backdrop-blur-md">
                  <span className={`${materialIconClass} text-[18px]`}>verified</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-primary">
                    Portal Informasi Resmi Terpadu
                  </span>
                </div>
                <h1 className="font-display text-display leading-tight tracking-tight text-on-primary">
                  Selamat Datang di Portal Resmi{" "}
                  <span className="text-secondary-fixed">Desa Sukamaju</span>
                </h1>
                <p className="font-body-lg text-body-lg max-w-2xl leading-relaxed text-inverse-on-surface">
                  Mewujudkan tata kelola pemerintahan desa yang transparan,
                  akuntabel, dan pelayanan publik prima berbasis digital untuk
                  kemakmuran warga Kecamatan Nusantara, Kabupaten Indonesia.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                  <a
                    className="font-label-lg text-label-lg inline-flex items-center justify-center rounded-full bg-surface-container-lowest/90 px-7 py-3.5 text-primary-container shadow-sm backdrop-blur-md transition-all hover:bg-surface-container-lowest"
                    href="#galeri"
                  >
                    <span className={`${materialIconClass} mr-2 text-[20px]`}>
                      explore
                    </span>
                    Jelajahi Desa
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-low py-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-gutter">
              <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-2">
                <div>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                    Amanat Kepemimpinan
                  </span>
                  <h2 className="font-headline-lg text-headline-lg mt-2 text-on-surface">
                    Sambutan Hangat{" "}
                    <span className="text-primary-container">Kepala Desa</span>{" "}
                    Sukamaju
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Komitmen penuh aparatur pemerintah desa dalam menghadirkan
                  keadilan sosial, transparansi anggaran, kemudahan akses
                  kependudukan, dan pembangunan partisipatif yang merata.
                </p>
              </div>
              <div className="rounded-[24px] bg-surface-container-lowest p-8 shadow-md lg:p-12">
                <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12">
                  <div className="flex flex-col gap-6 lg:col-span-7">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full bg-secondary-fixed/30 px-3 py-1 text-secondary">
                      <span className={`${materialIconClass} text-[16px]`}>
                        campaign
                      </span>
                      <span className="font-label-sm text-label-sm font-semibold">
                        Prakata Pemimpin
                      </span>
                    </div>
                    <h3 className="font-headline-md text-headline-md leading-snug text-on-surface">
                      Membangun Desa Bersama Warga Menuju Kemandirian yang
                      Bermartabat
                    </h3>
                    <div className="font-body-md text-body-md space-y-4 leading-relaxed text-on-surface-variant">
                      <p>
                        Assalamu&apos;alaikum Warahmatullahi Wabarakatuh, salam
                        sejahtera untuk segenap warga Desa Sukamaju yang kami
                        muliakan.
                      </p>
                      <p>
                        Transformasi digital pelayanan publik ini hadir sebagai
                        jembatan silaturahmi sekaligus instrumen keterbukaan tata
                        kelola desa. Kami percaya, kemajuan hakiki bermula dari
                        sinergi guyub antara rukun tetangga, para tokoh adat,
                        petani, pemuda, dan jajaran pamong desa.
                      </p>
                      <p>
                        Dengan semangat gotong royong, mari kita wujudkan Desa
                        Sukamaju yang agamis, makmur ekonominya, luhur
                        kebudayaannya, dan siap bersaing di era modern tanpa
                        menanggalkan kearifan lokal Nusantara.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center lg:col-span-5">
                    <div className="relative h-96 w-full max-w-sm overflow-hidden rounded-2xl bg-surface-container shadow-md lg:h-[420px]">
                      <RemoteImage
                        alt="Foto Resmi Kepala Desa Sukamaju H. Suryadi, S.Sos."
                        sizes="(max-width: 1024px) 100vw, 384px"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6FBMx_doAn4w741Kum-7fyvKswRkIYiB04qwTAJnkXt5tClyI2ljmaqHk9uKkPg5eyjElzBdLi1LieeBPhlZ0oWOTqI7WN-EozYMFDEUDjtQ0liJiGsL7h91LgoZJiYnCx9ET38lo46Si2WrpkLNlcgqj8zhqLF5gsBl4E8JLr7bsY3MwCRVa9oaOF9cN3L_SS_F0xEUU1vMbhMQNZPzY06j21ebmFPFsgFGWe1Q_-nBkDwoMMJY"
                      />
                    </div>
                    <div className="mt-4 flex flex-col items-center text-center">
                      <h4 className="font-headline-sm text-headline-sm font-bold text-on-surface">
                        H. Suryadi, S.Sos.
                      </h4>
                      <span className="font-label-md text-label-md mt-1 font-semibold text-primary">
                        Kepala Desa Sukamaju
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Periode 2021 – 2027
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-16" id="sotk">
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-gutter">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                    Pemerintahan Desa
                  </span>
                  <h2 className="font-headline-lg text-headline-lg mt-2 text-on-surface">
                    Struktur Organisasi &amp;{" "}
                    <span className="text-primary-container">
                      Tata Kerja (SOTK)
                    </span>
                  </h2>
                  <p className="font-body-md text-body-md mt-2 max-w-2xl text-on-surface-variant">
                    Aparatur Pemerintah Desa Sukamaju yang berdedikasi melayani
                    segenap kebutuhan masyarakat secara profesional, transparan,
                    dan berintegritas.
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <button
                    aria-label="Geser ke Kiri"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-surface-variant/50 bg-surface-container-lowest text-on-surface shadow-sm transition-all hover:bg-surface-container active:scale-95"
                    onClick={() => scrollTrack(-320, true)}
                    type="button"
                  >
                    <span className={`${materialIconClass} text-[20px]`}>
                      arrow_back
                    </span>
                  </button>
                  <button
                    aria-label="Geser ke Kanan"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-container text-on-primary shadow-[0_4px_14px_rgba(0,119,182,0.35)] transition-all hover:bg-primary active:scale-95"
                    onClick={() => scrollTrack(320, true)}
                    type="button"
                  >
                    <span className={`${materialIconClass} text-[20px]`}>
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>

              <div className="group relative w-full">
                <div
                  className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 py-4 pb-6 scroll-smooth"
                  id="sotk-track"
                  ref={sotkTrack}
                >
                  {officers.map((officer, index) => (
                    <div
                      className={`group/card flex w-[290px] shrink-0 snap-start flex-col gap-4 rounded-[24px] border border-transparent bg-surface-container-lowest p-5 ${index === 0 ? "shadow-md" : "shadow-sm"} transition-all hover:-translate-y-1 hover:border-primary-container/30 hover:shadow-xl sm:w-[310px]`}
                      key={officer.name}
                    >
                      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-surface-container">
                        <RemoteImage
                          alt={officer.alt}
                          className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                          sizes="310px"
                          src={officer.image}
                        />
                        <span
                          className={`font-label-sm text-label-sm absolute left-3 top-3 rounded-full px-3 py-1 font-semibold shadow-sm ${officer.badgeClass}`}
                        >
                          {officer.badge}
                        </span>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <h4 className="font-headline-sm text-headline-sm leading-snug font-bold text-on-surface">
                          {officer.name}
                        </h4>
                        <span className="font-label-sm text-label-sm w-fit rounded-full bg-secondary-fixed/40 px-3 py-1 font-semibold text-secondary">
                          {officer.role}
                        </span>
                      </div>
                      <div className="font-body-sm text-body-sm flex flex-col gap-1 rounded-xl bg-surface-container-low/60 p-3 pt-3 text-on-surface-variant">
                        <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                          {officer.id}
                        </span>
                        <span>{officer.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface-container-low p-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-label-sm text-label-sm font-medium text-on-surface-variant">
                    Struktur &amp; Jabatan:
                  </span>
                  {[
                    ["Kepala Desa", 0],
                    ["Sekretaris Desa", 334],
                    ["Kaur Keuangan", 668],
                    ["Kaur Perencanaan", 1002],
                    ["Kasi & Kadus", 1336],
                  ].map(([label, left]) => (
                    <button
                      className="font-label-sm text-label-sm rounded-full bg-surface-container-lowest px-3 py-1 text-on-surface shadow-sm transition-all hover:bg-primary-container hover:text-on-primary"
                      key={label}
                      onClick={() => scrollTrack(Number(left))}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2" id="sotk-dots">
                  {[0, 640, 1280, 1920].map((left, index) => (
                    <button
                      aria-label={`Slide ${index + 1}`}
                      className={`h-2.5 rounded-full transition-all ${index === 0 ? "w-7 bg-primary-container" : "w-2.5 bg-surface-variant hover:bg-secondary-fixed"}`}
                      key={left}
                      onClick={() => scrollTrack(left)}
                      type="button"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-low py-16" id="layanan">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-gutter">
              <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 text-center">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                  Statistik &amp; Demografi Wilayah
                </span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Data Kependudukan &amp;{" "}
                  <span className="text-primary-container">Profil Wilayah</span>
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Ringkasan data demografi, kependudukan, pembagian wilayah
                  teritorial, dan jam pelayanan resmi Pemerintah Desa Sukamaju
                  terkini.
                </p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="flex flex-col gap-4 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed text-primary">
                    <span className={`${materialIconClass} text-[30px]`}>groups</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">
                      Jumlah Penduduk
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      4.825{" "}
                      <span className="font-body-md text-body-md font-medium text-on-surface-variant">
                        Jiwa
                      </span>
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm border-t-0 pt-2 text-on-surface-variant">
                    Terdaftar resmi dalam basis data kependudukan desa.
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary-fixed text-secondary">
                    <span className={`${materialIconClass} text-[30px]`}>
                      family_restroom
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">
                      Kepala Keluarga
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      1.412{" "}
                      <span className="font-body-md text-body-md font-medium text-on-surface-variant">
                        KK
                      </span>
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm border-t-0 pt-2 text-on-surface-variant">
                    Tersebar di seluruh rukun warga dan dusun binaan.
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-tertiary-fixed text-tertiary">
                    <span className={`${materialIconClass} text-[30px]`}>
                      location_on
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">
                      Wilayah Dusun / RT
                    </span>
                    <span className="font-headline-lg text-headline-lg font-bold text-on-surface">
                      4 <span className="font-body-md text-body-md font-medium text-on-surface-variant">Dusun /</span>{" "}
                      18 <span className="font-body-md text-body-md font-medium text-on-surface-variant">RT</span>
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm border-t-0 pt-2 text-on-surface-variant">
                    Cakupan pembagian teritorial administrasi desa.
                  </p>
                </div>
                <div className="flex flex-col gap-4 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm transition-all hover:shadow-md">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-fixed-dim/40 text-primary">
                    <span className={`${materialIconClass} text-[30px]`}>schedule</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-label-md text-label-md font-medium text-on-surface-variant">
                      Jam Layanan Kantor
                    </span>
                    <span className="font-headline-sm text-headline-sm font-bold text-on-surface">
                      Senin - Jumat
                    </span>
                    <span className="font-label-lg text-label-lg font-semibold text-primary">
                      08:00 - 15:30 WIB
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm border-t-0 pt-2 text-on-surface-variant">
                    Pelayanan tatap muka di Balai Desa Sukamaju.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center justify-between gap-6 rounded-[20px] border border-secondary-fixed/30 bg-surface-container-lowest p-6 text-center shadow-sm lg:flex-row lg:text-left">
                <div className="flex flex-col items-center gap-4 sm:flex-row">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-secondary-fixed/40 text-secondary">
                    <span className={`${materialIconClass} text-[30px]`}>
                      support_agent
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                      <span className="font-label-lg text-label-lg font-bold text-on-surface">
                        Butuh Bantuan Administrasi Cepat?
                      </span>
                      <span className="font-label-sm text-label-sm rounded-full bg-secondary-container px-2.5 py-0.5 font-semibold text-on-secondary-container">
                        Siaga 08.00 - 15.30 WIB
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm mt-1 text-on-surface-variant">
                      Hubungi Petugas Pelayanan Desa (Kasi Pelayanan &amp;
                      Operator Layanan Terpadu) untuk konsultasi berkas &amp;
                      persuratan.
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-wrap items-center justify-center gap-3">
                  <a
                    className="group inline-flex items-center gap-2 rounded-full bg-primary-container px-6 py-3 font-label-md text-label-md text-on-primary shadow-md transition-all hover:bg-primary active:scale-95"
                    href="https://wa.me/6281234567890?text=Halo%20Admin%20Desa%20Sukamaju,%20saya%20ingin%20konsultasi%20layanan%20administrasi"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5 fill-current text-on-primary transition-transform group-hover:scale-105"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2M12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.81 13.47 3.81 11.91C3.81 7.37 7.5 3.67 12.05 3.67M9.53 7.34C9.36 7.34 9.09 7.4 8.87 7.65C8.65 7.89 8.02 8.48 8.02 9.71C8.02 10.93 8.91 12.11 9.03 12.28C9.16 12.44 10.74 14.96 13.22 15.96C15.28 16.79 15.7 16.63 16.14 16.59C16.59 16.54 17.57 16 17.77 15.42C17.97 14.85 17.97 14.36 17.91 14.25C17.85 14.15 17.7 14.09 17.47 13.98C17.25 13.86 16.16 13.33 15.96 13.25C15.76 13.17 15.61 13.14 15.46 13.36C15.31 13.58 14.88 14.09 14.75 14.25C14.62 14.4 14.49 14.42 14.26 14.31C14.04 14.2 13.1 13.89 11.98 12.9C11.11 12.12 10.52 11.16 10.4 10.94C10.27 10.72 10.38 10.6 10.5 10.49C10.6 10.38 10.74 10.2 10.85 10.07C10.96 9.94 11 9.85 11.08 9.69C11.16 9.52 11.11 9.38 11.06 9.27C11 9.16 10.55 8.06 10.36 7.62C10.18 7.18 10 7.24 9.85 7.24C9.72 7.24 9.56 7.24 9.53 7.34Z" />
                    </svg>
                    <span>Chat WhatsApp Sekarang</span>
                  </a>
                  <div className="font-label-md text-label-md flex items-center gap-2 rounded-full bg-surface-container-low px-4 py-3 text-on-surface">
                    <span className={`${materialIconClass} text-[18px] text-secondary`}>
                      call
                    </span>
                    <span className="text-on-surface-variant">
                      +62 812-3456-7890
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative w-full overflow-hidden bg-secondary-fixed/20 py-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-gutter">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                    Keterbukaan Informasi Publik
                  </span>
                  <h2 className="font-headline-lg text-headline-lg mt-2 text-on-surface">
                    Transparansi Anggaran{" "}
                    <span className="text-primary-container">APB Desa</span> 2025
                  </h2>
                  <p className="font-body-md text-body-md mt-2 max-w-2xl text-on-surface-variant">
                    Perwujudan keterbukaan informasi publik dan akuntabilitas
                    pengelolaan keuangan desa tahun anggaran 2025 demi kemakmuran
                    seluruh masyarakat.
                  </p>
                </div>
                <div className="flex items-center gap-3" />
              </div>
              <div className="flex flex-col justify-between gap-6 rounded-[24px] bg-surface-container-lowest p-8 shadow-md md:flex-row md:items-center lg:p-10">
                <div className="flex flex-col gap-2">
                  <span className="font-label-md text-label-md text-on-surface-variant">
                    Total Anggaran Pendapatan &amp; Belanja Desa 2025
                  </span>
                  <div className="font-display text-display font-bold tracking-tight text-on-secondary-fixed">
                    Rp 2.148.650.000
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Sumber Dana: Dana Desa (DD), Alokasi Dana Desa (ADD),
                    Pendapatan Asli Desa (PADes), &amp; Bagi Hasil Pajak
                  </span>
                </div>
                <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
                  <span className="font-headline-sm text-headline-sm rounded-full bg-secondary-container px-5 py-2 font-bold text-on-secondary-container shadow-sm">
                    Terealisasi 84,6%
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Update Data: Semester II Tahun 2025
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-4 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-semibold text-on-surface-variant">
                      Pendapatan Desa
                    </span>
                    <span className={`${materialIconClass} text-secondary`}>
                      trending_up
                    </span>
                  </div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface">
                    Rp 2.158.400.000
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                    <div className="h-2.5 rounded-full bg-primary-container" style={{ width: "92%" }} />
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    PADes, Dana Desa, Bagi Hasil Pajak &amp; Retribusi
                  </span>
                </div>
                <div className="flex flex-col gap-4 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-semibold text-on-surface-variant">
                      Belanja Desa
                    </span>
                    <span className={`${materialIconClass} text-primary`}>
                      payments
                    </span>
                  </div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface">
                    Rp 2.124.850.000
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                    <div className="h-2.5 rounded-full bg-secondary-fixed-dim" style={{ width: "86%" }} />
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Operasional pamong, program fisik, pemberdayaan
                  </span>
                </div>
                <div className="flex flex-col gap-4 rounded-[20px] bg-surface-container-lowest p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-label-md text-label-md font-semibold text-on-surface-variant">
                      Pembiayaan Netto
                    </span>
                    <span className={`${materialIconClass} text-tertiary`}>
                      account_balance_wallet
                    </span>
                  </div>
                  <div className="font-headline-md text-headline-md font-bold text-on-surface">
                    Rp 33.550.000
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container">
                    <div className="h-2.5 rounded-full bg-tertiary" style={{ width: "100%" }} />
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Sisa Lebih Perhitungan Anggaran (SiLPA) tahun lalu
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="w-full py-16">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-gutter">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                    Informasi &amp; Warta Terkini
                  </span>
                  <h2 className="font-headline-lg text-headline-lg mt-2 text-on-surface">
                    Kabar &amp; <span className="text-primary-container">Warta Desa</span>
                  </h2>
                  <p className="font-body-md text-body-md mt-2 max-w-xl text-on-surface-variant">
                    Informasi terkini kegiatan pemerintahan, kemasyarakatan,
                    agenda pembangunan, dan pengumuman penting bagi seluruh warga.
                  </p>
                </div>
                <a className="font-label-md text-label-md inline-flex w-fit items-center gap-2 rounded-full bg-surface-container-lowest px-6 py-3 text-primary-container shadow-sm transition-all hover:bg-surface-container" href="#">
                  Lihat Semua Berita
                  <span className={`${materialIconClass} text-[18px]`}>
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {news.map((item) => (
                  <div
                    className="group flex flex-col overflow-hidden rounded-[20px] bg-surface-container-lowest shadow-sm transition-all hover:shadow-lg"
                    key={item.title}
                  >
                    <div className="relative h-52 w-full overflow-hidden bg-surface-container">
                      <RemoteImage
                        alt={item.alt}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        src={item.image}
                      />
                      <span className={`font-label-sm text-label-sm absolute left-4 top-4 rounded-full px-3 py-1 shadow-sm ${item.badgeClass}`}>
                        {item.category}
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col justify-between gap-4 p-6">
                      <div className="flex flex-col gap-2">
                        <div className="font-body-sm text-body-sm flex items-center gap-2 text-on-surface-variant">
                          <span className={`${materialIconClass} text-[16px] text-primary`}>
                            calendar_today
                          </span>
                          <span>{item.date}</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm line-clamp-2 font-bold text-on-surface transition-colors group-hover:text-primary-container">
                          {item.title}
                        </h3>
                        <p className="font-body-sm text-body-sm line-clamp-2 text-on-surface-variant">
                          {item.summary}
                        </p>
                      </div>
                      <a className="font-label-md text-label-md group inline-flex items-center gap-2 font-semibold text-primary-container transition-all group-hover:translate-x-1" href="#">
                        Baca Selengkapnya
                        <span className={`${materialIconClass} text-[16px]`}>
                          arrow_forward
                        </span>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="w-full bg-surface-container-low py-16" id="galeri">
            <div className="mx-auto flex max-w-7xl flex-col gap-10 px-gutter">
              <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <span className="font-label-sm text-label-sm font-bold uppercase tracking-widest text-primary">
                    Potret Kehidupan Warga
                  </span>
                  <h2 className="font-headline-lg text-headline-lg mt-2 text-on-surface">
                    Dokumentasi &amp; <span className="text-primary-container">Galeri Desa</span>
                  </h2>
                  <p className="font-body-md text-body-md mt-2 max-w-xl text-on-surface-variant">
                    Rekam jejak kebersamaan, keagungan adat budaya, keelokan
                    bentang alam, dan dinamika gerak pembangunan desa.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button className="font-label-sm text-label-sm rounded-full bg-primary-container px-5 py-2 text-on-primary shadow-sm" type="button">
                    Semua
                  </button>
                  <button className="font-label-sm text-label-sm rounded-full bg-surface-container-lowest px-5 py-2 text-on-surface transition-all hover:bg-surface-container" type="button">
                    Kegiatan
                  </button>
                  <button className="font-label-sm text-label-sm rounded-full bg-surface-container-lowest px-5 py-2 text-on-surface transition-all hover:bg-surface-container" type="button">
                    Pembangunan
                  </button>
                  <button className="font-label-sm text-label-sm rounded-full bg-surface-container-lowest px-5 py-2 text-on-surface transition-all hover:bg-surface-container" type="button">
                    Alam
                  </button>
                </div>
              </div>
              <div className="auto-rows-[220px] grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                {gallery.map((item) => (
                  <div
                    className={`${item.size} group relative row-span-1 overflow-hidden rounded-2xl bg-surface-container shadow-sm`}
                    key={item.title}
                  >
                    <RemoteImage
                      alt={item.alt}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
                      src={item.image}
                    />
                    <div className={`absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-on-surface/80 via-on-surface/20 to-transparent p-5 opacity-90 transition-opacity ${item.padding}`}>
                      <span className={`font-label-sm text-label-sm mb-1 w-fit rounded-full px-3 py-1 ${item.tagClass}`}>
                        {item.category}
                      </span>
                      <h4 className={`${item.titleClass} font-bold text-on-primary`}>
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="w-full bg-inverse-surface pb-12 pt-16 text-inverse-on-surface">
        <div className="mx-auto max-w-7xl px-gutter">
          <div className="grid grid-cols-1 gap-space-xl pb-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  alt="Logo Pemerintah Desa"
                  className="h-10 w-auto max-w-20 object-contain brightness-0 invert"
                  src="https://lh3.googleusercontent.com/aida/AEtjO1UK2JG7Zb9JjcjhZr1NqzKtur9_E3PzIr5rdRaLiwW-O3V-fsEbbBmSywnjjFVHFR0RTDZgWW7eD9-KyHBTtytXcUX0IlZl8yEKd4iZRJBhKcEva362DN3JOdWRg8TSmEcyA6Qq5tLGTsmTfdBQpNXvupqJj6dG-6PzmS1ntixdHGYowuWB3T34I3b75aphexMgcCdkX0tpC99MIUhqTkOMdtK9_GK9tQMe6ND0Dw3EmzctQbejaOrRsw"
                />
                <span className="font-headline-sm text-headline-sm font-bold text-inverse-on-surface">
                  Pemerintah Desa
                </span>
              </div>
              <p className="font-body-sm text-body-sm leading-relaxed text-surface-dim">
                Mewujudkan tata kelola pemerintahan desa yang amanah, transparan,
                mandiri, dan berkeadaban dengan pelayanan publik terpadu ramah
                warga.
              </p>
              <div className="flex items-center gap-3 pt-2">
                {["mail", "call", "share"].map((icon) => (
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-variant/20 text-inverse-on-surface"
                    key={icon}
                  >
                    <span className={`${materialIconClass} text-[18px]`}>
                      {icon}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-sm text-headline-sm font-bold tracking-tight text-inverse-on-surface">
                Pemerintahan
              </h4>
              <ul className="font-body-sm text-body-sm flex flex-col gap-2.5 text-surface-dim">
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="sambutan" href="#">Sambutan Kepala Desa</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="sotk" href="#">Struktur Organisasi (SOTK)</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="apb-desa" href="#">Transparansi APB Desa</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="berita" href="#">Warta &amp; Pengumuman</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-sm text-headline-sm font-bold tracking-tight text-inverse-on-surface">
                Layanan Mandiri
              </h4>
              <ul className="font-body-sm text-body-sm flex flex-col gap-2.5 text-surface-dim">
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="administrasi" href="#">Surat Keterangan Usaha (SKU)</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="administrasi" href="#">Surat Pengantar Domisili</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="administrasi" href="#">Surat Keterangan Tidak Mampu</a></li>
                <li><a className="transition-colors hover:text-inverse-on-surface" data-path="galeri" href="#">Dokumentasi Kegiatan Desa</a></li>
              </ul>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="font-headline-sm text-headline-sm font-bold tracking-tight text-inverse-on-surface">
                Kantor Pelayanan
              </h4>
              <div className="font-body-sm text-body-sm flex flex-col gap-2 text-surface-dim">
                <p>Jl. Raya Utama Kantor Balai Desa No. 01</p>
                <p>Kecamatan Nusantara, Kode Pos 61253</p>
                <p className="font-label-sm text-label-sm pt-1 text-secondary-fixed-dim">
                  Senin – Jumat: 08.00 – 15.30 WIB
                </p>
              </div>
              <div className="pt-1">
                <a className="font-label-md text-label-md inline-flex items-center gap-2 text-secondary-fixed transition-colors hover:text-inverse-on-surface" data-path="kontak" href="#">
                  Hubungi Balai Desa
                  <span className={`${materialIconClass} text-[16px]`}>
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div className="font-body-sm text-body-sm flex flex-col items-center justify-between gap-4 pt-8 text-surface-dim md:flex-row">
            <p>© 2025 Pemerintah Desa. Seluruh hak cipta dilindungi undang-undang.</p>
            <div className="font-label-sm text-label-sm flex items-center gap-6">
              <a className="transition-colors hover:text-inverse-on-surface" href="#">Kebijakan Privasi</a>
              <a className="transition-colors hover:text-inverse-on-surface" href="#">Keterbukaan Informasi</a>
              <a className="transition-colors hover:text-inverse-on-surface" href="#">Peta Situs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
