import { Link } from "wouter";
import { useState } from "react";
import { MapPin, TreePine, Users, Heart, Award, Settings, Share2, MessageCircle, Bookmark, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { campaigns } from "@/data/campaigns";

const profileTabs = ["Posts", "Campaigns", "Impact"] as const;
type ProfileTab = typeof profileTabs[number];

const userPosts = [
  {
    id: 1,
    image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    title: "Planted 50 native oaks in the Retiro buffer zone today.",
    time: "2h ago",
    likes: 124,
    comments: 18,
  },
  {
    id: 2,
    image: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    title: "Week 3 of the Coastal Reforestation Project.",
    time: "3d ago",
    likes: 76,
    comments: 9,
  },
  {
    id: 3,
    image: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    title: "Morning sunrise at the mangrove sanctuary.",
    time: "1w ago",
    likes: 201,
    comments: 34,
  },
];

const badges = [
  { label: "Tree Planter", icon: TreePine, color: "text-[#4c7a5a]", bg: "bg-[#4c7a5a1a]" },
  { label: "Community Lead", icon: Users, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Top Contributor", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
];

export const UserProfilePage = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("Posts");
  const [liked, setLiked] = useState<Set<number>>(new Set());
  const [following, setFollowing] = useState(false);

  return (
    <div className="min-h-screen bg-[#fdfbef]">
      {/* Profile Header */}
      <div className="relative">
        {/* Cover */}
        <div
          className="h-48 sm:h-56 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)` }}
        >
          <div className="absolute inset-0 bg-[#1a281e]/50" />
        </div>

        <div className="mx-auto max-w-screen-xl px-5 sm:px-8">
          {/* Avatar + actions */}
          <div className="flex items-end justify-between -mt-12 mb-4 relative z-10">
            <div className="relative">
              <Avatar className="h-24 w-24 border-4 border-[#fdfbef] shadow-lg">
                <AvatarImage src="/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png" />
                <AvatarFallback className="text-xl bg-[#4c7a5a] text-white">E</AvatarFallback>
              </Avatar>
              <div className="absolute bottom-1 right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-[#fdfbef]" />
            </div>
            <div className="flex items-center gap-2 pb-1">
              <Button variant="outline" size="sm" className="h-9 rounded-full border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm gap-1.5">
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
              <Button variant="outline" size="sm" className="h-9 rounded-full border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm gap-1.5">
                <Settings className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button
                size="sm"
                onClick={() => setFollowing(v => !v)}
                className={`h-9 rounded-full [font-family:'Public_Sans',Helvetica] text-sm ${following ? "bg-stone-200 text-stone-700 hover:bg-stone-300" : "bg-[#1a281e] text-white hover:bg-[#2e4535]"}`}
                data-testid="button-follow"
              >
                {following ? "Following" : "Follow"}
              </Button>
            </div>
          </div>

          {/* Name + meta */}
          <div className="mb-4">
            <h1 className="[font-family:'Cairo',Helvetica] text-3xl font-normal text-[#1a281e]">Elena Marcas</h1>
            <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-400">@elena.marcas</p>
            <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-600 mt-2 max-w-lg leading-6">
              Environmental steward passionate about coastal reforestation. 3+ years planting native species across the Yucatán Peninsula.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5 text-stone-400">
                <MapPin className="h-3.5 w-3.5" />
                <span className="[font-family:'Public_Sans',Helvetica] text-xs">Tulum, Mexico</span>
              </div>
              <div className="flex items-center gap-1.5 text-stone-400">
                <CalendarDays className="h-3.5 w-3.5" />
                <span className="[font-family:'Public_Sans',Helvetica] text-xs">Joined Jan 2022</span>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 mb-4 pb-4 border-b border-stone-100">
            {[
              { label: "Posts", value: "24" },
              { label: "Following", value: "83" },
              { label: "Followers", value: "412" },
              { label: "Trees Planted", value: "3,612" },
            ].map(s => (
              <div key={s.label} className="text-center">
                <p className="[font-family:'Cairo',Helvetica] text-xl text-[#1a281e]">{s.value}</p>
                <p className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            {badges.map(b => (
              <div key={b.label} className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 ${b.bg}`}>
                <b.icon className={`h-3.5 w-3.5 ${b.color}`} />
                <span className={`[font-family:'Public_Sans',Helvetica] text-xs font-medium ${b.color}`}>{b.label}</span>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-1 border-b border-stone-100">
            {profileTabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`[font-family:'Cairo',Helvetica] text-base font-normal px-5 py-3 border-b-2 transition-all -mb-px ${
                  activeTab === tab
                    ? "border-[#4c7a5a] text-[#4c7a5a]"
                    : "border-transparent text-stone-400 hover:text-stone-600"
                }`}
                data-testid={`tab-${tab.toLowerCase()}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0">
            {activeTab === "Posts" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {userPosts.map(post => (
                  <Card key={post.id} className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_4px_16px_rgba(0,0,0,0.08)] transition-shadow"
                    data-testid={`card-post-${post.id}`}>
                    <div className="h-44 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
                    <CardContent className="p-4">
                      <p className="[font-family:'Cairo',Helvetica] text-base text-[#1a281e] mb-2">{post.title}</p>
                      <p className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400 mb-3">{post.time}</p>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setLiked(prev => { const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })}
                          className={`flex items-center gap-1 [font-family:'Public_Sans',Helvetica] text-xs transition-colors ${liked.has(post.id) ? "text-red-500" : "text-stone-400"}`}
                        >
                          <Heart className={`h-3.5 w-3.5 ${liked.has(post.id) ? "fill-red-500" : ""}`} />
                          {post.likes + (liked.has(post.id) ? 1 : 0)}
                        </button>
                        <button className="flex items-center gap-1 [font-family:'Public_Sans',Helvetica] text-xs text-stone-400">
                          <MessageCircle className="h-3.5 w-3.5" />
                          {post.comments}
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "Campaigns" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {campaigns.map(c => (
                  <Card key={c.id} className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden"
                    data-testid={`card-campaign-${c.id}`}>
                    <div className="h-32 bg-cover bg-center" style={{ backgroundImage: `url(${c.progressImage})` }} />
                    <CardContent className="p-4">
                      <h3 className="[font-family:'Cairo',Helvetica] text-base text-[#1a281e] mb-1">{c.title}</h3>
                      <div className="flex items-center gap-1.5 mb-3">
                        <MapPin className="h-3 w-3 text-stone-400" />
                        <span className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400">{c.location}</span>
                      </div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-500">{c.goalLabel}</span>
                        <span className="[font-family:'Public_Sans',Helvetica] text-xs font-semibold text-[#4c7a5a]">{c.goalPercent}%</span>
                      </div>
                      <Progress value={c.goalPercent} className="h-2 [&>div]:bg-[#4c7a5a]" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {activeTab === "Impact" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { label: "Total Trees Planted", value: "3,612", icon: TreePine, color: "text-[#4c7a5a]", bg: "bg-[#4c7a5a1a]", desc: "Across 3 active campaigns" },
                  { label: "Campaigns Joined", value: "3", icon: Award, color: "text-amber-500", bg: "bg-amber-50", desc: "All in Quintana Roo, Mexico" },
                  { label: "Volunteer Hours", value: "124h", icon: CalendarDays, color: "text-blue-500", bg: "bg-blue-50", desc: "Since January 2022" },
                  { label: "Community Members", value: "455", icon: Users, color: "text-purple-500", bg: "bg-purple-50", desc: "Reached through posts" },
                ].map(stat => (
                  <Card key={stat.label} className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)]">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="[font-family:'Cairo',Helvetica] text-2xl text-[#1a281e]">{stat.value}</p>
                        <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-500">{stat.label}</p>
                        <p className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400 mt-0.5">{stat.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-4">
            <p className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400 uppercase tracking-widest">Track Elena's Journey</p>
            {campaigns.map(c => (
              <Card key={c.id} className="rounded-xl border border-stone-100 bg-white shadow-sm">
                <CardContent className="p-4">
                  <p className="[font-family:'Cairo',Helvetica] text-sm text-[#1a281e] mb-2">{c.title}</p>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400">Progress</span>
                    <span className="[font-family:'Public_Sans',Helvetica] text-xs font-semibold text-[#4c7a5a]">{c.goalPercent}%</span>
                  </div>
                  <Progress value={c.goalPercent} className="h-1.5 [&>div]:bg-[#4c7a5a]" />
                  <Link href="/map">
                    <p className="[font-family:'Public_Sans',Helvetica] text-xs text-[#4c7a5a] mt-2 hover:underline cursor-pointer">View on map →</p>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </aside>
        </div>
      </div>
    </div>
  );
};
