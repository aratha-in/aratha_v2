import { Service, PortfolioProject, BlogPost, Testimonial, Lead, SeoConfig } from "@shared/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE_URL}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API Error ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

export async function getServices(): Promise<Service[]> {
  try {
    return await fetcher<Service[]>("/services");
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}

export async function getPortfolio(): Promise<PortfolioProject[]> {
  try {
    return await fetcher<PortfolioProject[]>("/portfolio");
  } catch (error) {
    console.error("Failed to fetch portfolio:", error);
    return [];
  }
}

export async function getBlogs(): Promise<BlogPost[]> {
  try {
    return await fetcher<BlogPost[]>("/blog");
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return [];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return await fetcher<Testimonial[]>("/testimonials");
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}

export async function submitLead(lead: Omit<Lead, "id" | "date" | "status">): Promise<{ success: boolean; lead?: Lead; error?: string }> {
  try {
    const created = await fetcher<Lead>("/leads", {
      method: "POST",
      body: JSON.stringify(lead),
    });
    return { success: true, lead: created };
  } catch (error: any) {
    console.error("Failed to submit lead:", error);
    return { success: false, error: error.message || "Failed to submit lead" };
  }
}

export async function queryAiAssistant(payload: { action: string; prompt?: string; name?: string; email?: string; url?: string; projectIdea?: string }) {
  try {
    return await fetcher<{ reply?: string; leadCaptured?: boolean; [key: string]: any }>("/ai", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  } catch (error: any) {
    console.error("AI Assistant request failed:", error);
    return { reply: "Sorry, I am currently unable to process your request. Please try again shortly." };
  }
}

export async function getSeoConfig(): Promise<Record<string, SeoConfig>> {
  try {
    return await fetcher<Record<string, SeoConfig>>("/seo");
  } catch (error) {
    console.error("Failed to fetch SEO configuration:", error);
    return {};
  }
}
