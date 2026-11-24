import type { ReactNode } from "react";
import PageBreadcrumb from "@/components/tailadmin/common/page-breadcrumb";

/**
 * Kepala halaman admin dengan breadcrumb TailAdmin asli
 * (src/components/common/page-breadcrumb.tsx): crumb grup "Panel
 * pengelola" menaut ke /admin, judul halaman sebagai h2 dengan id untuk
 * aria-labelledby pada <section> halaman. `titleId` harus cocok dengan
 * aria-labelledby tersebut.
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
    <div>
      <PageBreadcrumb group={kicker} pageTitle={title} titleId={titleId} />
      {intro ? (
        <p className="text-sm text-gray-500">{intro}</p>
      ) : null}
      {actions ? <div className="mt-4 flex flex-wrap gap-2">{actions}</div> : null}
    </div>
  );
}
