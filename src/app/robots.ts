import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/portal", "/cms", "/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "Bytespider",
          "CCBot",
          "Applebot-Extended"
        ],
        allow: "/",
        disallow: ["/admin", "/portal", "/cms", "/api/"],
      }
    ],
    sitemap: "https://aratha.in/sitemap.xml",
  };
}
