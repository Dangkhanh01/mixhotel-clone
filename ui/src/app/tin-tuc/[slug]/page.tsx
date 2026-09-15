import { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllArticleSlugs,
  getArticleBySlug,
  getRelatedArticles,
} from "@/data/articlesData";
import ArticleDetailClient from "@/components/article/ArticleDetailClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Không tìm thấy bài viết | Mix Boutique Hotel",
      description: "Bài viết không tồn tại hoặc đã được chuyển sang địa chỉ khác.",
    };
  }

  return {
    title: `${article.title} | Mix Boutique Hotel`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | Mix Boutique Hotel`,
      description: article.excerpt,
      images: [
        {
          url: article.thumbnail,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: [article.thumbnail],
    },
  };
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(slug, 3);

  return (
    <ArticleDetailClient
      article={article}
      relatedArticles={relatedArticles}
    />
  );
}
