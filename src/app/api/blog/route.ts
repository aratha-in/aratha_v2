import { NextResponse } from "next/server";
import { getBlogs, addBlog, updateBlog, deleteBlog } from "@/lib/db";
import { getPayloadClient } from "@/lib/payload";

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "blogs",
      limit: 100,
    });
    if (result.docs && result.docs.length > 0) {
      return NextResponse.json(result.docs);
    }
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  } catch (error) {
    const blogs = await getBlogs();
    return NextResponse.json(blogs);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      const payload = await getPayloadClient();
      const doc = await payload.create({
        collection: "blogs",
        data: {
          title: body.title || "New Blog Post",
          slug: body.slug || `blog-${Date.now()}`,
          author: body.author || "Aratha Team",
          category: body.category || "Market Intelligence",
          excerpt: body.excerpt || "",
        },
      });
      return NextResponse.json(doc, { status: 201 });
    } catch {
      const newBlog = await addBlog(body);
      return NextResponse.json(newBlog, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updated = await updateBlog(id, data);
    return NextResponse.json(updated || { id, ...data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await deleteBlog(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog" }, { status: 500 });
  }
}
