import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/supabase/authorization";
import { PageHeader } from "../../_components/page-header";
import { NewsForm } from "../news-form";

export const metadata: Metadata = {
  title: "Ubah Berita",
};

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { supabase } = await requireAdmin();
  const { data: article } = await supabase
    .from("news_articles")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!article) notFound();

  const initialValues: Record<string, string> = {
    title: article.title,
    slug: article.slug,
    category: article.category,
    excerpt: article.excerpt ?? "",
    content: article.content ?? "",
    author: article.author ?? "",
    image_url: article.image_url ?? "",
    image_alt: article.image_alt ?? "",
    status: article.status,
    published_at: article.published_at
      ? article.published_at.slice(0, 10)
      : "",
  };

  return (
    <section aria-labelledby="edit-news-title" className="space-y-6">
      <PageHeader
        kicker="Berita"
        title="Ubah berita"
        titleId="edit-news-title"
      />
      <NewsForm articleId={article.id} initialValues={initialValues} />
    </section>
  );
}
