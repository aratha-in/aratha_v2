import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, Download, UserRound } from "lucide-react";
import InsightsGrid from "@/components/InsightsGrid";
import { getInsightPosts, getInsightsCategories } from "@/lib/insights";
import type { BlogPost } from "@shared/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface ArticleHeading {
  id: string;
  title: string;
  level: number;
}

function categorySlug(category: string) {
  return category.toLowerCase().replace(/&/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function normalizeSlug(str: string) {
  return decodeURIComponent(str || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

function isImageUrl(image: string) {
  return image.startsWith("/") || image.startsWith("https://") || image.startsWith("http://");
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "and")
    .replace(/&[^;]+;/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function withHeadingIds(html: string) {
  const headings: ArticleHeading[] = [];
  const output = html.replace(/<h([23])\b[^>]*>([\s\S]*?)<\/h\1>/gi, (_match, level: string, inner: string) => {
    const title = inner.replace(/<[^>]*>/g, "").replace(/&amp;/g, "&").trim();
    const id = slugifyHeading(title);
    if (id) headings.push({ id, title, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  return { html: output, headings };
}

function markdownHeadings(markdown: string) {
  const headings: ArticleHeading[] = [];
  for (const line of markdown.split(/\r?\n/)) {
    const match = /^(##|###)\s+(.+)$/.exec(line.trim());
    if (!match) continue;
    const title = match[2].replace(/\*\*/g, "").trim();
    headings.push({ id: slugifyHeading(title), title, level: match[1].length });
  }
  return headings;
}

function renderInline(text: string): ReactNode[] {
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts: ReactNode[] = [];
  let lastIndex = 0;

  for (const match of text.matchAll(pattern)) {
    const value = match[0];
    const index = match.index ?? 0;
    if (index > lastIndex) parts.push(text.slice(lastIndex, index));

    if (value.startsWith("**")) {
      parts.push(<strong key={index}>{value.slice(2, -2)}</strong>);
    } else if (value.startsWith("*")) {
      parts.push(<em key={index}>{value.slice(1, -1)}</em>);
    } else if (value.startsWith("`")) {
      parts.push(<code key={index}>{value.slice(1, -1)}</code>);
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(value);
      if (link) {
        const href = link[2];
        parts.push(
          /^https?:\/\/|^\//i.test(href)
            ? <a key={index} href={href}>{link[1]}</a>
            : link[1],
        );
      }
    }

    lastIndex = index + value.length;
  }

  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return parts;
}

function renderMarkdown(content: string) {
  const blocks = content.split(/\r?\n\s*\r?\n/).map((block) => block.trim()).filter(Boolean);
  return blocks.map((block, index) => {
    const heading = /^(#{1,3})\s+(.+)$/.exec(block);
    if (heading) {
      const level = Math.min(heading[1].length, 3) + 1;
      const Tag = `h${level}` as "h2" | "h3" | "h4";
      const title = heading[2].replace(/\*\*/g, "").trim();
      return <Tag key={index} id={slugifyHeading(title)}>{renderInline(title)}</Tag>;
    }

    if (/^(?:-\s|\*\s)/m.test(block)) {
      return (
        <ul key={index}>
          {block.split(/\r?\n/).map((line, itemIndex) => (
            <li key={itemIndex}>{renderInline(line.replace(/^(?:-\s|\*\s)/, ""))}</li>
          ))}
        </ul>
      );
    }

    if (/^\d+\.\s/m.test(block)) {
      return (
        <ol key={index}>
          {block.split(/\r?\n/).map((line, itemIndex) => (
            <li key={itemIndex}>{renderInline(line.replace(/^\d+\.\s/, ""))}</li>
          ))}
        </ol>
      );
    }

    return <p key={index}>{renderInline(block)}</p>;
  });
}

function getArticleMetadata(post: BlogPost): Metadata {
  const title = post.seoTitle || `${post.title} | Aratha Insights`;
  const description = post.seoDescription || post.subtitle || post.excerpt;
  const image = isImageUrl(post.image) ? post.image : "/logo-white.png";
  const url = `https://aratha.in/insights/${post.slug}`;
  const date = post.date ? new Date(post.date).toISOString() : undefined;

  return {
    title,
    description,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title,
      description,
      url,
      type: "article",
      publishedTime: date,
      authors: [post.author],
      images: [{ url: image, alt: post.title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "resources") {
    return {
      title: "Guides & Resources | Aratha Insights",
      description: "Download practical Aratha guides, reports and research resources.",
      alternates: { canonical: "/insights/resources" },
    };
  }

  const category = getInsightsCategories().find((item) => categorySlug(item) === slug);
  if (category) {
    return {
      title: `${category} | Aratha Insights`,
      description: `Explore Aratha insights, articles and practical resources about ${category.toLowerCase()}.`,
      alternates: { canonical: `/insights/${slug}` },
    };
  }

  const posts = await getInsightPosts();
  const post = posts.find((item) => normalizeSlug(item.slug) === normalizeSlug(slug));
  return post ? getArticleMetadata(post) : { title: "Insight not found | Aratha" };
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = getInsightsCategories();
  const posts = await getInsightPosts();

  if (slug === "resources") {
    const resources = posts.filter((post) => post.resourceUrl);
    return (
      <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All insights
        </Link>
        <header className="mb-10 mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Downloadable resources</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">Guides, reports and practical tools</h1>
          <p className="mt-4 leading-7 text-slate-400">
            Explore useful resources created by Aratha to help teams make more informed decisions.
          </p>
        </header>
        <InsightsGrid posts={resources} categories={categories} />
      </main>
    );
  }

  const matchingCategory = categories.find((category) => categorySlug(category) === slug);
  if (matchingCategory) {
    return (
      <main className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
        <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All insights
        </Link>
        <header className="mb-10 mt-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-cyan-300">Insights category</p>
          <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl">{matchingCategory}</h1>
          <p className="mt-4 leading-7 text-slate-400">
            Articles, perspectives and practical resources from Aratha on {matchingCategory.toLowerCase()}.
          </p>
        </header>
        <InsightsGrid posts={posts} categories={categories} initialCategory={matchingCategory} />
      </main>
    );
  }

  const postIndex = posts.findIndex((post) => normalizeSlug(post.slug) === normalizeSlug(slug));
  if (postIndex < 0) notFound();

  const post = posts[postIndex];
  const related = posts
    .filter((item) => item.slug !== post.slug && item.category === post.category)
    .slice(0, 3);
  const previous = posts[postIndex + 1];
  const next = posts[postIndex - 1];
  const isHtml = /<(?:p|h[1-6]|ul|ol|blockquote|figure|div)\b/i.test(post.content);
  const htmlContent = isHtml ? withHeadingIds(post.content) : null;
  const headings = htmlContent?.headings ?? markdownHeadings(post.content);
  const articleUrl = `https://aratha.in/insights/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.subtitle || post.excerpt,
    image: isImageUrl(post.image) ? [post.image] : undefined,
    datePublished: post.date || undefined,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Aratha",
      logo: { "@type": "ImageObject", url: "https://aratha.in/logo-white.png" },
    },
    mainEntityOfPage: articleUrl,
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Link href="/insights" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 transition hover:text-white">
        <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Back to Insights
      </Link>

      <article className="mx-auto mt-8 max-w-4xl">
        <header>
          <Link
            href={`/insights/${categorySlug(post.category)}`}
            className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-cyan-200 hover:bg-cyan-400/20"
          >
            {post.category}
          </Link>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">{post.subtitle || post.excerpt}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-y border-white/10 py-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2"><UserRound className="h-4 w-4 text-cyan-300" />{post.author}</span>
            <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4 text-cyan-300" />{formatDate(post.date)}</span>
            <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4 text-cyan-300" />{post.readTime}</span>
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950/60">
          {isImageUrl(post.image) ? (
            <Image src={post.image} alt={post.title} fill priority unoptimized sizes="(max-width: 896px) 100vw, 896px" className="object-cover" />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/25 via-transparent to-transparent" />
          )}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_230px]">
          <div className="min-w-0">
            <div className="insights-prose">
              {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent.html }} />
              ) : (
                renderMarkdown(post.content)
              )}
            </div>

            {post.resourceUrl && (
              <a
                href={post.resourceUrl}
                download={post.resourceName || true}
                className="mt-10 flex items-center justify-between gap-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5 transition hover:bg-cyan-400/10"
              >
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-cyan-200">Downloadable resource</span>
                  <span className="mt-1 block text-sm font-semibold text-white">{post.resourceDescription || post.resourceName || "Download this resource"}</span>
                </span>
                <Download aria-hidden="true" className="h-5 w-5 shrink-0 text-cyan-300" />
              </a>
            )}
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            {headings.length > 0 && (
              <nav aria-label="Table of contents" className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <h2 className="text-xs font-bold uppercase tracking-wider text-white">In this article</h2>
                <ol className="mt-4 flex flex-col gap-3">
                  {headings.map((heading, index) => (
                    <li key={`${heading.id}-${index}`} className={heading.level === 3 ? "pl-3" : ""}>
                      <a href={`#${heading.id}`} className="text-xs leading-relaxed text-slate-400 hover:text-cyan-200">
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className="mt-5 rounded-2xl border border-white/10 bg-slate-900/60 p-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white">Share this article</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-400 hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-400 hover:text-white"
                >
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-400 hover:text-white"
                >
                  X
                </a>
              </div>
            </div>
          </aside>
        </div>
      </article>

      {(previous || next) && (
        <nav aria-label="Article navigation" className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2">
          {previous ? (
            <Link href={`/insights/${previous.slug}`} className="rounded-xl border border-white/10 bg-slate-900/50 p-5 hover:border-cyan-400/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Previous insight</span>
              <span className="mt-2 flex items-center gap-2 text-sm font-bold text-white"><ArrowLeft className="h-4 w-4 text-cyan-300" />{previous.title}</span>
            </Link>
          ) : <span />}
          {next && (
            <Link href={`/insights/${next.slug}`} className="rounded-xl border border-white/10 bg-slate-900/50 p-5 text-left sm:text-right hover:border-cyan-400/40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Next insight</span>
              <span className="mt-2 flex items-center justify-end gap-2 text-sm font-bold text-white">{next.title}<ArrowRight className="h-4 w-4 text-cyan-300" /></span>
            </Link>
          )}
        </nav>
      )}

      <section className="mx-auto mt-14 max-w-4xl rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">Put insight into action</p>
          <h2 className="mt-2 text-xl font-bold text-white">Ready to make your next move?</h2>
          <p className="mt-2 text-sm leading-6 text-slate-400">Talk with Aratha about a strategy that fits your business and customers.</p>
        </div>
        <Link href="/services" className="mt-5 inline-flex shrink-0 items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-300 sm:mt-0">
          Explore our services <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </section>

      {related.length > 0 && (
        <section className="mx-auto mt-16 max-w-7xl" aria-labelledby="related-insights">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Keep exploring</p>
              <h2 id="related-insights" className="mt-2 text-2xl font-extrabold text-white">Related insights</h2>
            </div>
            <Link href="/insights" className="hidden items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-white sm:inline-flex">
              View all <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <InsightsGrid posts={related} categories={categories} />
        </section>
      )}
    </main>
  );
}
