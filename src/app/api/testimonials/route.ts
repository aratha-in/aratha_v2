import { NextResponse } from "next/server";
import { getTestimonials, addTestimonial, updateTestimonial, deleteTestimonial } from "@/lib/db";
import { getPayloadClient } from "@/lib/payload";

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "testimonials",
      limit: 100,
    });
    if (result.docs && result.docs.length > 0) {
      return NextResponse.json(result.docs);
    }
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error) {
    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      const payload = await getPayloadClient();
      const doc = await payload.create({
        collection: "testimonials",
        data: {
          name: body.name || "Anonymous Client",
          role: body.role || "Client",
          company: body.company || "Company",
          content: body.content || "",
          rating: Number(body.rating) || 5,
        },
      });
      return NextResponse.json(doc, { status: 201 });
    } catch {
      const newTestimonial = await addTestimonial(body);
      return NextResponse.json(newTestimonial, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    const updated = await updateTestimonial(id, data);
    return NextResponse.json(updated || { id, ...data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update testimonial" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
    await deleteTestimonial(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete testimonial" }, { status: 500 });
  }
}
