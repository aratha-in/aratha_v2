import { NextResponse } from "next/server";
import { getLeads, addLead, updateLeadStatus } from "@/lib/db";
import { getPayloadClient } from "@/lib/payload";

export async function GET() {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "leads",
      limit: 100,
      sort: "-createdAt",
    });
    if (result.docs && result.docs.length > 0) {
      return NextResponse.json(result.docs);
    }
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    const leads = await getLeads();
    return NextResponse.json(leads);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    try {
      const payload = await getPayloadClient();
      const newLeadDoc = await payload.create({
        collection: "leads",
        data: {
          name: body.name || "Anonymous",
          email: body.email,
          phone: body.phone || "",
          type: body.type === "newsletter" ? "contact" : body.type || "contact",
          status: "New",
          message: body.message || (body.type === "newsletter" ? "Newsletter subscription" : ""),
        },
      });
      return NextResponse.json(newLeadDoc, { status: 201 });
    } catch {
      const newLead = await addLead(body);
      return NextResponse.json(newLead, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit lead" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ error: "Lead ID and status are required" }, { status: 400 });
    }

    try {
      const payload = await getPayloadClient();
      const updated = await payload.update({
        collection: "leads",
        id: id,
        data: { status },
      });
      return NextResponse.json(updated);
    } catch {
      const updatedLead = await updateLeadStatus(id, status);
      return NextResponse.json(updatedLead);
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
