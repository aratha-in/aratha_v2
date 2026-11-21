import { NextResponse } from "next/server";
import { addLead } from "@/lib/db";

export async function GET() {
  try {
    const { getPayloadClient } = await import("@/lib/payload");
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: "leads",
      sort: "-createdAt",
      limit: 100,
    });
    return NextResponse.json(result.docs);
  } catch (error) {
    console.error("Failed to load leads from Payload CMS:", error);
    const { getLeads } = await import("@/lib/db");
    const fallbackLeads = await getLeads();
    return NextResponse.json(fallbackLeads);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    let createdLeadDoc = null;

    try {
      const { getPayloadClient } = await import("@/lib/payload");
      const payload = await getPayloadClient();
      createdLeadDoc = await payload.create({
        collection: "leads",
        data: {
          name: body.name || "",
          email: body.email,
          phone: body.phone || "",
          type: body.type || "contact",
          status: "New",
          message: body.message || "",
        },
      });
    } catch (cmsErr) {
      console.warn("Payload CMS lead create warning:", cmsErr);
    }

    // Also sync local backup
    const localLead = await addLead(body);

    return NextResponse.json(createdLeadDoc || localLead, { status: 201 });
  } catch (error) {
    console.error("Failed to submit lead:", error);
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
      const { getPayloadClient } = await import("@/lib/payload");
      const payload = await getPayloadClient();
      const updated = await payload.update({
        collection: "leads",
        id,
        data: { status },
      });
      return NextResponse.json(updated);
    } catch (err) {
      console.warn("Payload CMS update lead fallback:", err);
    }

    const { updateLeadStatus } = await import("@/lib/db");
    const updatedLead = await updateLeadStatus(id, status);
    if (!updatedLead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
