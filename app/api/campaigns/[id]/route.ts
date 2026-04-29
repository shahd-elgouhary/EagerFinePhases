import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const campaign = await storage.getCampaignBySlug(params.id)
      ?? await storage.getCampaignById(params.id);
    if (!campaign) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(campaign);
  } catch (err) {
    console.error("[GET /api/campaigns/:id]", err);
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 });
  }
}
