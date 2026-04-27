"use client";

import Link from "next/link";
import { useState } from "react";
import { TrendingUp, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PostCard, type Post } from "@/components/PostCard";

const feedTabs = ["Trending", "Recent", "Following"] as const;
type FeedTab = typeof feedTabs[number];

const posts: Post[] = [
  { id: 1, author: "Elena Marcas", handle: "@elena.marcas", avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png", time: "2h ago", image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png", tag: "Reforestation", tagColor: "bg-[#4c7a5a1a] text-[#4c7a5a]", title: "Planted 50 native oaks in the Retiro buffer zone today.", body: "The soil was perfect after the morning rain. Special thanks to the local nursery for the saplings! This is our 3rd week on-site and the progress is incredible.", location: "Tulum, Mexico", likes: 124, comments: 18, campaign: "Coastal Reforestation Project", saved: false },
  { id: 2, author: "Carlos Ruiz", handle: "@carlos.ruiz", avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png", time: "5h ago", image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png", tag: "Wildlife", tagColor: "bg-orange-50 text-orange-500", title: "2 years later, the burned hill is showing signs of life.", body: "Biodiversity is returning! We counted 12 new bird species this month alone. The recovery is real and it's breathtaking to witness.", location: "Cancún, Mexico", likes: 89, comments: 31, campaign: "Mangrove Sanctuary Revival", saved: true },
  { id: 3, author: "Sofia Méndez", handle: "@sofia.mendez", avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png", time: "1d ago", image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png", tag: "Wetlands", tagColor: "bg-blue-50 text-blue-500", title: "Chetumal Bay restoration: Phase 2 complete.", body: "We've cleared 3 hectares of invasive species and replanted with native wetland flora. The team was amazing — 47 volunteers showed up on a Saturday!", location: "Chetumal, Mexico", likes: 203, comments: 45, campaign: "Wetland Restoration Initiative", saved: false },
  { id: 4, author: "Mateo Vega", handle: "@mateo.vega", avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png", time: "2d ago", image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png", tag: "Urban Garden", tagColor: "bg-purple-50 text-purple-500", title: "Urban rooftop garden turned community hub.", body: "Started with 12 raised beds. Now we have 80+ families growing their own food and our carbon offset score has tripled.", location: "Mexico City, Mexico", likes: 157, comments: 22, campaign: "Coastal Reforestation Project", saved: false },
];

export default function ExplorePage() {
  const [tab, setTab] = useState<FeedTab>("Trending");
  const [search, setSearch] = useState("");

  const filtered = posts.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.author.toLowerCase().includes(search.toLowerCase())
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
          {/* Feed */}
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
              {filtered.map((p) => <PostCard key={p.id} post={p} />)}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
            <div className="rounded-2xl border border-stone-100 bg-white shadow-sm p-5">
              <h3 className="font-cairo text-base text-[#1a281e] mb-4">Trending Tags</h3>
              <div className="flex flex-wrap gap-2">
                {["Reforestation", "Mangroves", "Urban Garden", "Wetlands", "Wildlife", "Biodiversity"].map((tag) => (
                  <button key={tag} className="font-public-sans text-xs bg-stone-100 hover:bg-[#4c7a5a1a] hover:text-[#4c7a5a] text-stone-600 rounded-full px-3 py-1.5 transition-colors">#{tag}</button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-[#1a281e] p-5 shadow-sm">
              <h3 className="font-cairo text-base text-white mb-2">Start a Campaign</h3>
              <p className="font-public-sans text-xs text-stone-400 mb-4">Have an area that needs restoration? Create a campaign and invite your community.</p>
              <Link href="/sign-up">
                <Button className="w-full h-auto py-2.5 rounded-xl bg-[#4c7a5a] font-public-sans text-sm text-white hover:bg-[#3a6349]">Create Campaign</Button>
              </Link>
            </div>
            <div className="rounded-2xl border border-stone-100 bg-white shadow-sm p-5">
              <h3 className="font-cairo text-base text-[#1a281e] mb-4">Active Stewards</h3>
              {[{ name: "Elena Marcas", posts: 12 }, { name: "Carlos Ruiz", posts: 8 }, { name: "Sofia Méndez", posts: 15 }].map((u) => (
                <div key={u.name} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8"><AvatarImage src="/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png" /><AvatarFallback>{u.name[0]}</AvatarFallback></Avatar>
                    <p className="font-public-sans text-sm text-[#1a281e]">{u.name}</p>
                  </div>
                  <span className="font-public-sans text-xs text-stone-400">{u.posts} posts</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
