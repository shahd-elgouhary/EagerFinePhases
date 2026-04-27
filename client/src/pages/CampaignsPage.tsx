import { Link } from "wouter";
import { useState } from "react";
import { MapPin, Users, Search, SlidersHorizontal, ArrowRight, TreePine, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { campaigns } from "@/data/campaigns";

type FilterType = "all" | "campaign-hub" | "impact-site";

const filterOptions: { value: FilterType; label: string }[] = [
  { value: "all", label: "All Campaigns" },
  { value: "campaign-hub", label: "Campaign Hubs" },
  { value: "impact-site", label: "Impact Sites" },
];

export const CampaignsPage = (): JSX.Element => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");

  const filtered = campaigns.filter((c) => {
    const matchSearch =
      !search ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#fdfbef]">
      {/* Page header */}
      <div className="border-b border-stone-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TreePine className="h-4 w-4 text-[#4c7a5a]" />
                <span className="[font-family:'Public_Sans',Helvetica] text-xs uppercase tracking-widest text-[#4c7a5a]">All Campaigns</span>
              </div>
              <h1 className="[font-family:'Cairo',Helvetica] text-4xl font-normal text-[#1a281e]">Active Campaigns</h1>
              <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-500 mt-1">
                {filtered.length} campaign{filtered.length !== 1 ? "s" : ""} active worldwide
              </p>
            </div>
            <Link href="/map">
              <Button className="h-auto rounded-full bg-[#1a281e] px-6 py-3 [font-family:'Cairo',Helvetica] text-base text-white hover:bg-[#2e4535] gap-2">
                View on Map
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
        {/* Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="h-10 pl-9 pr-9 rounded-full border-stone-200 bg-white [font-family:'Public_Sans',Helvetica] text-sm focus-visible:ring-[#4c7a5a]"
              data-testid="input-campaigns-search"
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600">
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-stone-400" />
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setFilter(opt.value)}
                className={`[font-family:'Public_Sans',Helvetica] text-sm px-4 py-2 rounded-full border transition-all ${
                  filter === opt.value
                    ? "bg-[#1a281e] text-white border-[#1a281e]"
                    : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"
                }`}
                data-testid={`filter-${opt.value}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Campaign grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <TreePine className="h-12 w-12 text-stone-200 mx-auto mb-4" />
            <p className="[font-family:'Cairo',Helvetica] text-xl text-stone-400">No campaigns found</p>
            <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <Card key={c.id}
                className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
                data-testid={`card-campaign-${c.id}`}
              >
                {/* Before/after bento */}
                <div className="grid grid-cols-2 h-36">
                  <div
                    className="bg-cover bg-center border-r border-white/20 relative"
                    style={{ backgroundImage: `url(${c.beforeImage})` }}
                  >
                    <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-0.5">
                      <span className="[font-family:'Public_Sans',Helvetica] text-[9px] text-white uppercase tracking-wide">Before</span>
                    </div>
                  </div>
                  <div
                    className="bg-cover bg-center relative"
                    style={{ backgroundImage: `url(${c.progressImage})` }}
                  >
                    <div className="absolute bottom-2 right-2 bg-[#4c7a5a]/80 backdrop-blur-sm rounded px-2 py-0.5">
                      <span className="[font-family:'Public_Sans',Helvetica] text-[9px] text-white uppercase tracking-wide">Progress</span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="[font-family:'Cairo',Helvetica] text-lg font-normal text-[#1a281e] leading-snug">{c.title}</h3>
                    <Badge
                      className={`shrink-0 rounded-full text-[10px] font-normal tracking-wide px-2 py-0.5 ${
                        c.type === "campaign-hub"
                          ? "bg-[#4c7a5a1a] text-[#4c7a5a] hover:bg-[#4c7a5a1a]"
                          : "bg-red-50 text-red-500 hover:bg-red-50"
                      }`}
                    >
                      {c.type === "campaign-hub" ? "Campaign Hub" : "Impact Site"}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-1.5 mb-4">
                    <MapPin className="h-3 w-3 text-stone-400" />
                    <span className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400">{c.location}</span>
                  </div>

                  <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-500 leading-6 line-clamp-2 mb-4">{c.description}</p>

                  {/* Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between mb-1.5">
                      <span className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-500">{c.goalLabel}</span>
                      <span className="[font-family:'Public_Sans',Helvetica] text-xs font-semibold text-[#4c7a5a]">{c.goalPercent}%</span>
                    </div>
                    <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#4c7a5a] rounded-full" style={{ width: `${c.goalPercent}%` }} />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                    <div className="flex items-center gap-1.5 text-stone-400">
                      <Users className="h-3.5 w-3.5" />
                      <span className="[font-family:'Public_Sans',Helvetica] text-xs">{c.stats.find(s => s.label.includes("VOLUNTEER"))?.value} volunteers</span>
                    </div>
                    <Link href="/map">
                      <Button size="sm" className="h-auto py-1.5 px-4 rounded-full bg-[#1a281e] [font-family:'Public_Sans',Helvetica] text-xs text-white hover:bg-[#2e4535]">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
