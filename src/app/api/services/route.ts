import { NextResponse } from "next/server";
import { getServices, addService, updateService, deleteService } from "@/lib/db";
import { getPayloadClient } from "@/lib/payload";

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "services",
      limit: 100,
    });
    if (result.docs && result.docs.length > 0) {
      return NextResponse.json(result.docs);
    }
    const services = await getServices();
    return NextResponse.json(services);
  } catch (error) {
    const services = await getServices();
    return NextResponse.json(services);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    try {
      const payload = await getPayloadClient();
      const doc = await payload.create({
        collection: "services",
        data: {
          title: body.title || "New Service",
          slug: body.slug || (body.title ? body.title.toLowerCase().replace(/\s+/g, '-') : `service-${Date.now()}`),
          tagline: body.tagline || "",
          description: body.description || "",
          pricing: body.pricing || "Custom Quote",
          iconName: body.iconName || "ShieldCheck",
        },
      });
      return NextResponse.json(doc, { status: 201 });
    } catch {
      const newService = await addService(body);
      return NextResponse.json(newService, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...data } = body;
    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }
    const updated = await updateService(id, data);
    return NextResponse.json(updated || { id, ...data });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update service" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "Service ID is required" }, { status: 400 });
    }
    const success = await deleteService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete service" }, { status: 500 });
  }
}
