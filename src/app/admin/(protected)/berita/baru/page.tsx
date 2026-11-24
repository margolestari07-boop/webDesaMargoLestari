import type { Metadata } from "next";
import { PageHeader } from "../../_components/page-header";
import { NewsForm } from "../news-form";

export const metadata: Metadata = {
  title: "Tambah Berita",
};

export default function NewNewsPage() {
  return (
    <section aria-labelledby="new-news-title" className="space-y-6">
      <PageHeader
        kicker="Berita"
        title="Tambah berita"
        titleId="new-news-title"
      />
      <NewsForm articleId={null} initialValues={{}} />
    </section>
  );
}
