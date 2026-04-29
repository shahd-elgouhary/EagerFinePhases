"use client";

import { useState, useEffect } from "react";
import { Search, X, PanelLeftOpen, TreePine, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sidebar } from "@/components/Sidebar";
import { liveActivities } from "@/lib/campaigns";
import { api } from "@/lib/api";
import { cn } from "@/lib/utils";

type FilterType = "all" | "campaign-hub" | "impact-site";

export default function MapPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [activityIdx, setActivityIdx] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getCampaigns().then((data) => {
      setCampaigns(data);
      if (data.length > 0) setSelectedId(data[0].id);
    }).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setActivityIdx((i) => (i + 1) % liveActivities.length), 4000);
    return () => clearInterval(interval);
  }, []);

  const selectedCampaign = campaigns.find((c) => c.id === selectedId) ?? campaigns[0];
  const activity = liveActivities[activityIdx];

  const filteredCampaigns = campaigns.filter((c) => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.location.toLowerCase().includes(search.toLowerCase());
    const matchFilter = activeFilter === "all" || c.type === activeFilter;
    return matchSearch && matchFilter;
  });

  const sidebarCampaign = selectedCampaign ? {
    id: selectedCampaign.slug ?? selectedCampaign.id,
    type: selectedCampaign.type,
    title: selectedCampaign.title,
    location: selectedCampaign.location,
    description: selectedCampaign.description,
    beforeImage: selectedCampaign.beforeImage ?? "",
    progressImage: selectedCampaign.progressImage ?? "",
    goalLabel: `Goal: ${selectedCampaign.treesGoal?.toLocaleString()} Saplings`,
    goalPercent: selectedCampaign.goalPercent ?? 0,
    treesGoal: selectedCampaign.treesGoal ?? 0,
    volunteers: selectedCampaign.volunteers ?? 0,
    stats: [
      { value: selectedCampaign.treesPlanted?.toLocaleString() ?? "0", label: "TREES PLANTED" },
      { value: String(selectedCampaign.volunteers ?? 0), label: "VOLUNTEERS" },
    ],
    event: {
      date: selectedCampaign.eventDate ?? "",
      time: selectedCampaign.eventTime ?? "",
      place: selectedCampaign.eventPlace ?? "",
    },
    pin: {
      top: selectedCampaign.pinTop ?? "50%",
      left: selectedCampaign.pinLeft ?? "50%",
      tooltipTitle: selectedCampaign.title,
      tooltipSubtitle: `${selectedCampaign.treesPlanted?.toLocaleString()} trees planted`,
    },
  } : null;

  return (
    <div className="flex w-full bg-[#fdfbef]" style={{ height: "calc(100vh - 80px)" }}>
      <div className={cn("shrink-0 h-full transition-all duration-300 ease-in-out overflow-hidden", sidebarOpen && sidebarCampaign ? "w-[384px]" : "w-0")}>
        <div className="w-[384px] h-full">
          {sidebarCampaign && <Sidebar campaign={sidebarCampaign} onClose={() => setSidebarOpen(false)} />}
        </div>
      </div>
      <div className="flex-1 min-w-0 h-full relative overflow-hidden">
        {(!sidebarOpen || !sidebarCampaign) && (
          <button onClick={() => setSidebarOpen(true)} className="absolute left-3 top-4 z-30 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg border border-stone-100 text-[#1a281e] hover:bg-stone-50 font-public-sans text-sm" data-testid="button-open-sidebar">
            <PanelLeftOpen className="h-4 w-4" /><span className="hidden sm:inline">Campaign Details</span>
          </button>
        )}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400 pointer-events-none" />
            <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search campaigns..." className="h-10 w-56 sm:w-72 rounded-full border-0 bg-white/95 backdrop-blur-sm shadow-lg pl-9 pr-8 font-public-sans text-sm focus-visible:ring-1 focus-visible:ring-[#4c7a5a]" data-testid="input-map-search" />
            {search && <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400"><X className="h-3.5 w-3.5" /></button>}
          </div>
        </div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {[
            { value: "impact-site" as FilterType, label: "Impact Sites", color: "bg-red-500", active: "bg-red-500 text-white border-red-500" },
            { value: "campaign-hub" as FilterType, label: "Campaign Hubs", color: "bg-[#4c7a5a]", active: "bg-[#4c7a5a] text-white border-[#4c7a5a]" },
          ].map((f) => (
            <button key={f.value} onClick={() => setActiveFilter((prev) => (prev === f.value ? "all" : f.value))} className={cn("flex items-center gap-2 rounded-full px-4 py-2 text-sm border font-public-sans transition-all shadow-sm backdrop-blur-sm", activeFilter === f.value ? f.active : "bg-white/95 text-stone-600 border-stone-200 hover:border-stone-300")} data-testid={`filter-${f.value}`}>
              <span className={cn("h-2.5 w-2.5 rounded-full", activeFilter === f.value ? "bg-white" : f.color)} />{f.label}
            </button>
          ))}
        </div>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)` }} />
        {!loading && filteredCampaigns.map((c) => {
          const isSelected = c.id === selectedId;
          const isHub = c.type === "campaign-hub";
          return (
            <div key={c.id} className="absolute z-10" style={{ top: c.pinTop ?? "50%", left: c.pinLeft ?? "50%", transform: "translate(-50%,-50%)" }}>
              {isSelected && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 bg-white rounded-2xl p-4 shadow-xl w-52 border border-stone-100 pointer-events-none">
                  <p className="font-public-sans text-[10px] uppercase tracking-widest text-stone-400 mb-1">Currently Selected</p>
                  <p className="font-cairo text-sm text-[#1a281e] mb-2">{c.title}</p>
                  <div className="h-1.5 bg-stone-100 rounded-full overflow-hidden mb-1"><div className="h-full bg-[#4c7a5a] rounded-full" style={{ width: `${c.goalPercent}%` }} /></div>
                  <p className="font-public-sans text-[11px] text-stone-400">{c.treesPlanted?.toLocaleString()} trees planted</p>
                </div>
              )}
              {isHub ? (
                <button onClick={() => { setSelectedId(c.id); setSidebarOpen(true); }} className={cn("flex h-10 w-10 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110", isSelected ? "bg-[#1a281e] scale-110" : "bg-white")} data-testid={`pin-${c.slug}`}>
                  <TreePine className={cn("h-5 w-5", isSelected ? "text-[#4c7a5a]" : "text-[#1a281e]")} />
                </button>
              ) : (
                <button onClick={() => { setSelectedId(c.id); setSidebarOpen(true); }} className={cn("flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110", isSelected ? "bg-red-600 scale-110" : "bg-red-500")} data-testid={`pin-${c.slug}`}>
                  <span className="h-3 w-3 rounded-full bg-white" />
                </button>
              )}
            </div>
          );
        })}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2">
          {["+", "−", "◎", "⧉"].map((icon, i) => (
            <button key={i} className="h-10 w-10 rounded-lg bg-white shadow-md border border-stone-100 text-stone-600 hover:bg-stone-50 text-lg flex items-center justify-center">{icon}</button>
          ))}
        </div>
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 bg-white/95 backdrop-blur-sm rounded-2xl px-5 py-3 shadow-lg border border-stone-100 flex items-center gap-4 max-w-xs sm:max-w-sm">
          <div className="flex items-center gap-2 shrink-0">
            <span className="font-public-sans text-[10px] uppercase tracking-widest text-stone-400">Live Activity</span>
            <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" /><span className="font-public-sans text-[10px] text-green-500">Live</span></span>
          </div>
          <div className="flex items-center gap-3 min-w-0">
            <Avatar className="h-8 w-8 shrink-0 border border-stone-100"><AvatarImage src={activity.avatar} /><AvatarFallback className="text-xs">{activity.name[0]}</AvatarFallback></Avatar>
            <div className="min-w-0"><p className="font-public-sans text-xs font-medium text-[#1a281e] truncate">{activity.name}</p><p className="font-public-sans text-[11px] text-stone-400 truncate">{activity.action}</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}
