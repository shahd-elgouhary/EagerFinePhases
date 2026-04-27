"use client";

import Link from "next/link";
import { useState } from "react";
import { Search, SlidersHorizontal, ArrowRight, TreePine, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CampaignCard } from "@/components/CampaignCard";
import { campaigns } from "@/lib/campaigns";
import type { CampaignType } from "@/lib/campaigns";

type Filter = "all" | CampaignType;

const filterOptions: { value: Filter; label: string }[] = [
  { value: "all", label: "All Campaigns" },
  { value: "campaign-hub", label: "Campaign Hubs" },
  { value: "impact-site", label: "Impact Sites" },
];

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = campaigns.filter((c) => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-[#fdfbef]">
      <div className="border-b border-stone-100 bg-white/60 backdrop-blur-sm">
        <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <TreePine className="h-4 w-4 text-[#4c7a5a]" />
                <span className="font-public-sans text-xs uppercase tracking-widest text-[#4c7a5a]">All Campaigns</span>
              </div>
              <h1 className="font-cairo text-4xl text-[#1a281e]">Active Campaigns</h1>
              <p className="font-public-sans text-sm text-stone-500 mt-1">{filtered.length} campaign{filtered.length !== 1 ? "s" : ""} active worldwide</p>
            </div>
            <Link href="/map">
              <Button className="h-auto rounded-full bg-[#1a281e] px-6 py-3 font-cairo text-base text-white hover:bg-[#2e4535] gap-2">
                View on Map <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search campaigns..."
              className="h-10 pl-9 pr-9 rounded-full border-stone-200 bg-white font-public-sans text-sm focus-visible:ring-[#4c7a5a]"
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
                className={`font-public-sans text-sm px-4 py-2 rounded-full border transition-all ${filter === opt.value ? "bg-[#1a281e] text-white border-[#1a281e]" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"}`}
                data-testid={`filter-${opt.value}`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <TreePine className="h-12 w-12 text-stone-200 mx-auto mb-4" />
            <p className="font-cairo text-xl text-stone-400">No campaigns found</p>
            <p className="font-public-sans text-sm text-stone-400 mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => <CampaignCard key={c.id} campaign={c} />)}
          </div>
        )}
      </div>
    </div>
  );
}
