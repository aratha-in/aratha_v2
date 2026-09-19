import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Media Downloads & Brand Asset Kits | Aratha",
  description: "Access our downloadable PDF brochures, Next.js sitemaps templates, business whitepapers, and digital agency presentations.",
};

export default function DownloadsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
