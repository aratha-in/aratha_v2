import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LiveChat from "@/components/LiveChat";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import AiAssistantModal from "@/components/AiAssistantModal";
import "@/app/globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aratha | Your Partner in Market Intelligence",
  description:
    "Aratha – Your Partner in Market Intelligence, website engineering, market analytics, UI/UX design, and cloud hosting.",
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Local Business Structured Data (JSON-LD) for SEO
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Aratha Agency",
    "url": "https://aratha.in",
    "logo": "https://aratha.in/logo.png",
    "image": "https://aratha.in/hero-bg.jpg",
    "description": "Digital Marketing & Web Development Agency specializing in Next.js applications, branding, and business automation.",
    "telephone": "+91-9999999999",
    "email": "info@aratha.in",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bangalore",
      "addressRegion": "Karnataka",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://facebook.com/aratha",
      "https://twitter.com/aratha",
      "https://linkedin.com/company/aratha"
    ]
  };

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-secondary selection:text-slate-950">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
        <LiveChat />
        <WhatsAppFloat />
        <AiAssistantModal />
      </body>
    </html>
  );
}
