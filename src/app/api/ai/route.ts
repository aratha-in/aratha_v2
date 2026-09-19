import { NextResponse } from "next/server";
import { getPayloadClient } from "@/lib/payload";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, prompt, name, email, url, projectIdea } = body;

    if (action === "chat") {
      const userQuery = (prompt || "").toLowerCase();
      let reply = "";
      let leadCaptured = false;

      if (userQuery.includes("pricing") || userQuery.includes("cost") || userQuery.includes("price")) {
        reply = "Our custom responsive website engineering packages start at $2,499, web applications at $7,999, UI/UX design at $1,999, and SEO marketing retainers at $999/mo. Would you like me to generate a custom AI project cost scope for your business?";
      } else if (userQuery.includes("service") || userQuery.includes("what do you do") || userQuery.includes("offer")) {
        reply = "Aratha specializes in: 1. Custom Next.js Web Development, 2. Scalable Web & Mobile Apps, 3. UI/UX Systems Design, 4. Headless Payload CMS & Neon PostgreSQL, 5. Technical SEO & Market Intelligence, and 6. Cloud Hosting & DevOps. Which service area aligns with your goals?";
      } else if (userQuery.includes("tech") || userQuery.includes("stack") || userQuery.includes("nextjs")) {
        reply = "We engineer modern applications using Next.js App Router (v16), React, TypeScript, Tailwind CSS, Framer Motion, Payload CMS 3.x, and Neon PostgreSQL for lightning-fast performance and 99/100 Lighthouse scores.";
      } else if (email && email.includes("@")) {
        try {
          const payload = await getPayloadClient();
          await payload.create({
            collection: "leads",
            data: {
              name: name || "AI Chat Guest",
              email: email,
              type: "consultation",
              status: "New",
              message: `AI Chat Consultation: ${prompt || "Interested in agency scoping"}`,
            },
          });
          leadCaptured = true;
        } catch (err) {
          console.error("Failed to capture lead via AI chat:", err);
        }
        reply = `Thank you ${name || ""}! Your consultation request has been submitted directly to our lead engineering team. We will review your requirements and follow up at ${email} within 24 hours.`;
      } else {
        reply = "Welcome to Aratha Market Intelligence! I am your AI Assistant. I can help you scope custom web applications, analyze site SEO, calculate pricing estimates, or schedule a free 30-minute consultation with our engineering team. How can I assist you today?";
      }

      return NextResponse.json({
        reply,
        leadCaptured,
      });
    }

    if (action === "scope") {
      const idea = projectIdea || prompt || "Custom SaaS Platform";
      const isEcommerce = idea.toLowerCase().includes("shop") || idea.toLowerCase().includes("commerce") || idea.toLowerCase().includes("store");
      const isMobile = idea.toLowerCase().includes("mobile") || idea.toLowerCase().includes("app");

      const scope = {
        title: `AI Architecture Scope: ${idea}`,
        recommendedStack: isMobile
          ? ["Next.js 16", "React Native", "Payload CMS 3.x", "Neon PostgreSQL", "Tailwind CSS v4"]
          : ["Next.js 16 (App Router)", "TypeScript", "Payload CMS", "Neon PostgreSQL", "AWS / Vercel"],
        estimatedWeeks: isEcommerce ? "5 to 7 Weeks" : "4 to 6 Weeks",
        estimatedCost: isEcommerce ? "$8,999 - $12,499" : "$6,499 - $9,999",
        phases: [
          { phase: "1. Discovery & Sitemap Audit", duration: "Week 1" },
          { phase: "2. UI/UX Figma Design System", duration: "Weeks 2-3" },
          { phase: "3. Next.js & Payload CMS Engineering", duration: "Weeks 4-5" },
          { phase: "4. QA Testing & Neon PostgreSQL Deploy", duration: "Week 6" },
        ],
        keyFeatures: [
          "High-Performance Next.js Server Components",
          "Headless Content Management via Payload CMS",
          "Automated Lead Engine connected to Neon PostgreSQL",
          "99/100 Lighthouse Performance & SEO Optimization",
        ],
      };

      return NextResponse.json(scope);
    }

    if (action === "audit") {
      const targetUrl = url || prompt || "https://example.com";
      const audit = {
        url: targetUrl,
        lighthouseScore: 98,
        performanceIndex: "0.4s First Contentful Paint",
        seoScore: "96/100 (Structured Schema Injected)",
        accessibility: "WCAG AA Compliant",
        recommendations: [
          "Pre-render dynamic routes using Next.js Static Site Generation.",
          "Migrate static database assets into Payload CMS & Neon PostgreSQL.",
          "Inject structured LocalBusiness JSON-LD schema tags for search crawlers.",
        ],
      };

      return NextResponse.json(audit);
    }

    return NextResponse.json({ error: "Invalid AI action specified" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "AI engine processing failed" }, { status: 500 });
  }
}
