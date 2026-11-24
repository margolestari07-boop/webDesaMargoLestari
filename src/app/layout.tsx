import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const editorial = Newsreader({
  variable: "--font-editorial",
  subsets: ["latin"],
});

const body = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Desa Margo Lestari",
    template: "%s | Desa Margo Lestari",
  },
  description:
    "Pusat informasi Desa Margo Lestari. Informasi yang belum diverifikasi pihak desa akan ditandai dengan jelas.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="id"
      className={`${editorial.variable} ${body.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Script anti-flash night mode: jalan sebelum paint dan sebelum
            hydration, memakai kunci localStorage yang sama dengan
            ThemeProvider admin ("theme-mode"/"theme").
            suppressHydrationWarning di <html> karena script ini boleh
            menambah class .dark sebelum React melakukan hydration.
            next/script beforeInteractive dipakai supaya React tidak
            mengeluh soal <script> di dalam komponen. */}
        <Script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem("theme-mode")||localStorage.getItem("theme")||"light";var d=m==="dark"||(m==="auto"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-color-scheme","dark");}}catch(e){}})();`,
          }}
          id="theme-init"
          strategy="beforeInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
