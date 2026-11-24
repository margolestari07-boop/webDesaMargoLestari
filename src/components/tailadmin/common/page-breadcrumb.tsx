import Link from "next/link";

interface BreadcrumbProps {
  pageTitle: string;
  // Adaptasi dari template asli: template hanya menampilkan judul halaman
  // dengan crumb "Home" ke "/". Panel Desa menampilkan grup modul sebagai
  // crumb pertama yang menaut ke /admin.
  group?: string;
  // Id untuk aria-labelledby pada <section> halaman.
  titleId?: string;
}

const PageBreadcrumb: React.FC<BreadcrumbProps> = ({
  pageTitle,
  group = "Panel pengelola",
  titleId,
}) => {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <h2
        id={titleId}
        className="text-xl font-semibold text-gray-800"
      >
        {pageTitle}
      </h2>
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500"
              href="/admin"
            >
              {group}
              <svg
                className="stroke-current rtl:rotate-180"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li className="text-sm text-gray-800">
            {pageTitle}
          </li>
        </ol>
      </nav>
    </div>
  );
};

export default PageBreadcrumb;
