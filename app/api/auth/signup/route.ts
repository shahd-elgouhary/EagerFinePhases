import { NextRequest, NextResponse } from "next/server";
import { storage } from "@/lib/storage";
import { insertUserSchema } from "@/shared/schema";
import { makeSessionCookie, SESSION_COOKIE_NAME } from "@/lib/session";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = insertUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const existing = await storage.getUserByEmail(parsed.data.email);
    if (existing) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    const existingUsername = await storage.getUserByUsername(parsed.data.username);
    if (existingUsername) {
      return NextResponse.json({ error: "Username already taken" }, { status: 409 });
    }

    const user = await storage.createUser(parsed.data);
    const sessionValue = makeSessionCookie(user.id);

    const res = NextResponse.json({
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatarUrl: user.avatarUrl,
    });
    res.cookies.set(SESSION_COOKIE_NAME, sessionValue, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30,
    });
    return res;
  } catch (err) {
    console.error("[POST /api/auth/signup]", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
