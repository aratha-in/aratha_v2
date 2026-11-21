import fs from "fs/promises";
import path from "path";

// Define interfaces for database structure
export interface Service {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  longDescription: string;
  features: string[];
  pricing: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  client: string;
  duration: string;
  tags: string[];
  image: string;
  link: string;
  highlights: string[];
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: {
    kpi1: { label: string; value: string };
    kpi2: { label: string; value: string };
    kpi3: { label: string; value: string };
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: string;
  category: string;
  tags?: string[];
  featured?: boolean;
  status?: "draft" | "review" | "approved" | "scheduled" | "published";
  resourceUrl?: string;
  resourceName?: string;
  resourceDescription?: string;
  seoTitle?: string;
  seoDescription?: string;
}

export interface Lead {
  id: string;
  type: "contact" | "newsletter" | "career";
  name?: string;
  email: string;
  phone?: string;
  jobTitle?: string;
  experience?: string;
  message?: string;
  status: string;
  date: string;
}

export interface SeoConfig {
  title: string;
  description: string;
  keywords: string;
}

export interface DatabaseSchema {
  services: Service[];
  portfolio: PortfolioProject[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  leads: Lead[];
  seo: Record<string, SeoConfig>;
}

// Define the file path resolving from workspace root
const getDbPath = () => path.join(process.cwd(), "src", "data", "db.json");

// In-memory cache & write-lock state for high speed and data integrity
let cachedDb: DatabaseSchema | null = null;
let lastMtimeMs: number = 0;
let writeQueue: Promise<any> = Promise.resolve();

// Helper to read database with in-memory caching and mtime validation
export async function getDb(): Promise<DatabaseSchema> {
  const filePath = getDbPath();
  try {
    const stats = await fs.stat(filePath);
    if (cachedDb && stats.mtimeMs === lastMtimeMs) {
      return cachedDb;
    }
    const rawData = await fs.readFile(filePath, "utf-8");
    cachedDb = JSON.parse(rawData) as DatabaseSchema;
    lastMtimeMs = stats.mtimeMs;
    return cachedDb;
  } catch (error) {
    if (cachedDb) return cachedDb;
    console.error("Database read error. Fallback schema initialized:", error);
    return {
      services: [],
      portfolio: [],
      caseStudies: [],
      testimonials: [],
      blogs: [],
      leads: [],
      seo: {},
    };
  }
}

// Helper to write database with atomic file renaming and write queue locking
export async function writeDb(data: DatabaseSchema): Promise<boolean> {
  const filePath = getDbPath();
  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;

  // Queue writes sequentially to avoid race conditions
  writeQueue = writeQueue.then(async () => {
    try {
      await fs.writeFile(tempPath, JSON.stringify(data, null, 2), "utf-8");
      await fs.rename(tempPath, filePath);
      cachedDb = data;
      const stats = await fs.stat(filePath);
      lastMtimeMs = stats.mtimeMs;
      return true;
    } catch (error) {
      console.error("Database atomic write error:", error);
      try {
        await fs.unlink(tempPath);
      } catch {}
      return false;
    }
  });

  return writeQueue;
}

// Services CRUD
export async function getServices() {
  const db = await getDb();
  return db.services;
}

export async function addService(service: Omit<Service, "id">) {
  const db = await getDb();
  const newService: Service = {
    ...service,
    id: `srv_${Date.now()}`,
  };
  db.services.push(newService);
  await writeDb(db);
  return newService;
}

export async function updateService(id: string, updated: Partial<Service>) {
  const db = await getDb();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) return null;
  db.services[index] = { ...db.services[index], ...updated };
  await writeDb(db);
  return db.services[index];
}

export async function deleteService(id: string) {
  const db = await getDb();
  const index = db.services.findIndex((s) => s.id === id);
  if (index === -1) return false;
  db.services.splice(index, 1);
  await writeDb(db);
  return true;
}

// Portfolio CRUD
export async function getPortfolio() {
  const db = await getDb();
  return db.portfolio;
}

export async function addPortfolio(project: Omit<PortfolioProject, "id">) {
  const db = await getDb();
  const newProject: PortfolioProject = {
    ...project,
    id: `port_${Date.now()}`,
  };
  db.portfolio.push(newProject);
  await writeDb(db);
  return newProject;
}

export async function updatePortfolio(id: string, updated: Partial<PortfolioProject>) {
  const db = await getDb();
  const index = db.portfolio.findIndex((p) => p.id === id);
  if (index === -1) return null;
  db.portfolio[index] = { ...db.portfolio[index], ...updated };
  await writeDb(db);
  return db.portfolio[index];
}

export async function deletePortfolio(id: string) {
  const db = await getDb();
  const index = db.portfolio.findIndex((p) => p.id === id);
  if (index === -1) return false;
  db.portfolio.splice(index, 1);
  await writeDb(db);
  return true;
}

// Testimonials CRUD
export async function getTestimonials() {
  const db = await getDb();
  return db.testimonials;
}

export async function addTestimonial(testimonial: Omit<Testimonial, "id">) {
  const db = await getDb();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: `test_${Date.now()}`,
  };
  db.testimonials.push(newTestimonial);
  await writeDb(db);
  return newTestimonial;
}

