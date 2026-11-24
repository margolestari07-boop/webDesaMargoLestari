import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";
import { getSupabaseEnvironment } from "@/lib/supabase/env";
import { NEWS_CATEGORIES } from "@/lib/validators/content";

export type NewsArticle = Database["public"]["Tables"]["news_articles"]["Row"];

// Kategori mengikuti CHECK di migration 20261124120000_news_articles.sql.
export { NEWS_CATEGORIES };

export const NEWS_PAGE_SIZE = 6;

function createPublicClient() {
  const { url, anonKey } = getSupabaseEnvironment();
  return createSupabaseClient<Database>(url, anonKey, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, next: { revalidate: 120 } }),
    },
  });
}

export type NewsSort = "newest" | "oldest" | "popular";

export type NewsQuery = {
  search?: string;
  category?: string;
  sort?: NewsSort;
  page?: number;
};

export async function listPublishedNews(query: NewsQuery): Promise<{
  articles: NewsArticle[];
  total: number;
  totalPages: number;
  page: number;
}> {
  const supabase = createPublicClient();
  const page = Math.max(1, query.page ?? 1);
  const from = (page - 1) * NEWS_PAGE_SIZE;
  const to = from + NEWS_PAGE_SIZE - 1;

  let builder = supabase
    .from("news_articles")
    .select("*", { count: "exact" })
    .eq("status", "published");

  if (query.category && NEWS_CATEGORIES.includes(query.category as never)) {
    builder = builder.eq("category", query.category);
  }
  if (query.search?.trim()) {
    const term = query.search.trim().replaceAll(/[%_,\\]/g, "");
    builder = builder.or(
      `title.ilike.%${term}%,excerpt.ilike.%${term}%,content.ilike.%${term}%`,
    );
  }

  switch (query.sort) {
    case "oldest":
      builder = builder.order("published_at", { ascending: true });
      break;
    case "popular":
      builder = builder.order("views", { ascending: false });
      break;
    default:
      builder = builder.order("published_at", { ascending: false });
  }

  const { data, count, error } = await builder.range(from, to);
  if (error) return { articles: [], total: 0, totalPages: 1, page: 1 };
  const total = count ?? 0;
  return {
    articles: data ?? [],
    total,
    totalPages: Math.max(1, Math.ceil(total / NEWS_PAGE_SIZE)),
    page,
  };
}

export async function getPublishedNewsBySlug(
  slug: string,
): Promise<NewsArticle | null> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  return error ? null : data;
}

export async function getNewsArchiveCounts(): Promise<
  { category: string; count: number }[]
> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("news_articles")
    .select("category")
    .eq("status", "published");
  if (error || !data) return [];
  const counts = new Map<string, number>();
  for (const row of data) {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export async function getPopularNews(limit = 4): Promise<NewsArticle[]> {
  const supabase = createPublicClient();
  const { data, error } = await supabase
    .from("news_articles")
    .select("*")
    .eq("status", "published")
    .order("views", { ascending: false })
    .limit(limit);
  return error ? [] : (data ?? []);
}
