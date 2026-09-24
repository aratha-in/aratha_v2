import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
  metadataBase: new URL("https://aratha.in"),
  title: {
    default: "Aratha | Your Partner in Market Intelligence & Next.js Web Engineering",
    template: "%s | Aratha Agency",
  },
  description:
    "Aratha is your partner in market intelligence, custom Next.js web application engineering, headless CMS solutions, UI/UX systems design, technical SEO, and cloud hosting.",
  keywords: [
    "Aratha Agency",
    "Market Intelligence",
    "Next.js Development Agency",
    "Custom Web Applications",
    "Headless Payload CMS",
    "TypeScript Web Development",
    "UI UX Systems Design",
    "Technical SEO Agency",
    "Generative Engine Optimization",
    "Answer Engine Optimization",
    "Cloud DevOps AWS",
  ],
  authors: [{ name: "Aratha Engineering Team", url: "https://aratha.in" }],
  creator: "Aratha Solutions Group",
  publisher: "Aratha Agency",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Aratha | Partner in Market Intelligence & Web Engineering",
    description:
      "Transform ideas into powerful digital experiences. Custom Next.js web applications, UI/UX design, technical SEO, and cloud automation.",
    url: "https://aratha.in",
    siteName: "Aratha Agency",
    images: [
      {
        url: "/logo-white.png",
        width: 1200,
        height: 630,
        alt: "Aratha - Your Partner in Market Intelligence",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aratha | Market Intelligence & Next.js Web Engineering",
    description:
      "Custom responsive web engineering, high-performance web applications, technical SEO, and cloud automation.",
    images: ["/logo-white.png"],
    creator: "@aratha",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
  // Comprehensive Multi-Schema JSON-LD Graph (SEO, AEO & GEO Ingestion)
  const jsonLdGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": "https://aratha.in/#organization",
        "name": "Aratha Agency",
        "url": "https://aratha.in",
        "logo": "https://aratha.in/logo-white.png",
        "image": "https://aratha.in/logo-white.png",
        "description": "Digital engineering and market intelligence agency specializing in custom Next.js applications, headless CMS, UI/UX systems design, technical SEO, and cloud DevOps.",
        "telephone": "+91-9999999999",
        "email": "info@aratha.in",
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Tech Hub Quarter",
          "addressLocality": "Bangalore",
          "addressRegion": "Karnataka",
          "postalCode": "560001",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "12.9716",
          "longitude": "77.5946"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
          }
        ],
        "knowsAbout": [
          "Next.js Development",
          "React Architecture",
          "TypeScript",
          "Tailwind CSS",
          "Payload CMS",
          "PostgreSQL",
          "Technical SEO",
          "Answer Engine Optimization (AEO)",
          "Generative Engine Optimization (GEO)",
          "Cloud Hosting & DevOps"
        ],
        "sameAs": [
          "https://facebook.com/aratha",
          "https://twitter.com/aratha",
          "https://linkedin.com/company/aratha"
        ]
      },
      {
        "@type": "WebSite",
        "@id": "https://aratha.in/#website",
        "url": "https://aratha.in",
        "name": "Aratha Agency",
        "description": "Your Partner in Market Intelligence",
        "publisher": {
          "@id": "https://aratha.in/#organization"
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://aratha.in/blog?search={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "FAQPage",
        "@id": "https://aratha.in/#faq",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What services does Aratha provide?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Aratha provides custom Next.js web application development, UI/UX systems design, Headless Payload CMS integration, technical SEO, Answer & Generative Engine Optimization (AEO/GEO), and AWS cloud DevOps automation."
            }
          },
          {
            "@type": "Question",
            "name": "What technology stack does Aratha use for web engineering?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Aratha builds high-performance applications using Next.js App Router (v16), React, TypeScript, Tailwind CSS, Framer Motion, Payload CMS 3.x, PostgreSQL, and AWS / Vercel cloud infrastructure."
            }
          },
          {
            "@type": "Question",
            "name": "How fast are websites built by Aratha?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Websites built by Aratha achieve 90+ Lighthouse performance scores with average page load speeds under 1.5 seconds globally using edge rendering and pre-rendered static routes."
            }
          }
        ]
      }
    ]
  };

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100 selection:bg-secondary selection:text-slate-950">
        <Navbar />
        {/* Main Content Area */}
        <main className="flex-1 pt-24">{children}</main>
        <Footer />
        <WhatsAppFloat />
        <AiAssistantModal />
      </body>
    </html>
  );
}
