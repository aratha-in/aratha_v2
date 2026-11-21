import { NextResponse } from "next/server";
import { getLeads, addLead, updateLeadStatus } from "@/lib/db";

export async function GET() {
  try {
    const leads = await getLeads();
    return NextResponse.json(leads);
  } catch (error) {
    console.error("Failed to load leads:", error);
    return NextResponse.json({ error: "Failed to fetch leads" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const newLead = await addLead(body);
    return NextResponse.json(newLead, { status: 201 });
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

    const updatedLead = await updateLeadStatus(id, status);
    if (!updatedLead) return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    return NextResponse.json(updatedLead);
  } catch (error) {
    console.error("Failed to update lead:", error);
    return NextResponse.json({ error: "Failed to update lead" }, { status: 500 });
  }
}
