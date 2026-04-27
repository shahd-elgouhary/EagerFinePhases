"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Play, Heart, MessageCircle, Share2, Flame, TrendingUp, MapPin, Users, TreePine, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const trendingPosts = [
  {
    id: 1,
    author: "Elena Marcas",
    avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    time: "2h ago",
    image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    tag: "Urban Garden",
    title: "Planted 50 native oaks in the Retiro buffer zone today.",
    body: "The soil was perfect after the morning rain. Special thanks to the local nursery for the saplings!",
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    author: "Carlos Ruiz",
    avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    time: "5h ago",
    image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    tag: "Reforestation",
    title: "2 years later, the burned hill is showing signs of life.",
    body: "Biodiversity is returning! We counted 12 new bird species this month alone.",
    likes: 89,
    comments: 31,
  },
];

const activeCampaigns = [
  { id: "coastal", title: "Coastal Reforestation Project", location: "Tulum, Mexico", percent: 72, volunteers: 148, image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png", badge: "Campaign Hub", badgeClass: "bg-[#4c7a5a1a] text-[#4c7a5a]" },
  { id: "mangrove", title: "Mangrove Sanctuary Revival", location: "Cancún, Mexico", percent: 45, volunteers: 92, image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png", badge: "Impact Site", badgeClass: "bg-red-50 text-red-500" },
  { id: "wetland", title: "Wetland Restoration Initiative", location: "Chetumal, Mexico", percent: 28, volunteers: 215, image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png", badge: "Impact Site", badgeClass: "bg-red-50 text-red-500" },
];

const mapStats = [
  { label: "Total Trees Planted", value: "7,202", icon: TreePine, color: "text-[#4c7a5a]" },
  { label: "Active Campaigns", value: "3", icon: Flame, color: "text-orange-500" },
  { label: "Volunteers Worldwide", value: "455", icon: Users, color: "text-blue-500" },
  { label: "Areas Restored (ha)", value: "14.3", icon: Leaf, color: "text-emerald-500" },
];

export default function HomePage() {
  const [sliderPos, setSliderPos] = useState(50);
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  return (
    <div className="min-h-screen bg-[#fdfbef]">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-screen-xl px-5 sm:px-8 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex flex-col gap-6 flex-1 max-w-lg">
            <div className="flex items-center gap-2 bg-[#4c7a5a1a] rounded-full px-3 py-1.5 w-fit">
              <Leaf className="h-3.5 w-3.5 text-[#4c7a5a]" />
              <span className="font-public-sans text-xs font-normal tracking-[0.6px] uppercase text-[#4c7a5a]">Real-time Impact Tracking</span>
            </div>
            <h1 className="font-cairo text-4xl sm:text-5xl font-normal leading-[1.15] tracking-[-0.5px] text-[#1a281e]">
              Nurturing Earth, one community at a time.
            </h1>
            <p className="font-public-sans text-base leading-7 text-stone-500">
              Join thousands of stewards transforming their local environments. See the direct impact of collective action in real-time.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="/map">
                <Button className="h-auto rounded-full bg-[#1a281e] px-7 py-4 font-cairo text-base text-white hover:bg-[#2e4535] transition-colors gap-2" data-testid="button-explore-map">
                  Explore the Map <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/campaigns">
                <Button variant="outline" className="h-auto rounded-full px-7 py-4 font-cairo text-base text-[#1a281e] hover:bg-stone-100 gap-2 border-stone-200" data-testid="button-view-campaigns">
                  <Play className="h-4 w-4" /> View Campaigns
                </Button>
              </Link>
            </div>
          </div>

          {/* Before/After Slider */}
          <div className="flex-1 w-full max-w-xl">
            <div
              className="relative h-72 sm:h-96 rounded-2xl overflow-hidden border border-stone-200 shadow-[0px_20px_50px_-10px_rgba(0,0,0,0.2)] cursor-ew-resize select-none"
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setSliderPos(Math.min(95, Math.max(5, ((e.clientX - rect.left) / rect.width) * 100)));
              }}
            >
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png)` }} />
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png)`, clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }} />
              <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg" style={{ left: `${sliderPos}%` }}>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-[0px_4px_12px_rgba(0,0,0,0.2)] flex items-center justify-center">
                  <svg className="h-4 w-4 text-stone-400" viewBox="0 0 16 16" fill="none">
                    <path d="M5 3L2 8l3 5M11 3l3 5-3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-md px-3 py-1"><span className="font-public-sans text-[10px] text-white uppercase tracking-wide">Before</span></div>
              <div className="absolute bottom-4 right-4 bg-[#4c7a5a]/80 backdrop-blur-sm rounded-md px-3 py-1"><span className="font-public-sans text-[10px] text-white uppercase tracking-wide">After</span></div>
            </div>
            <p className="text-center font-public-sans text-xs text-stone-400 mt-3">Drag to compare — Tulum Coastal Reforestation, 2022 vs 2024</p>
          </div>
        </div>
      </section>

      {/* ── 3-Column Activity Feed ── */}
      <section className="mx-auto max-w-screen-xl px-5 sm:px-8 pb-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-cairo text-3xl text-[#1a281e] leading-9">Community Activity</h2>
            <p className="font-public-sans text-sm text-stone-500 mt-1">Live updates from stewards around the world</p>
          </div>
          <Link href="/explore">
            <Button variant="ghost" className="text-[#4c7a5a] hover:text-[#4c7a5a] hover:bg-[#4c7a5a0d] font-public-sans text-sm gap-1">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trending Posts */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1"><Flame className="h-4 w-4 text-orange-500" /><h3 className="font-cairo text-lg text-[#1a281e]">Trending Posts</h3></div>
            {trendingPosts.map((post) => (
              <div key={post.id} className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_4px_16px_rgba(0,0,0,0.1)] transition-shadow" data-testid={`card-post-${post.id}`}>
                <div className="h-44 w-full bg-cover bg-center relative" style={{ backgroundImage: `url(${post.image})` }}>
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm rounded-md px-2.5 py-1"><span className="font-public-sans text-[10px] text-white">{post.tag}</span></div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8"><AvatarImage src={post.avatar} /><AvatarFallback>{post.author[0]}</AvatarFallback></Avatar>
                    <div><p className="font-public-sans text-sm font-medium text-[#1a281e]">{post.author}</p><p className="font-public-sans text-xs text-stone-400">{post.time}</p></div>
                  </div>
                  <h4 className="font-cairo text-base text-[#1a281e] mb-2 leading-snug">{post.title}</h4>
                  <p className="font-public-sans text-sm text-stone-500 leading-6 line-clamp-2">{post.body}</p>
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-stone-100">
                    <button onClick={() => setLikedPosts(prev => { const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })} className={`flex items-center gap-1.5 font-public-sans text-xs transition-colors ${likedPosts.has(post.id) ? "text-red-500" : "text-stone-400 hover:text-red-400"}`}>
                      <Heart className={`h-4 w-4 ${likedPosts.has(post.id) ? "fill-red-500" : ""}`} />{post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                    </button>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-1.5 font-public-sans text-xs text-stone-400 hover:text-stone-600"><MessageCircle className="h-4 w-4" />{post.comments}</button>
                      <button className="flex items-center gap-1.5 font-public-sans text-xs text-stone-400 hover:text-stone-600"><Share2 className="h-4 w-4" />Share</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Campaigns */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 mb-1"><TrendingUp className="h-4 w-4 text-[#4c7a5a]" /><h3 className="font-cairo text-lg text-[#1a281e]">Active Campaigns</h3></div>
            {activeCampaigns.map((c) => (
              <div key={c.id} className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_4px_16px_rgba(0,0,0,0.1)] transition-shadow" data-testid={`card-campaign-${c.id}`}>
                <div className="h-28 w-full bg-cover bg-center" style={{ backgroundImage: `url(${c.image})` }} />
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h4 className="font-cairo text-base text-[#1a281e] leading-snug">{c.title}</h4>
                    <Badge className={`shrink-0 rounded-full text-[10px] font-normal tracking-wide px-2 py-0.5 border-0 ${c.badgeClass}`}>{c.badge}</Badge>
                  </div>
                  <div className="flex items-center gap-1.5 mb-3"><MapPin className="h-3 w-3 text-stone-400" /><span className="font-public-sans text-xs text-stone-400">{c.location}</span></div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-public-sans text-xs text-stone-500">{c.percent}% complete</span>
                    <span className="font-public-sans text-xs text-stone-400 flex items-center gap-1"><Users className="h-3 w-3" />{c.volunteers}</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-[#4c7a5a] rounded-full" style={{ width: `${c.percent}%` }} /></div>
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
                <div key={stat.label} className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] p-4 flex flex-col gap-2 hover:shadow-[0px_4px_16px_rgba(0,0,0,0.1)] transition-shadow" data-testid={`card-stat-${stat.label.toLowerCase().replace(/ /g, "-")}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  <p className="font-cairo text-2xl text-[#1a281e]">{stat.value}</p>
                  <p className="font-public-sans text-xs text-stone-500 leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-[#1a281e] overflow-hidden shadow-[0px_8px_24px_rgba(0,0,0,0.15)] mt-2">
              <div className="h-36 bg-cover bg-center opacity-60" style={{ backgroundImage: `url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)` }} />
              <div className="p-5 -mt-2">
                <h4 className="font-cairo text-lg text-white mb-1">Explore the Live Map</h4>
                <p className="font-public-sans text-xs text-stone-400 mb-4">See real-time campaign activity across the globe.</p>
                <Link href="/map"><Button className="w-full h-auto rounded-xl bg-[#4c7a5a] py-2.5 font-public-sans text-sm text-white hover:bg-[#3a6349]">Open Map</Button></Link>
              </div>
            </div>
            <div className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] p-5">
              <p className="font-public-sans text-xs text-stone-400 uppercase tracking-widest mb-3">Recent Volunteer</p>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10 border-2 border-[#4c7a5a]"><AvatarImage src="/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png" /><AvatarFallback>E</AvatarFallback></Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-white" />
                </div>
                <div><p className="font-public-sans text-sm font-medium text-[#1a281e]">Elena Marcas</p><p className="font-public-sans text-xs text-stone-400">Joined Coastal Reforestation</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
