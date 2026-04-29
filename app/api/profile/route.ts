import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { storage } from "@/lib/storage";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [userPosts, userCampaigns, globalStats] = await Promise.all([
    storage.getUserPosts(user.id),
    storage.getUserCampaigns(user.id),
    storage.getGlobalStats(),
  ]);

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
      email: user.email,
      avatarUrl: user.avatarUrl,
      bio: user.bio,
      location: user.location,
      createdAt: user.createdAt,
    },
    posts: userPosts,
    campaigns: userCampaigns,
    stats: globalStats,
  });
}
