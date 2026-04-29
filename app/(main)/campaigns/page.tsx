"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, SlidersHorizontal, ArrowRight, TreePine, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";
import { api } from "@/lib/api";

type Filter = "all" | "campaign-hub" | "impact-site";

const filterOptions: { value: Filter; label: string }[] = [
  { value: "all", label: "All Campaigns" },
  { value: "campaign-hub", label: "Campaign Hubs" },
  { value: "impact-site", label: "Impact Sites" },
];

function CampaignCard({ c }: { c: any }) {
  return (
    <div className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200" data-testid={`card-campaign-${c.slug}`}>
      <div className="grid grid-cols-2 h-36">
        <div className="relative bg-cover bg-center border-r border-white/20" style={{ backgroundImage: `url(${c.beforeImage})` }}>
          <div className="absolute bottom-2 left-2 bg-black/50 rounded px-2 py-0.5"><span className="font-public-sans text-[9px] uppercase text-white">Before</span></div>
        </div>
        <div className="relative bg-cover bg-center" style={{ backgroundImage: `url(${c.progressImage})` }}>
          <div className="absolute bottom-2 right-2 bg-[#4c7a5a]/80 rounded px-2 py-0.5"><span className="font-public-sans text-[9px] uppercase text-white">Progress</span></div>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-cairo text-lg text-[#1a281e] leading-snug">{c.title}</h3>
          <Badge className={`shrink-0 rounded-full text-[10px] font-normal px-2 py-0.5 border-0 ${c.type === "campaign-hub" ? "bg-[#4c7a5a1a] text-[#4c7a5a]" : "bg-red-50 text-red-500"}`}>
            {c.type === "campaign-hub" ? "Campaign Hub" : "Impact Site"}
          </Badge>
        </div>
        <div className="flex items-center gap-1.5 mb-3"><MapPin className="h-3 w-3 text-stone-400" /><span className="font-public-sans text-xs text-stone-400">{c.location}</span></div>
        <p className="font-public-sans text-sm text-stone-500 leading-6 line-clamp-2 mb-4">{c.description}</p>
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="font-public-sans text-xs text-stone-500">Goal: {c.treesGoal.toLocaleString()} Saplings</span>
            <span className="font-public-sans text-xs font-semibold text-[#4c7a5a]">{c.goalPercent}%</span>
          </div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden"><div className="h-full bg-[#4c7a5a] rounded-full" style={{ width: `${c.goalPercent}%` }} /></div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-stone-400"><Users className="h-3.5 w-3.5" /><span className="font-public-sans text-xs">{c.volunteers} volunteers</span></div>
          <Link href="/map"><Button size="sm" className="h-auto py-1.5 px-4 rounded-full bg-[#1a281e] font-public-sans text-xs text-white hover:bg-[#2e4535]">View Details</Button></Link>
        </div>
      </div>
    </div>
  );
}

export default function CampaignsPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCampaigns().then(setCampaigns).finally(() => setLoading(false));
  }, []);

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
              <div className="flex items-center gap-2 mb-3"><TreePine className="h-4 w-4 text-[#4c7a5a]" /><span className="font-public-sans text-xs uppercase tracking-widest text-[#4c7a5a]">All Campaigns</span></div>
              <h1 className="font-cairo text-4xl text-[#1a281e]">Active Campaigns</h1>
              <p className="font-public-sans text-sm text-stone-500 mt-1">{loading ? "Loading…" : `${filtered.length} campaign${filtered.length !== 1 ? "s" : ""} active worldwide`}</p>
            </div>
            <Link href="/map"><Button className="h-auto rounded-full bg-[#1a281e] px-6 py-3 font-cairo text-base text-white hover:bg-[#2e4535] gap-2">View on Map <ArrowRight className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-screen-xl px-5 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="h-10 pl-9 pr-9 rounded-full border-stone-200 bg-white font-public-sans text-sm focus-visible:ring-[#4c7a5a]" data-testid="input-campaigns-search" />
            {search && <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400"><X className="h-3.5 w-3.5" /></button>}
          </div>
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 text-stone-400" />
            {filterOptions.map((opt) => (
              <button key={opt.value} onClick={() => setFilter(opt.value)} className={`font-public-sans text-sm px-4 py-2 rounded-full border transition-all ${filter === opt.value ? "bg-[#1a281e] text-white border-[#1a281e]" : "bg-white text-stone-600 border-stone-200 hover:border-stone-300"}`} data-testid={`filter-${opt.value}`}>{opt.label}</button>
            ))}
          </div>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => <div key={i} className="rounded-2xl border border-stone-100 bg-white overflow-hidden animate-pulse"><div className="h-36 bg-stone-100" /><div className="p-5 flex flex-col gap-3"><div className="h-5 w-3/4 bg-stone-100 rounded" /><div className="h-3 w-full bg-stone-100 rounded" /></div></div>)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20"><TreePine className="h-12 w-12 text-stone-200 mx-auto mb-4" /><p className="font-cairo text-xl text-stone-400">No campaigns found</p></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => <CampaignCard key={c.id} c={c} />)}
          </div>
        )}
      </div>
    </div>
  );
}
