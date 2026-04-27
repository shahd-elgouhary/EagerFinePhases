import { useState } from "react";
import { Link } from "wouter";
import { Heart, MessageCircle, Share2, Bookmark, TrendingUp, Clock, MapPin, Search, Filter } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const feedTabs = ["Trending", "Recent", "Following"] as const;
type FeedTab = typeof feedTabs[number];

const posts = [
  {
    id: 1,
    author: "Elena Marcas",
    handle: "@elena.marcas",
    avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    time: "2h ago",
    image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    tag: "Reforestation",
    tagColor: "bg-[#4c7a5a1a] text-[#4c7a5a]",
    title: "Planted 50 native oaks in the Retiro buffer zone today.",
    body: "The soil was perfect after the morning rain. Special thanks to the local nursery for the saplings! This is our 3rd week on-site and the progress is incredible.",
    location: "Tulum, Mexico",
    likes: 124,
    comments: 18,
    saved: false,
    campaign: "Coastal Reforestation Project",
  },
  {
    id: 2,
    author: "Carlos Ruiz",
    handle: "@carlos.ruiz",
    avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    time: "5h ago",
    image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    tag: "Wildlife",
    tagColor: "bg-orange-50 text-orange-500",
    title: "2 years later, the burned hill is showing signs of life.",
    body: "Biodiversity is returning! We counted 12 new bird species this month alone. The recovery is real and it's breathtaking to witness.",
    location: "Cancún, Mexico",
    likes: 89,
    comments: 31,
    saved: true,
    campaign: "Mangrove Sanctuary Revival",
  },
  {
    id: 3,
    author: "Sofia Méndez",
    handle: "@sofia.mendez",
    avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    time: "1d ago",
    image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    tag: "Wetlands",
    tagColor: "bg-blue-50 text-blue-500",
    title: "Chetumal Bay restoration: Phase 2 complete.",
    body: "We've cleared 3 hectares of invasive species and replanted with native wetland flora. The team was amazing — 47 volunteers showed up on a Saturday!",
    location: "Chetumal, Mexico",
    likes: 203,
    comments: 45,
    saved: false,
    campaign: "Wetland Restoration Initiative",
  },
  {
    id: 4,
    author: "Mateo Vega",
    handle: "@mateo.vega",
    avatar: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    time: "2d ago",
    image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    tag: "Urban Garden",
    tagColor: "bg-purple-50 text-purple-500",
    title: "Urban rooftop garden turned community hub.",
    body: "Started with 12 raised beds. Now we have 80+ families growing their own food and our carbon offset score has tripled.",
    location: "Mexico City, Mexico",
    likes: 157,
    comments: 22,
    saved: false,
    campaign: "Coastal Reforestation Project",
  },
];

