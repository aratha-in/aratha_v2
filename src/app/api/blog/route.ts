import { NextResponse } from "next/server";
import { getInsightPosts } from "@/lib/insights";

export async function GET() {
  try {
    return NextResponse.json(await getInsightPosts());
  } catch (error) {
    console.error("Failed to load blog records:", error);
    return NextResponse.json({ error: "Failed to load blog records" }, { status: 500 });
  }
}
