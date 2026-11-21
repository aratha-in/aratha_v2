import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  HelpCircle,
  UserRound,
  Zap,
} from "lucide-react";
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
  const lines = markdown.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // Standard markdown headings ## or ###
    const match = /^(##|###)\s+(.+)$/.exec(trimmed);
    if (match) {
      const title = match[2].replace(/\*\*/g, "").trim();
      headings.push({ id: slugifyHeading(title), title, level: match[1].length });
      continue;
    }

    // Natural step headings: Step X: ...
    const stepMatch = /^Step\s+\d+:\s*(.+)$/i.exec(trimmed);
    if (stepMatch) {
      headings.push({ id: slugifyHeading(trimmed), title: trimmed, level: 2 });
      continue;
    }

    // Question headings
    if (/^(?:What|Why|How|Where|Who|When)\s+.*\?$/i.test(trimmed) && trimmed.length < 90) {
      headings.push({ id: slugifyHeading(trimmed), title: trimmed, level: 2 });
      continue;
    }

    // Notable section titles
    if (/^(?:Digital Marketing Strategy Checklist|A Practical Example:.*|The Key Takeaway:.*)$/i.test(trimmed)) {
      headings.push({ id: slugifyHeading(trimmed), title: trimmed, level: 2 });
      continue;
    }
  }
  return headings;
}

