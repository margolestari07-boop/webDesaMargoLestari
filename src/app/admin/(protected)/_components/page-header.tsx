import type { ReactNode } from "react";

/**
 * Kepala halaman admin ala TailAdmin: kicker kecil, judul tegas,
 * dan pengantar singkat. Dipakai semua halaman modul supaya konsisten.
 * `titleId` harus cocok dengan aria-labelledby pada <section> halaman.
 */
export function PageHeader({
  kicker,
  title,
  titleId,
  intro,
  actions,
}: {
  kicker: string;
  title: string;
  titleId: string;
  intro?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <div className="admin-page-head">
      <p className="section-kicker">{kicker}</p>
      <h1 className="admin-dashboard-title" id={titleId}>
        {title}
      </h1>
      {intro ? <p className="admin-settings-intro">{intro}</p> : null}
      {actions}
    </div>
  );
}
