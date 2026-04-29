import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertPostSchema } from "@/shared/schema";
import { getSession } from "@/lib/session";

export async function GET(req: NextRequest) {
  try {
    const session = await getSession();
    const posts = await storage.getPosts(session?.userId);
    return NextResponse.json(posts);
  } catch (err) {
    console.error("[GET /api/posts]", err);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const parsed = insertPostSchema.safeParse({ ...body, authorId: session.userId });
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }
    const post = await storage.createPost(parsed.data);
    return NextResponse.json(post, { status: 201 });
  } catch (err) {
    console.error("[POST /api/posts]", err);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
