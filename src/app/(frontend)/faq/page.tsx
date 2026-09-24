"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const faqData = [
    {
      id: "faq_1",
      category: "Services & Process",
      question: "How long does a standard Next.js corporate website development take?",
      answer: "A standard corporate website of 5 to 10 pages typically takes 4 to 6 weeks. This includes the strategy phase, custom UI/UX design wireframing, high-performance Next.js coding, SEO setup, and final DevOps deployment checks."
    },
    {
      id: "faq_2",
      category: "Services & Process",
      question: "Will the website be optimized for mobile devices?",
      answer: "Yes, 100%. All of our frontend applications use responsive grids (via Tailwind CSS) designed specifically to offer premium usability across mobile viewports, tablet screens, and wide desktop displays."
    },
    {
      id: "faq_3",
      category: "Pricing & Retainers",
      question: "What is included in the Website Maintenance SLA?",
      answer: "Our maintenance retainers include daily cloud-encrypted database and source file backups, security vulnerability scans, Next.js framework updates, content modifications (under 2 hours per month), and a 30-minute critical support SLA."
    },
    {
      id: "faq_4",
      category: "Pricing & Retainers",
      question: "Do you offer custom pricing estimates?",
      answer: "Yes. In addition to our preset tiers, you can use our Pricing Calculator on the pricing page to configure a project scope based on page limits and features. Our account executives will compile a custom proposal."
    },
    {
      id: "faq_5",
      category: "Tech & Databases",
      question: "Why does Aratha recommend decoupled Headless CMS architecture over WordPress?",
      answer: "Decoupled Headless CMS (like Next.js with Payload CMS) separates data storage from the front-end layout. This yields three major benefits: (1) loading speeds under 1.5s, (2) complete security against SQL injection attacks, and (3) omnichannel content reuse."
    },
    {
      id: "faq_6",
      category: "Tech & Databases",
      question: "Can you host our systems on our AWS cloud account?",
      answer: "Absolutely. During our deployment setup phase, our DevOps team will configure secure horizonal-scaling clusters, S3 buckets, and SSL firewalls directly inside your corporate AWS or Vercel cloud environment."
    }
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="relative w-full py-16 px-6 max-w-4xl mx-auto overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Decorative Blob */}
      <div className="glow-blob bg-accent top-1/4 -left-10 opacity-15" />

      {/* Header */}
      <div className="text-center flex flex-col items-center gap-4 mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-accent font-mono">Answers</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Frequently Asked <span className="text-gradient-gold">Questions</span>
        </h1>
        <p className="text-slate-400 text-sm max-w-xl leading-relaxed mt-2">
          Find answers regarding our scoping timelines, monthly maintenance packages, compliance standards, and tech stack configurations.
        </p>
      </div>

      {/* Accordions List */}
      <section className="flex flex-col gap-4">
        {faqData.map((faq) => {
          const isOpen = activeFaqId === faq.id;
          return (
            <div
              key={faq.id}
              className="glass-card p-6 border-white/5 flex flex-col gap-3.5 transition-all duration-300"
            >
              <button
                onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                className="w-full flex items-center justify-between text-left gap-4"
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-secondary shrink-0" />
                  <span className="text-sm font-bold text-white pr-4">
                    {faq.question}
                  </span>
                </div>
                <div className="text-slate-500 hover:text-white transition-colors">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-white/5 pt-4 text-xs text-slate-300 leading-relaxed animate-slide-down">
                  <p>{faq.answer}</p>
                  <span className="text-[9px] uppercase font-bold text-slate-500 font-mono tracking-wider block mt-4">
                    Topic: {faq.category}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
}
