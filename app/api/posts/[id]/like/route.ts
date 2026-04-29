import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { getSession } from "@/lib/session";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const result = await storage.likePost(session.userId, params.id);
    return NextResponse.json(result);
  } catch (err) {
    console.error("[POST /api/posts/:id/like]", err);
    return NextResponse.json({ error: "Failed to toggle like" }, { status: 500 });
  }
}
