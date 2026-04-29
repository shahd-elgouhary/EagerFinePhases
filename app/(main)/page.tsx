"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowRight, Play, Heart, MessageCircle, Share2, Flame, TrendingUp, MapPin, Users, TreePine, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { api } from "@/lib/api";

function timeAgo(date: string | null) {
  if (!date) return "";
  const diff = Date.now() - new Date(date).getTime();
  const h = Math.floor(diff / 3600000);
  if (h < 1) return "just now";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function HomePage() {
  const [sliderPos, setSliderPos] = useState(50);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [posts, setPosts] = useState<any[]>([]);
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [stats, setStats] = useState({ treesPlanted: 0, volunteers: 0, campaigns: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getPosts(), api.getCampaigns(), api.getStats()])
      .then(([p, c, s]) => { setPosts(p.slice(0, 2)); setCampaigns(c); setStats(s); })
      .finally(() => setLoading(false));
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const result = await api.likePost(postId);
      setLikedPosts((prev) => { const n = new Set(prev); result.liked ? n.add(postId) : n.delete(postId); return n; });
      setPosts((prev) => prev.map((p) => p.id === postId ? { ...p, likes: result.count } : p));
    } catch {}
  };

  const mapStats = [
    { label: "Total Trees Planted", value: stats.treesPlanted.toLocaleString(), icon: TreePine, color: "text-[#4c7a5a]" },
    { label: "Active Campaigns", value: String(stats.campaigns), icon: Flame, color: "text-orange-500" },
    { label: "Volunteers Worldwide", value: stats.volunteers.toLocaleString(), icon: Users, color: "text-blue-500" },
    { label: "Areas Restored (ha)", value: "14.3", icon: Leaf, color: "text-emerald-500" },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbef]">
      <section className="mx-auto max-w-screen-xl px-5 sm:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 flex-1 max-w-lg">
            <div className="flex items-center gap-2 bg-[#4c7a5a1a] rounded-full px-3 py-1.5 w-fit">
              <Leaf className="h-3.5 w-3.5 text-[#4c7a5a]" />
              <span className="font-public-sans text-xs uppercase tracking-[0.6px] text-[#4c7a5a]">Real-time Impact Tracking</span>
            </div>
            <h1 className="font-cairo text-4xl sm:text-5xl font-normal leading-[1.15] tracking-[-0.5px] text-[#1a281e]">Nurturing Earth, one community at a time.</h1>
            <p className="font-public-sans text-base leading-7 text-stone-500">Join thousands of stewards transforming their local environments. See the direct impact of collective action in real-time.</p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/map"><Button className="h-auto rounded-full bg-[#1a281e] px-7 py-4 font-cairo text-base text-white hover:bg-[#2e4535] gap-2" data-testid="button-explore-map">Explore the Map <ArrowRight className="h-4 w-4" /></Button></Link>
              <Link href="/campaigns"><Button variant="outline" className="h-auto rounded-full px-7 py-4 font-cairo text-base text-[#1a281e] hover:bg-stone-100 gap-2 border-stone-200" data-testid="button-view-campaigns"><Play className="h-4 w-4" /> View Campaigns</Button></Link>
            </div>
          </div>
          <div className="flex-1 w-full max-w-xl">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-stone-200 shadow-[0px_20px_50px_-10px_rgba(0,0,0,0.2)] cursor-ew-resize select-none"
              onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setSliderPos(Math.min(95, Math.max(5, ((e.clientX - r.left) / r.width) * 100))); }}>
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png)` }} />
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png)`, clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} />
              <div className="absolute top-0 bottom-0 w-0.5 bg-white" style={{ left: `${sliderPos}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <svg className="h-4 w-4 text-stone-400" viewBox="0 0 16 16" fill="none"><path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-md px-3 py-1"><span className="font-public-sans text-[10px] text-white uppercase">Before</span></div>
              <div className="absolute bottom-4 right-4 bg-[#4c7a5a]/80 backdrop-blur-sm rounded-md px-3 py-1"><span className="font-public-sans text-[10px] text-white uppercase">After</span></div>
            </div>
            <p className="text-center font-public-sans text-xs text-stone-400 mt-3">Drag to compare — Tulum Coastal Reforestation, 2022 vs 2024</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-screen-xl px-5 sm:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div><h2 className="font-cairo text-3xl text-[#1a281e]">Community Activity</h2><p className="font-public-sans text-sm text-stone-500 mt-1">Live updates from stewards around the world</p></div>
          <Link href="/explore"><Button variant="ghost" className="text-[#4c7a5a] hover:bg-[#4c7a5a0d] font-public-sans text-sm gap-1">See all <ArrowRight className="h-3.5 w-3.5" /></Button></Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Posts */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1"><Flame className="h-4 w-4 text-orange-500" /><h3 className="font-cairo text-lg text-[#1a281e]">Trending Posts</h3></div>
            {loading ? Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-stone-100 bg-white overflow-hidden animate-pulse"><div className="h-44 bg-stone-100" /><div className="p-5 flex flex-col gap-3"><div className="h-4 w-3/4 bg-stone-100 rounded" /></div></div>
            )) : posts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-stone-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-post-${post.id}`}>
                <div className="h-44 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${post.imageUrl})` }}>
                  {post.tag && <div className="absolute top-3 right-3 bg-black/50 rounded-md px-2.5 py-1"><span className="font-public-sans text-[10px] text-white">{post.tag}</span></div>}
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8"><AvatarImage src={post.author?.avatarUrl ?? ""} /><AvatarFallback>{post.author?.displayName?.[0] ?? "U"}</AvatarFallback></Avatar>
                    <div><p className="font-public-sans text-sm font-medium text-[#1a281e]">{post.author?.displayName}</p><p className="font-public-sans text-xs text-stone-400">{timeAgo(post.createdAt)}</p></div>
                  </div>
                  <h4 className="font-cairo text-base text-[#1a281e] mb-2">{post.title}</h4>
                  <p className="font-public-sans text-sm text-stone-500 line-clamp-2">{post.body}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
                    <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1.5 text-xs font-public-sans transition-colors ${likedPosts.has(post.id) ? "text-red-500" : "text-stone-400 hover:text-red-400"}`} data-testid={`button-like-${post.id}`}>
                      <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-red-500" : ""}`} />{post.likes}
                    </button>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1.5 text-xs font-public-sans text-stone-400"><MessageCircle className="h-4 w-4" />{post.comments}</span>
                      <span className="flex items-center gap-1.5 text-xs font-public-sans text-stone-400"><Share2 className="h-4 w-4" />Share</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Campaigns */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-[#4c7a5a]" /><h3 className="font-cairo text-lg text-[#1a281e]">Active Campaigns</h3></div>
            {loading ? Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-2xl border border-stone-100 bg-white overflow-hidden animate-pulse"><div className="h-28 bg-stone-100" /><div className="p-4"><div className="h-4 w-3/4 bg-stone-100 rounded" /></div></div>
            )) : campaigns.map((c) => (
              <div key={c.id} className="rounded-2xl border border-stone-100 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow" data-testid={`card-campaign-${c.slug}`}>
                <div className="h-28 w-full bg-cover bg-center" style={{ backgroundImage: `url(${c.progressImage})` }} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-cairo text-base text-[#1a281e]">{c.title}</h4>
                    <Badge className={`shrink-0 rounded-full text-[10px] px-2 py-0.5 border-0 ${c.type === "campaign-hub" ? "bg-[#4c7a5a1a] text-[#4c7a5a]" : "bg-red-50 text-red-500"}`}>{c.type === "campaign-hub" ? "Campaign Hub" : "Impact Site"}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mb-2"><MapPin className="h-3 w-3 text-stone-400" /><span className="font-public-sans text-xs text-stone-400">{c.location}</span></div>
                  <div className="flex justify-between mb-1.5"><span className="font-public-sans text-xs text-stone-500">{c.goalPercent}% complete</span><span className="font-public-sans text-xs text-stone-400 flex items-center gap-1"><Users className="h-3 w-3" />{c.volunteers}</span></div>
                  <div className="h-2 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-[#4c7a5a] rounded-full" style={{ width: `${c.goalPercent}%` }} /></div>
                  <Link href="/map"><Button variant="ghost" size="sm" className="mt-3 w-full h-auto py-2 rounded-lg text-[#4c7a5a] hover:bg-[#4c7a5a0d] font-public-sans text-xs">View on Map →</Button></Link>
                </div>
              </div>
            ))}
          </div>

          {/* Global Impact */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1"><MapPin className="h-4 w-4 text-blue-500" /><h3 className="font-cairo text-lg text-[#1a281e]">Global Impact</h3></div>
            <div className="grid grid-cols-2 gap-3">
              {mapStats.map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-stone-100 bg-white shadow-sm p-4 flex flex-col gap-2">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <p className="font-cairo text-2xl text-[#1a281e]">{stat.value}</p>
                  <p className="font-public-sans text-xs text-stone-500">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-[#1a281e] overflow-hidden shadow-lg mt-2">
              <div className="h-36 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)` }} />
              <div className="p-5 -mt-2">
                <h4 className="font-cairo text-lg text-white mb-1">Explore the Live Map</h4>
                <p className="font-public-sans text-xs text-stone-400 mb-4">See real-time campaign activity across the globe.</p>
                <Link href="/map"><Button className="w-full h-auto rounded-xl bg-[#4c7a5a] py-2.5 font-public-sans text-sm text-white hover:bg-[#3a6349]">Open Map</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
