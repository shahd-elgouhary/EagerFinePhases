import { NextResponse } from "next/server";
import { storage } from "@/lib/storage";

export async function GET() {
  try {
    const stats = await storage.getGlobalStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("[GET /api/stats]", err);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