export async function updateTestimonial(id: string, updated: Partial<Testimonial>) {
  const db = await getDb();
  const index = db.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;
  db.testimonials[index] = { ...db.testimonials[index], ...updated };
  await writeDb(db);
  return db.testimonials[index];
}

export async function deleteTestimonial(id: string) {
  const db = await getDb();
  const index = db.testimonials.findIndex((t) => t.id === id);
  if (index === -1) return false;
  db.testimonials.splice(index, 1);
  await writeDb(db);
  return true;
}

function lexicalNodeToMarkdown(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  const childrenText = Array.isArray(node.children)
    ? node.children.map(lexicalNodeToMarkdown).join("")
    : "";

  if (node.type === "heading") {
    const level = node.tag === "h1" ? "#" : node.tag === "h2" ? "##" : "###";
    return `\n\n${level} ${childrenText}\n\n`;
  }
  if (node.type === "paragraph") {
    return `\n\n${childrenText}\n\n`;
  }
  if (node.type === "listitem") {
    return `\n- ${childrenText}`;
  }
  return childrenText;
}

// Blog / Insights content is dynamically fetched from Payload CMS with fallback to repository data.
export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const { getPayloadClient } = await import("@/lib/payload");
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blogs",
      depth: 1,
      limit: 100,
    });

    if (Array.isArray(result.docs)) {
      // Filter out drafts: only published articles are public
      const publishedDocs = result.docs.filter(
        (doc: any) =>
          doc.articleStatus !== "draft" &&
          (doc.articleStatus === "published" || !doc.articleStatus)
      );

      return publishedDocs.map((doc: any) => {
        let imageUrl = doc.bannerImageUrl || "";
        if (doc.featuredImage && typeof doc.featuredImage === "object" && doc.featuredImage.url) {
          imageUrl = doc.featuredImage.url;
        }

        let content = doc.rawMarkdownContent || "";
        if (!content && doc.content?.root) {
          content = lexicalNodeToMarkdown(doc.content.root).trim();
        }

        let downloadableUrl: string | undefined = doc.resourceUrl || undefined;
        if (doc.downloadableFile && typeof doc.downloadableFile === "object" && doc.downloadableFile.url) {
          downloadableUrl = doc.downloadableFile.url;
        }

        return {
          id: String(doc.id),
          slug: doc.slug,
          title: doc.title,
          subtitle: doc.excerpt || "",
          excerpt: doc.excerpt || "",
          content: content || doc.excerpt || "",
          image: imageUrl || "gradient-amber-rose",
          date: doc.publishedDate
            ? new Date(doc.publishedDate).toISOString().split("T")[0]
            : doc.createdAt
            ? new Date(doc.createdAt).toISOString().split("T")[0]
            : new Date().toISOString().split("T")[0],
          readTime: doc.readTime || "5 min read",
          author: (doc.authorUser && typeof doc.authorUser === "object" && doc.authorUser.name) || doc.author || "Aratha Team",
          category: doc.category || "Market Intelligence",
          tags: doc.tags ? doc.tags.split(",").map((t: string) => t.trim()) : [],
          featured: true,
          status: "published" as const,
          resourceUrl: downloadableUrl,
          resourceName: doc.resourceName || undefined,
          resourceDescription: doc.resourceDescription || undefined,
          seoTitle: doc.seoTitle || doc.title,
          seoDescription: doc.seoDescription || doc.excerpt,
        };
      });
    }
  } catch (err) {
    console.warn("Payload CMS fetch error:", err);
  }

  // Fallback to local db ONLY if database connection fails entirely
  const db = await getDb();
  return (db.blogs || []).filter((b) => b.status === "published");
}

// Leads CRUD
export async function getLeads() {
  const db = await getDb();
  return db.leads;
}

export async function addLead(lead: Omit<Lead, "id" | "date" | "status">) {
  const db = await getDb();
  const newLead: Lead = {
    ...lead,
    id: `lead_${Date.now()}`,
    status: lead.type === "newsletter" ? "Subscribed" : "New",
    date: new Date().toISOString(),
  };
  db.leads.unshift(newLead);
  await writeDb(db);
  return newLead;
}

export async function updateLeadStatus(id: string, status: string) {
  const db = await getDb();
  const index = db.leads.findIndex((l) => l.id === id);
  if (index === -1) return null;
  db.leads[index].status = status;
  await writeDb(db);
  return db.leads[index];
}

// SEO Configurations
export async function getSeoConfigs() {
  const db = await getDb();
  return db.seo;
}

export async function updateSeoConfig(page: string, config: Partial<SeoConfig>) {
  const db = await getDb();
  if (!db.seo[page]) {
    db.seo[page] = { title: "", description: "", keywords: "" };
  }
  db.seo[page] = { ...db.seo[page], ...config };
  await writeDb(db);
  return db.seo[page];
}
