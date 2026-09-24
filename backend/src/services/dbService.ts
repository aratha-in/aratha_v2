import fs from "fs/promises";
import path from "path";
import {
  Service,
  PortfolioProject,
  Testimonial,
  BlogPost,
  Lead,
  SeoConfig,
  DatabaseSchema,
} from "../../../shared/types";

const getDbPath = () => {
  // Check root database/schema/db.json or src/data/db.json
  const schemaPath = path.join(process.cwd(), "database", "schema", "db.json");
  const fallbackPath = path.join(process.cwd(), "src", "data", "db.json");
  return fs.stat(schemaPath).then(() => schemaPath).catch(() => fallbackPath);
};

let cachedDb: DatabaseSchema | null = null;
let lastMtimeMs: number = 0;
let writeQueue: Promise<any> = Promise.resolve();

export async function getDb(): Promise<DatabaseSchema> {
  const filePath = await getDbPath();
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

export async function writeDb(data: DatabaseSchema): Promise<boolean> {
  const filePath = await getDbPath();
  const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).substring(2, 7)}.tmp`;

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

// Blogs CRUD
export async function getBlogs() {
  const db = await getDb();
  return db.blogs;
}

export async function addBlog(blog: Omit<BlogPost, "id" | "date">) {
  const db = await getDb();
  const newBlog: BlogPost = {
    ...blog,
    id: `blog_${Date.now()}`,
    date: new Date().toISOString().split("T")[0],
  };
  db.blogs.push(newBlog);
  await writeDb(db);
  return newBlog;
}

export async function updateBlog(id: string, updated: Partial<BlogPost>) {
  const db = await getDb();
  const index = db.blogs.findIndex((b) => b.id === id);
  if (index === -1) return null;
  db.blogs[index] = { ...db.blogs[index], ...updated };
  await writeDb(db);
  return db.blogs[index];
}

export async function deleteBlog(id: string) {
  const db = await getDb();
  const index = db.blogs.findIndex((b) => b.id === id);
  if (index === -1) return false;
  db.blogs.splice(index, 1);
  await writeDb(db);
  return true;
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