function parseMarkdownTable(block: string) {
  const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length < 2) return null;
  if (!lines.every((l) => l.includes("|"))) return null;

  const headerLine = lines[0];
  const separatorLine = lines[1];
  if (!/^\s*\|?\s*:?-+:?\s*(\|?\s*:?-+:?\s*)+\|?\s*$/.test(separatorLine)) {
    return null;
  }

  const parseRow = (line: string) => {
    let cells = line.split("|");
    if (line.startsWith("|")) cells.shift();
    if (line.endsWith("|")) cells.pop();
    return cells.map((c) => c.trim());
  };

  const headers = parseRow(headerLine);
  const rows = lines.slice(2).map(parseRow);

  return { headers, rows };
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
      parts.push(<strong key={index} className="text-white font-semibold">{value.slice(2, -2)}</strong>);
    } else if (value.startsWith("*")) {
      parts.push(<em key={index} className="text-slate-200 italic">{value.slice(1, -1)}</em>);
    } else if (value.startsWith("`")) {
      parts.push(<code key={index} className="rounded bg-slate-900 border border-white/10 px-1.5 py-0.5 text-xs text-cyan-300 font-mono">{value.slice(1, -1)}</code>);
    } else {
      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(value);
      if (link) {
        const href = link[2];
        parts.push(
          /^https?:\/\/|^\//i.test(href)
            ? <a key={index} href={href} className="text-cyan-300 hover:text-cyan-200 underline underline-offset-4 font-medium transition">{link[1]}</a>
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
    // Horizontal divider
    if (/^(?:---|\*\*\*|___)$/.test(block)) {
      return <hr key={index} className="my-10 border-white/10" />;
    }

    // Markdown Table
    const tableData = parseMarkdownTable(block);
    if (tableData) {
      return (
        <div key={index} className="my-8 overflow-x-auto rounded-2xl border border-white/10 bg-slate-900/80 shadow-xl">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-800/90 text-xs uppercase tracking-wider text-cyan-300 border-b border-white/10">
              <tr>
                {tableData.headers.map((h, i) => (
                  <th key={i} className="px-5 py-4 font-bold">{renderInline(h)}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tableData.rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-800/40 transition">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-5 py-4 leading-relaxed">{renderInline(cell)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    // Blockquote
    if (/^>\s*/m.test(block)) {
      const quoteLines = block.split(/\r?\n/).map((l) => l.replace(/^>\s*/, ""));
      return (
        <blockquote key={index} className="my-8 rounded-2xl border-l-4 border-cyan-400 bg-gradient-to-r from-cyan-950/30 to-slate-900/50 p-6 backdrop-blur-sm shadow-lg">
          <div className="space-y-3 text-base sm:text-lg italic leading-relaxed text-cyan-100 font-medium">
            {quoteLines.map((line, qIdx) => (
              <p key={qIdx}>{renderInline(line)}</p>
            ))}
          </div>
        </blockquote>
      );
    }

    // Checklist (- [ ] or - [x])
    if (/^-\s*\[([ xX])\]\s+/m.test(block)) {
      const items = block.split(/\r?\n/).map((line) => {
        const match = /^-\s*\[([ xX])\]\s+(.*)$/.exec(line.trim());
        if (match) {
          return { checked: match[1].toLowerCase() === "x", text: match[2] };
        }
        return { checked: false, text: line.replace(/^-\s*/, "") };
      });

      return (
        <div key={index} className="my-6 space-y-2.5 rounded-2xl border border-white/10 bg-slate-900/50 p-5">
          {items.map((item, itIdx) => (
            <div key={itIdx} className="flex items-start gap-3">
              <span className={`inline-flex items-center justify-center h-5 w-5 rounded-md mt-0.5 shrink-0 text-xs font-bold ${item.checked ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/40" : "bg-slate-800 text-slate-500 border border-white/15"}`}>
                {item.checked ? "✓" : ""}
              </span>
              <span className={`text-[15px] leading-relaxed ${item.checked ? "text-slate-200" : "text-slate-400"}`}>
                {renderInline(item.text)}
              </span>
            </div>
          ))}
        </div>
      );
    }

    // Step Header: Step X: ... or ## Step X: ...
    const stepMatch = /^(?:##\s+)?Step\s+(\d+):\s*(.+)$/i.exec(block);
    if (stepMatch) {
      const stepNum = stepMatch[1];
      const stepTitle = stepMatch[2].replace(/\*\*/g, "").trim();
      const id = slugifyHeading(`step-${stepNum}-${stepTitle}`);
      return (
        <div key={index} className="mt-14 mb-6 pt-6 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center rounded-lg border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-300">
              Step {stepNum}
            </span>
            <h2 id={id} className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
              {renderInline(stepTitle)}
            </h2>
          </div>
        </div>
      );
    }

    // Standard Markdown Heading: #, ##, ###, ####
    const heading = /^(#{1,4})\s+(.+)$/.exec(block);
    if (heading) {
      const level = Math.min(heading[1].length, 4);
      const Tag = `h${level === 1 ? 2 : level}` as "h2" | "h3" | "h4";
      const title = heading[2].replace(/\*\*/g, "").trim();
      return <Tag key={index} id={slugifyHeading(title)}>{renderInline(title)}</Tag>;
    }

    // Natural Section Header
    if (/^(?:What Is a [^?]+\?|Digital Marketing Strategy Checklist|The Key Takeaway:.*|A Practical Example:.*)$/i.test(block) && block.length < 100) {
      return (
        <h2 key={index} id={slugifyHeading(block)} className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl mt-12 mb-5">
          {renderInline(block)}
        </h2>
      );
    }

    // Bullet List (- or *)
    if (/^(?:-\s|\*\s)/m.test(block)) {
      return (
        <ul key={index}>
          {block.split(/\r?\n/).map((line, itemIndex) => (
            <li key={itemIndex}>{renderInline(line.replace(/^(?:-\s|\*\s)/, ""))}</li>
          ))}
        </ul>
      );
    }

    // Numbered List (1. 2.)
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
  const keywords = post.primaryKeyword
    ? [post.primaryKeyword, ...(post.tags || [])]
    : post.tags;

  return {
    title,
    description,
    keywords,
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

  let faqs: Array<{ question: string; answer: string }> = [];
  if (Array.isArray(post.faqs)) {
    faqs = post.faqs;
  } else if (typeof post.faqs === "string") {
    try {
      const parsed = JSON.parse(post.faqs);
      if (Array.isArray(parsed)) faqs = parsed;
    } catch {}
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${articleUrl}#article`,
        "headline": post.title,
        "description": post.seoDescription || post.subtitle || post.excerpt,
        "image": isImageUrl(post.image) ? [post.image] : undefined,
        "datePublished": post.date || undefined,
        "dateModified": post.date || undefined,
        "inLanguage": "en-US",
        "mainEntityOfPage": articleUrl,
        "author": {
          "@type": "Person",
          "name": post.author,
          "url": "https://aratha.in/about",
        },
        "publisher": {
          "@type": "Organization",
          "name": "Aratha",
          "url": "https://aratha.in",
          "logo": { "@type": "ImageObject", "url": "https://aratha.in/logo-white.png" },
        },
        "keywords": post.primaryKeyword || (post.tags ? post.tags.join(", ") : undefined),
        "articleSection": post.category,
        "speakable": {
          "@type": "SpeakableSpecification",
          "cssSelector": [".article-direct-answer", ".article-key-takeaways", ".insights-prose h2"],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${articleUrl}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://aratha.in" },
          { "@type": "ListItem", "position": 2, "name": "Insights", "item": "https://aratha.in/insights" },
          { "@type": "ListItem", "position": 3, "name": post.category, "item": `https://aratha.in/insights/${categorySlug(post.category)}` },
          { "@type": "ListItem", "position": 4, "name": post.title, "item": articleUrl },
        ],
      },
      ...(faqs.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${articleUrl}#faq`,
              "mainEntity": faqs.map((f) => ({
                "@type": "Question",
                "name": f.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": f.answer,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      
      {/* Top Breadcrumb Navigation */}
      <div className="mx-auto max-w-4xl mb-6">
        <Link href="/insights" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 transition hover:text-cyan-300">
          <ArrowLeft aria-hidden="true" className="h-3.5 w-3.5" /> Back to Insights
        </Link>
      </div>

      <article className="mx-auto max-w-4xl">
        {/* Article Header */}
        <header className="mb-10 text-left">
          <Link
            href={`/insights/${categorySlug(post.category)}`}
            className="inline-flex rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-cyan-200 hover:bg-cyan-400/20 transition"
          >
            {post.category}
          </Link>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            {post.title}
          </h1>
          {post.subtitle || post.excerpt ? (
            <p className="mt-5 text-lg leading-relaxed text-slate-300 sm:text-xl font-normal">
              {post.subtitle || post.excerpt}
            </p>
          ) : null}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-white/10 py-4 text-xs text-slate-400">
            <span className="inline-flex items-center gap-2">
              <UserRound className="h-4 w-4 text-cyan-300" />
              <strong className="text-slate-200 font-semibold">{post.author}</strong>
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-cyan-300" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-cyan-300" />
              {post.readTime}
            </span>
          </div>
        </header>

        {/* Featured Banner Image */}
        {isImageUrl(post.image) && (
          <div className="relative mb-12 aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {/* Main Content & Sidebar Layout */}
        <div className={headings.length > 0 ? "grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_260px]" : "mx-auto max-w-3xl"}>
          <div className="min-w-0">
            {/* AEO Quick Answer Snippet */}
            {post.directAnswer && (
              <div className="article-direct-answer mb-10 rounded-2xl border border-cyan-400/40 bg-gradient-to-br from-cyan-950/40 via-slate-900/80 to-slate-900 p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-300 mb-2.5">
                  <Zap className="h-4 w-4" /> Quick Answer / Direct Summary (AEO)
                </div>
                <p className="text-base sm:text-lg leading-relaxed text-slate-100 font-medium">
                  {post.directAnswer}
                </p>
              </div>
            )}

            {/* GEO Key Takeaways Box */}
            {post.keyTakeaways && (
              <div className="article-key-takeaways mb-10 rounded-2xl border border-white/15 bg-slate-900/70 p-6 shadow-lg">
                <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-cyan-300 mb-3">
                  <BookmarkCheck className="h-4 w-4" /> Key Takeaways (Executive Summary)
                </div>
                <div className="insights-prose">
                  {renderMarkdown(post.keyTakeaways)}
                </div>
              </div>
            )}

            {/* Main Article Prose Content */}
            <div className="insights-prose">
              {htmlContent ? (
                <div dangerouslySetInnerHTML={{ __html: htmlContent.html }} />
              ) : (
                renderMarkdown(post.content)
              )}
            </div>

            {/* Downloadable Resource */}
            {post.resourceUrl && (
              <a
                href={post.resourceUrl}
                download={post.resourceName || true}
                className="mt-12 flex items-center justify-between gap-5 rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-6 transition hover:bg-cyan-400/10 shadow-lg"
              >
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wider text-cyan-200">Downloadable resource</span>
                  <span className="mt-1 block text-base font-bold text-white">{post.resourceDescription || post.resourceName || "Download this resource"}</span>
                </span>
                <Download aria-hidden="true" className="h-6 w-6 shrink-0 text-cyan-300" />
              </a>
            )}

            {/* AEO Frequently Asked Questions (FAQ Section) */}
            {faqs.length > 0 && (
              <section className="mt-14 pt-10 border-t border-white/10" aria-labelledby="faq-section">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">
                  <HelpCircle className="h-4 w-4" /> Frequently Asked Questions
                </div>
                <h2 id="faq-section" className="text-2xl font-extrabold text-white sm:text-3xl mb-6">
                  Questions Answered in This Article
                </h2>
                <div className="space-y-4">
                  {faqs.map((faq, fIdx) => (
                    <div key={fIdx} className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 shadow-md">
                      <h3 className="text-base sm:text-lg font-bold text-white mb-2 flex items-start gap-2.5">
                        <span className="text-cyan-400 font-extrabold">Q:</span>
                        <span>{faq.question}</span>
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-[15px] sm:text-base pl-6">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* GEO E-E-A-T Editorial Integrity & Fact-Check Trust Badge */}
            <div className="my-10 rounded-2xl border border-white/10 bg-slate-900/40 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0" />
                <span>
                  <strong className="text-slate-200">Editorial Integrity:</strong> Authored by {post.author} · Peer-reviewed for technical accuracy · Structured for Search & Generative AI standards.
                </span>
              </div>
            </div>
          </div>

          {headings.length > 0 && (
            <aside className="lg:sticky lg:top-24 lg:self-start space-y-6">
              <nav aria-label="Table of contents" className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md p-6 shadow-xl">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-cyan-300 border-b border-white/10 pb-3">
                  In this article
                </h2>
                <ol className="mt-4 flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto pr-1">
                  {headings.map((heading, index) => (
                    <li key={`${heading.id}-${index}`} className={heading.level === 3 ? "pl-3.5" : ""}>
                      <a
                        href={`#${heading.id}`}
                        className="text-xs leading-relaxed text-slate-400 hover:text-cyan-300 transition line-clamp-2"
                      >
                        {heading.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>

              <div className="rounded-2xl border border-white/10 bg-slate-900/80 backdrop-blur-md p-5 shadow-xl">
                <h2 className="text-xs font-extrabold uppercase tracking-widest text-slate-300 border-b border-white/10 pb-3">
                  Share article
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-400 hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-400 hover:text-white transition"
                  >
                    X
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-white/10 bg-slate-800/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:border-cyan-400 hover:text-white transition"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </aside>
          )}
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
