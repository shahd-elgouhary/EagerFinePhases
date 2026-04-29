"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { TrendingUp, Clock, Search, Heart, MessageCircle, Share2, Bookmark, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";

const feedTabs = ["Trending", "Recent", "Following"] as const;
type FeedTab = typeof feedTabs[number];

function timeAgo(date: string | null) {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function ExplorePage() {
  const [tab, setTab] = useState<FeedTab>("Trending");
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState<any[]>([]);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const result = await api.likePost(postId);
      setLikedPosts((prev) => { const n = new Set(prev); result.liked ? n.add(postId) : n.delete(postId); return n; });
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, likes: result.count } : p));
    } catch {}
  };

  const handleSave = async (postId: string) => {
    try {
      const result = await api.savePost(postId);
      setSavedPosts((prev) => { const n = new Set(prev); result.saved ? n.add(postId) : n.delete(postId); return n; });
    } catch {}
  };

  const sortedPosts = [...posts].sort((a, b) =>
    tab === "Trending" ? (b.likes - a.likes) : (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  );

  const filtered = sortedPosts.filter((p) =>
    !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.author?.displayName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fdfbef]">
      <div className="border-b border-stone-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
          <h1 className="font-cairo text-4xl text-[#1a281e] mb-1">Explore</h1>
          <p className="font-public-sans text-sm text-stone-500">Stories and updates from the global steward community</p>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search posts, people, places..." className="h-10 pl-9 rounded-full border-stone-200 bg-white font-public-sans text-sm focus-visible:ring-[#4c7a5a]" data-testid="input-explore-search" />
              </div>
              <div className="flex items-center gap-1 bg-white rounded-full border border-stone-200 p-1">
                {feedTabs.map((t) => (
                  <button key={t} onClick={() => setTab(t)} className={`font-public-sans text-sm px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${tab === t ? "bg-[#1a281e] text-white" : "text-stone-500 hover:text-stone-700"}`} data-testid={`tab-${t.toLowerCase()}`}>
                    {t === "Trending" && <TrendingUp className="h-3.5 w-3.5" />}
                    {t === "Recent" && <Clock className="h-3.5 w-3.5" />}
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-5">
              {loading ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-2xl border border-stone-100 bg-white overflow-hidden animate-pulse"><div className="h-52 bg-stone-100" /><div className="p-6 flex flex-col gap-3"><div className="h-5 w-3/4 bg-stone-100 rounded" /><div className="h-3 w-full bg-stone-100 rounded" /></div></div>
              )) : filtered.map((post) => (
                <article key={post.id} className="rounded-2xl border border-stone-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-post-${post.id}`}>
                  <div className="relative">
                    <div className="h-52 w-full bg-cover bg-center" style={{ backgroundImage: `url(${post.imageUrl})` }} />
                    {post.tag && <Badge className="absolute top-3 left-3 rounded-full text-[10px] px-2.5 py-1 border-0 bg-black/50 text-white backdrop-blur-sm">{post.tag}</Badge>}
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9"><AvatarImage src={post.author?.avatarUrl ?? ""} /><AvatarFallback>{post.author?.displayName?.[0] ?? "U"}</AvatarFallback></Avatar>
                        <div><p className="font-public-sans text-sm font-medium text-[#1a281e]">{post.author?.displayName}</p><p className="font-public-sans text-xs text-stone-400">@{post.author?.username} · {timeAgo(post.createdAt)}</p></div>
                      </div>
                      {post.location && <div className="hidden sm:flex items-center gap-1.5 text-stone-400"><MapPin className="h-3 w-3" /><span className="font-public-sans text-xs">{post.location}</span></div>}
                    </div>
                    <h3 className="font-cairo text-xl text-[#1a281e] mb-2">{post.title}</h3>
                    <p className="font-public-sans text-sm text-stone-500 leading-6">{post.body}</p>
                    {post.campaignTitle && (
                      <div className="mt-3">
                        <Link href="/campaigns"><Badge className="rounded-full bg-[#4c7a5a1a] text-[#4c7a5a] font-public-sans text-xs px-2.5 py-1 border-0 cursor-pointer">{post.campaignTitle}</Badge></Link>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                      <div className="flex items-center gap-4">
                        <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 font-public-sans text-sm transition-colors ${likedPosts.has(post.id) ? "text-red-500" : "text-stone-400 hover:text-red-400"}`} data-testid={`button-like-${post.id}`}>
                          <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-red-500" : ""}`} />{post.likes}
                        </button>
                        <button className="flex items-center gap-1.5 font-public-sans text-sm text-stone-400"><MessageCircle className="h-4 w-4" />{post.comments}</button>
                        <button className="flex items-center gap-1.5 font-public-sans text-sm text-stone-400"><Share2 className="h-4 w-4" />Share</button>
                      </div>
                      <button onClick={() => handleSave(post.id)} className={`transition-colors ${savedPosts.has(post.id) ? "text-[#4c7a5a]" : "text-stone-400 hover:text-stone-600"}`} data-testid={`button-save-${post.id}`}>
                        <Bookmark className={`h-4 w-4 ${savedPosts.has(post.id) ? "fill-[#4c7a5a]" : ""}`} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
            <div className="rounded-2xl border border-stone-100 bg-white shadow-sm p-5">
              <h3 className="font-cairo text-base text-[#1a281e] mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Reforestation", "Mangroves", "Urban Garden", "Wetlands", "Wildlife", "Biodiversity"].map((tag) => (
                  <button key={tag} className="font-public-sans text-xs bg-stone-100 hover:bg-[#4c7a5a1a] hover:text-[#4c7a5a] text-stone-600 rounded-full px-3 py-1.5 transition-colors">#{tag}</button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#1a281e] p-5">
              <h3 className="font-cairo text-base text-white mb-2">Start a Campaign</h3>
              <p className="font-public-sans text-xs text-stone-400 mb-4">Have an area that needs restoration? Create a campaign and invite your community.</p>
              <Link href="/sign-up"><Button className="w-full h-auto py-2.5 rounded-xl bg-[#4c7a5a] font-public-sans text-sm text-white hover:bg-[#3a6349]">Create Campaign</Button></Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
