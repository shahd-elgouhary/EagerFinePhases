import { eq, desc, sql } from "drizzle-orm";
import { db } from "./db";
import {
  users, campaigns, posts, postLikes, postSaves, campaignMembers,
  type User, type InsertUser, type Campaign, type InsertCampaign,
  type Post, type InsertPost,
} from "@/shared/schema";
import bcrypt from "bcryptjs";

export type PostWithAuthor = Post & {
  author: Pick<User, "id" | "username" | "displayName" | "avatarUrl">;
  campaignTitle: string | null;
  isLiked?: boolean;
  isSaved?: boolean;
};

export type CampaignWithStats = Campaign & {
  goalPercent: number;
};

export const storage = {
  // ── Users ──────────────────────────────────────────
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  },

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  },

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  },

  async createUser(data: InsertUser): Promise<User> {
    const hashed = await bcrypt.hash(data.password, 12);
    const [user] = await db
      .insert(users)
      .values({ ...data, password: hashed })
      .returning();
    return user;
  },

  async verifyPassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  },

  // ── Campaigns ──────────────────────────────────────
  async getCampaigns(): Promise<CampaignWithStats[]> {
    const rows = await db.select().from(campaigns).orderBy(desc(campaigns.createdAt));
    return rows.map((c) => ({
      ...c,
      goalPercent: c.treesGoal > 0 ? Math.round((c.treesPlanted / c.treesGoal) * 100) : 0,
    }));
  },

  async getCampaignBySlug(slug: string): Promise<CampaignWithStats | undefined> {
    const [c] = await db.select().from(campaigns).where(eq(campaigns.slug, slug));
    if (!c) return undefined;
    return { ...c, goalPercent: c.treesGoal > 0 ? Math.round((c.treesPlanted / c.treesGoal) * 100) : 0 };
  },

  async getCampaignById(id: string): Promise<CampaignWithStats | undefined> {
    const [c] = await db.select().from(campaigns).where(eq(campaigns.id, id));
    if (!c) return undefined;
    return { ...c, goalPercent: c.treesGoal > 0 ? Math.round((c.treesPlanted / c.treesGoal) * 100) : 0 };
  },

  async createCampaign(data: InsertCampaign): Promise<Campaign> {
    const [campaign] = await db.insert(campaigns).values(data).returning();
    return campaign;
  },

  async joinCampaign(userId: string, campaignId: string): Promise<void> {
    await db
      .insert(campaignMembers)
      .values({ userId, campaignId })
      .onConflictDoNothing();
    await db.update(campaigns)
      .set({ volunteers: sql`${campaigns.volunteers} + 1` })
      .where(eq(campaigns.id, campaignId));
  },

  // ── Posts ──────────────────────────────────────────
  async getPosts(userId?: string): Promise<PostWithAuthor[]> {
    const rows = await db
      .select({
        post: posts,
        author: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatarUrl: users.avatarUrl,
        },
        campaignTitle: campaigns.title,
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .leftJoin(campaigns, eq(posts.campaignId, campaigns.id))
      .orderBy(desc(posts.createdAt));

    const result: PostWithAuthor[] = [];
    for (const row of rows) {
      let isLiked = false;
      let isSaved = false;
      if (userId) {
        const [like] = await db
          .select()
          .from(postLikes)
          .where(eq(postLikes.userId, userId))
          .limit(1);
        const [save] = await db
          .select()
          .from(postSaves)
          .where(eq(postSaves.userId, userId))
          .limit(1);
        isLiked = !!like;
        isSaved = !!save;
      }
      result.push({ ...row.post, author: row.author, campaignTitle: row.campaignTitle ?? null, isLiked, isSaved });
    }
    return result;
  },

  async getPost(id: string): Promise<PostWithAuthor | undefined> {
    const [row] = await db
      .select({
        post: posts,
        author: {
          id: users.id,
          username: users.username,
          displayName: users.displayName,
          avatarUrl: users.avatarUrl,
        },
        campaignTitle: campaigns.title,
      })
      .from(posts)
      .innerJoin(users, eq(posts.authorId, users.id))
      .leftJoin(campaigns, eq(posts.campaignId, campaigns.id))
      .where(eq(posts.id, id));
    if (!row) return undefined;
    return { ...row.post, author: row.author, campaignTitle: row.campaignTitle ?? null };
  },

  async createPost(data: InsertPost): Promise<Post> {
    const [post] = await db.insert(posts).values(data).returning();
    return post;
  },

  async likePost(userId: string, postId: string): Promise<{ liked: boolean; count: number }> {
    const [existing] = await db
      .select()
      .from(postLikes)
      .where(eq(postLikes.postId, postId));

    if (existing) {
      await db.delete(postLikes).where(eq(postLikes.postId, postId));
      const [updated] = await db
        .update(posts)
        .set({ likes: sql`GREATEST(${posts.likes} - 1, 0)` })
        .where(eq(posts.id, postId))
        .returning();
      return { liked: false, count: updated.likes };
    } else {
      await db.insert(postLikes).values({ userId, postId }).onConflictDoNothing();
      const [updated] = await db
        .update(posts)
        .set({ likes: sql`${posts.likes} + 1` })
        .where(eq(posts.id, postId))
        .returning();
      return { liked: true, count: updated.likes };
    }
  },

  async savePost(userId: string, postId: string): Promise<{ saved: boolean }> {
    const [existing] = await db
      .select()
      .from(postSaves)
      .where(eq(postSaves.postId, postId));

    if (existing) {
      await db.delete(postSaves).where(eq(postSaves.postId, postId));
      return { saved: false };
    } else {
      await db.insert(postSaves).values({ userId, postId }).onConflictDoNothing();
      return { saved: true };
    }
  },

  async getUserPosts(authorId: string): Promise<Post[]> {
    return db.select().from(posts).where(eq(posts.authorId, authorId)).orderBy(desc(posts.createdAt));
  },

  async getUserCampaigns(userId: string): Promise<CampaignWithStats[]> {
    const rows = await db
      .select({ campaign: campaigns })
      .from(campaignMembers)
      .innerJoin(campaigns, eq(campaignMembers.campaignId, campaigns.id))
      .where(eq(campaignMembers.userId, userId));
    return rows.map(({ campaign: c }) => ({
      ...c,
      goalPercent: c.treesGoal > 0 ? Math.round((c.treesPlanted / c.treesGoal) * 100) : 0,
    }));
  },

  // ── Stats ──────────────────────────────────────────
  async getGlobalStats() {
    const [treeRow] = await db.select({ total: sql<number>`SUM(trees_planted)` }).from(campaigns);
    const [volRow] = await db.select({ total: sql<number>`SUM(volunteers)` }).from(campaigns);
    const [campCount] = await db.select({ count: sql<number>`COUNT(*)` }).from(campaigns);
    return {
      treesPlanted: Number(treeRow?.total ?? 0),
      volunteers: Number(volRow?.total ?? 0),
      campaigns: Number(campCount?.count ?? 0),
    };
  },
};