export const ExplorePage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<FeedTab>("Trending");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [saved, setSaved] = useState<Set<number>>(new Set(posts.filter(p => p.saved).map(p => p.id)));
  const [search, setSearch] = useState("");

  const toggleLike = (id: number) =>
    setLiked((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const toggleSave = (id: number) =>
    setSaved((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = posts.filter(p =>
    !search ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.author.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#fdfbef]">
      {/* Header */}
      <div className="border-b border-stone-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
          <h1 className="[font-family:'Cairo',Helvetica] text-4xl font-normal text-[#1a281e] mb-1">Explore</h1>
          <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-500">
            Stories and updates from the global steward community
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Feed */}
          <div className="flex-1 min-w-0">
            {/* Search + tabs */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search posts, people, places..."
                  className="h-10 pl-9 rounded-full border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm focus-visible:ring-[#4c7a5a]"
                  data-testid="input-explore-search"
                />
              </div>
              <div className="flex items-center gap-1 bg-white rounded-full border border-stone-200 p-1">
                {feedTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`[font-family:'Public_Sans',Helvetica] text-sm px-4 py-1.5 rounded-full transition-all ${
                      activeTab === tab
                        ? "bg-[#1a281e] text-white"
                        : "text-stone-500 hover:text-stone-700"
                    }`}
                    data-testid={`tab-${tab.toLowerCase()}`}
                  >
                    {tab === "Trending" && <TrendingUp className="inline h-3.5 w-3.5 mr-1.5" />}
                    {tab === "Recent" && <Clock className="inline h-3.5 w-3.5 mr-1.5" />}
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Posts */}
            <div className="flex flex-col gap-5">
              {filtered.map((post) => (
                <Card key={post.id}
                  className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_4px_16px_rgba(0,0,0,0.08)] transition-shadow"
                  data-testid={`card-post-${post.id}`}
                >
                  <div className="relative">
                    <div
                      className="h-52 w-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${post.image})` }}
                    />
                    <Badge className={`absolute top-3 left-3 rounded-full text-[10px] font-normal px-2.5 py-1 ${post.tagColor} hover:${post.tagColor}`}>
                      {post.tag}
                    </Badge>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={post.avatar} />
                          <AvatarFallback>{post.author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="[font-family:'Public_Sans',Helvetica] text-sm font-medium text-[#1a281e]">{post.author}</p>
                          <p className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400">{post.handle} · {post.time}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-stone-400">
                        <MapPin className="h-3 w-3" />
                        <span className="[font-family:'Public_Sans',Helvetica] text-xs">{post.location}</span>
                      </div>
                    </div>

                    <h3 className="[font-family:'Cairo',Helvetica] text-xl font-normal text-[#1a281e] mb-2">{post.title}</h3>
                    <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-500 leading-6">{post.body}</p>

                    <div className="flex items-center gap-2 mt-3">
                      <Link href="/campaigns">
                        <Badge className="rounded-full bg-[#4c7a5a1a] text-[#4c7a5a] hover:bg-[#4c7a5a1a] [font-family:'Public_Sans',Helvetica] text-xs font-normal px-2.5 py-1 cursor-pointer">
                          {post.campaign}
                        </Badge>
                      </Link>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-100">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => toggleLike(post.id)}
                          className={`flex items-center gap-1.5 [font-family:'Public_Sans',Helvetica] text-sm transition-colors ${liked.has(post.id) ? "text-red-500" : "text-stone-400 hover:text-red-400"}`}
                          data-testid={`button-like-${post.id}`}
                        >
                          <Heart className={`h-4 w-4 ${liked.has(post.id) ? "fill-red-500" : ""}`} />
                          {post.likes + (liked.has(post.id) ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-1.5 [font-family:'Public_Sans',Helvetica] text-sm text-stone-400 hover:text-stone-600 transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          {post.comments}
                        </button>
                        <button className="flex items-center gap-1.5 [font-family:'Public_Sans',Helvetica] text-sm text-stone-400 hover:text-stone-600 transition-colors">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                      </div>
                      <button
                        onClick={() => toggleSave(post.id)}
                        className={`transition-colors ${saved.has(post.id) ? "text-[#4c7a5a]" : "text-stone-400 hover:text-stone-600"}`}
                        data-testid={`button-save-${post.id}`}
                      >
                        <Bookmark className={`h-4 w-4 ${saved.has(post.id) ? "fill-[#4c7a5a]" : ""}`} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 flex flex-col gap-4">
            <Card className="rounded-2xl border border-stone-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <h3 className="[font-family:'Cairo',Helvetica] text-base font-normal text-[#1a281e] mb-4">Trending Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {["Reforestation", "Mangroves", "Urban Garden", "Wetlands", "Wildlife", "Biodiversity"].map(tag => (
                    <button key={tag} className="[font-family:'Public_Sans',Helvetica] text-xs bg-stone-100 hover:bg-[#4c7a5a1a] hover:text-[#4c7a5a] text-stone-600 rounded-full px-3 py-1.5 transition-colors">
                      #{tag}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-0 bg-[#1a281e] shadow-sm overflow-hidden">
              <CardContent className="p-5">
                <h3 className="[font-family:'Cairo',Helvetica] text-base font-normal text-white mb-2">Start a Campaign</h3>
                <p className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400 mb-4">Have an area that needs restoration? Create a campaign and invite your community.</p>
                <Button className="w-full h-auto py-2.5 rounded-xl bg-[#4c7a5a] [font-family:'Public_Sans',Helvetica] text-sm text-white hover:bg-[#3a6349]">
                  Create Campaign
                </Button>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-stone-100 bg-white shadow-sm">
              <CardContent className="p-5">
                <h3 className="[font-family:'Cairo',Helvetica] text-base font-normal text-[#1a281e] mb-4">Active Stewards</h3>
                {[
                  { name: "Elena Marcas", posts: 12 },
                  { name: "Carlos Ruiz", posts: 8 },
                  { name: "Sofia Méndez", posts: 15 },
                ].map(u => (
                  <div key={u.name} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png" />
                        <AvatarFallback>{u.name[0]}</AvatarFallback>
                      </Avatar>
                      <p className="[font-family:'Public_Sans',Helvetica] text-sm text-[#1a281e]">{u.name}</p>
                    </div>
                    <span className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400">{u.posts} posts</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
};
