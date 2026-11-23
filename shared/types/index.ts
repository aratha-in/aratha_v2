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
  primaryKeyword?: string;
  secondaryKeywords?: string;
  directAnswer?: string;
  keyTakeaways?: string;
  targetAudience?: string;
  faqs?: Array<{ question: string; answer: string }>;
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

export interface WorkshopCertificate {
  id: string;
  candidateName: string;
  certificateId: string;
  workshopTitle: string;
  issueDate: string;
  status: "valid" | "revoked";
  grade?: string;
  candidateEmail?: string;
  instructor?: string;
  workshopDuration?: string;
  skillsLearned?: string[];
  description?: string;
  certificateFileUrl?: string;
}

export interface DatabaseSchema {
  services: Service[];
  portfolio: PortfolioProject[];
  caseStudies: CaseStudy[];
  testimonials: Testimonial[];
  blogs: BlogPost[];
  leads: Lead[];
  certificates?: WorkshopCertificate[];
  seo: Record<string, SeoConfig>;
}
