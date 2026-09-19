import { NextResponse } from "next/server";
import { getSeoConfigs, updateSeoConfig } from "@/lib/db";

export async function GET() {
  try {
    const seo = await getSeoConfigs();
    return NextResponse.json(seo);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch SEO configs" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { page, title, description, keywords } = body;
    if (!page) {
      return NextResponse.json({ error: "Page identifier is required" }, { status: 400 });
    }
    const updated = await updateSeoConfig(page, { title, description, keywords });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update SEO config" }, { status: 500 });
  }
}
