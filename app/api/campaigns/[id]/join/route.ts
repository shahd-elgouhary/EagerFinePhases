import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await storage.joinCampaign(session.userId, params.id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[POST /api/campaigns/:id/join]", err);
    return NextResponse.json({ error: "Failed to join" }, { status: 500 });
  }
}
