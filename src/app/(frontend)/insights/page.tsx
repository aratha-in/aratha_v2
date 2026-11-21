import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3 } from "lucide-react";
import InsightsGrid from "@/components/InsightsGrid";
import { getInsightPosts, getInsightsCategories } from "@/lib/insights";

export const revalidate = 0;

export const metadata: Metadata = {
  title: "Insights | Aratha",
  description:
    "Explore industry knowledge, market perspectives, digital strategies and practical resources to make informed business decisions.",
  alternates: { canonical: "/insights" },
  openGraph: {
    title: "Insights | Aratha",
    description:
      "Explore industry knowledge, market perspectives, digital strategies and practical resources to make informed business decisions.",
    url: "/insights",
    type: "website",
  },
};

function isImageUrl(image: string) {
  return image.startsWith("/") || image.startsWith("https://") || image.startsWith("http://");
}

function formatDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export default async function InsightsPage() {
  const posts = await getInsightPosts();
  const categories = getInsightsCategories();
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const latest = featured ? posts.filter((post) => post.slug !== featured.slug) : posts;
  const resourcePosts = posts.filter((post) => post.resourceUrl);

  return (
    <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 sm:py-20">
      <header className="mx-auto mb-12 max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">Aratha Knowledge Hub</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">Insights</h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400">
          Explore industry knowledge, market perspectives, digital strategies and practical resources to make informed business decisions.
        </p>
      </header>

      {featured && (
        <section aria-labelledby="featured-insight" className="mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-white/10" />
            <h2 id="featured-insight" className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">
              Featured article
            </h2>
            <span className="h-px flex-1 bg-white/10" />
          </div>
          <article className="grid overflow-hidden rounded-3xl border border-white/10 bg-slate-900/70 lg:grid-cols-2">
            <Link
              href={`/insights/${featured.slug}`}
              className="relative min-h-64 overflow-hidden bg-gradient-to-br from-slate-800 via-slate-900 to-cyan-950/60 lg:min-h-[390px]"
              aria-label={`Read ${featured.title}`}
            >
              {isImageUrl(featured.image) ? (
                <Image
                  src={featured.image}
                  alt={featured.title}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-cyan-400/25 via-transparent to-transparent" />
              )}
            </Link>
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <p className="text-xs font-bold uppercase tracking-wider text-cyan-300">{featured.category}</p>
              <h2 className="mt-4 text-2xl font-extrabold leading-tight text-white sm:text-3xl">
                <Link href={`/insights/${featured.slug}`} className="hover:text-cyan-100">
                  {featured.title}
                </Link>
              </h2>
              <p className="mt-4 text-sm leading-7 text-slate-400">{featured.subtitle || featured.excerpt}</p>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" />{formatDate(featured.date)}</span>
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" />{featured.readTime}</span>
              </div>
              <Link
                href={`/insights/${featured.slug}`}
                className="mt-8 inline-flex w-fit items-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-cyan-300"
              >
                Read more <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </div>
          </article>
        </section>
      )}

      <section aria-labelledby="latest-insights" className="flex flex-col gap-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Ideas for what comes next</p>
            <h2 id="latest-insights" className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Latest insights</h2>
          </div>
          <p className="max-w-lg text-sm leading-6 text-slate-400">
            Practical thinking for the decisions shaping your market, customers and digital growth.
          </p>
        </div>
        <InsightsGrid posts={latest} allPosts={posts} categories={categories} />
      </section>

      {resourcePosts.length > 0 && (
        <section className="mt-16 rounded-2xl border border-white/10 bg-slate-900/50 p-6 sm:p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cyan-300">Practical resources</p>
              <h2 className="mt-2 text-xl font-bold text-white">Guides and reports to take away</h2>
            </div>
            <Link href="/insights/resources" className="inline-flex items-center gap-2 text-sm font-bold text-cyan-300 hover:text-white">
              Explore resources <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
