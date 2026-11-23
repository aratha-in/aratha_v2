import { NextResponse } from "next/server";
import { getCertificates, getCertificateById } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const query = searchParams.get("q");

    if (id) {
      const certificate = await getCertificateById(id);
      if (!certificate) {
        return NextResponse.json({ error: "Certificate not found" }, { status: 404 });
      }
      return NextResponse.json(certificate);
    }

    const certificates = await getCertificates(query || undefined);
    return NextResponse.json(certificates);
  } catch (error) {
    console.error("Failed to fetch certificates:", error);
    return NextResponse.json({ error: "Failed to fetch certificates" }, { status: 500 });
  }
}
