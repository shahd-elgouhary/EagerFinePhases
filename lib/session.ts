import { cookies } from "next/headers";
import { db } from "./db";
import { users } from "@/shared/schema";
import { eq } from "drizzle-orm";
import type { User } from "@/shared/schema";

const SESSION_COOKIE = "econova_session";

export async function getSession(): Promise<{ userId: string } | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(SESSION_COOKIE)?.value;
  if (!value) return null;
  try {
    const decoded = Buffer.from(value, "base64").toString("utf-8");
    const parsed = JSON.parse(decoded);
    if (typeof parsed.userId !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function makeSessionCookie(userId: string): string {
  return Buffer.from(JSON.stringify({ userId })).toString("base64");
}

export const SESSION_COOKIE_NAME = SESSION_COOKIE;

export async function getCurrentUser(): Promise<User | null> {
  const session = await getSession();
  if (!session) return null;
  const [user] = await db.select().from(users).where(eq(users.id, session.userId));
  return user ?? null;
}
