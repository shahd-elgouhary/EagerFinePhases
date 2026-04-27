"use client";

import Link from "next/link";
import { X, MapPin, Calendar, Clock, Users, TreePine, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Campaign } from "@/lib/campaigns";

interface Props {
  campaign: Campaign;
  onClose: () => void;
}

export function Sidebar({ campaign: c, onClose }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside className="h-full w-full bg-white border-r border-stone-100 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-stone-100 sticky top-0 bg-white z-10">
        <Badge
          className={cn(
            "rounded-full text-[10px] font-normal tracking-widest uppercase px-3 py-1 border-0",
            c.type === "campaign-hub"
              ? "bg-[#4c7a5a1a] text-[#4c7a5a]"
              : "bg-red-50 text-red-500"
          )}
        >
          {c.type === "campaign-hub" ? "Active Campaign" : "Impact Site"}
        </Badge>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-stone-100 transition-colors text-stone-400"
          aria-label="Close sidebar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5 flex flex-col gap-5 flex-1">
        {/* Title */}
        <div>
          <h2 className="font-cairo text-2xl text-[#1a281e] leading-tight mb-2">{c.title}</h2>
          <div className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-stone-400" />
            <span className="font-public-sans text-sm text-stone-400">{c.location}</span>
          </div>
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
          <div className="relative">
            <div
              className="h-28 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${c.beforeImage})` }}
            />
            <div className="absolute top-2 left-2 bg-black/50 rounded px-2 py-0.5">
              <span className="font-public-sans text-[9px] text-white uppercase">Before</span>
            </div>
          </div>
          <div className="relative">
            <div
              className="h-28 bg-cover bg-center rounded-lg"
              style={{ backgroundImage: `url(${c.progressImage})` }}
            />
            <div className="absolute top-2 right-2 bg-[#4c7a5a]/80 rounded px-2 py-0.5">
              <span className="font-public-sans text-[9px] text-white uppercase">Progress</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className={cn("font-public-sans text-sm text-stone-500 leading-6", !expanded && "line-clamp-3")}>
            {c.description}
          </p>
          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-1 flex items-center gap-1 font-public-sans text-xs text-[#4c7a5a] hover:underline"
          >
            {expanded ? (<><ChevronUp className="h-3 w-3" />Show less</>) : (<><ChevronDown className="h-3 w-3" />Read more</>)}
          </button>
        </div>

        {/* Goal */}
        <div className="bg-stone-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-public-sans text-xs text-stone-500">{c.goalLabel}</span>
            <span className="font-public-sans text-xs font-semibold text-[#4c7a5a]">{c.goalPercent}%</span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div className="h-full bg-[#4c7a5a] rounded-full transition-all" style={{ width: `${c.goalPercent}%` }} />
          </div>
          <p className="font-public-sans text-xs text-stone-400 mt-2">
            {Math.round((c.goalPercent / 100) * c.treesGoal).toLocaleString()} of {c.treesGoal.toLocaleString()} saplings planted
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          {c.stats.map((stat) => (
            <div key={stat.label} className="bg-stone-50 rounded-xl p-4 flex flex-col gap-1">
              <div className="flex items-center gap-2">
                {stat.label.includes("TREE") ? (
                  <TreePine className="h-4 w-4 text-[#4c7a5a]" />
                ) : (
                  <Users className="h-4 w-4 text-blue-500" />
                )}
                <span className="font-cairo text-xl text-[#1a281e]">{stat.value}</span>
              </div>
              <span className="font-public-sans text-[10px] uppercase tracking-widest text-stone-400">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Event */}
        <div className="border border-stone-100 rounded-xl p-4">
          <p className="font-public-sans text-xs uppercase tracking-widest text-stone-400 mb-3">Next Event</p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#1a281e]">
              <Calendar className="h-4 w-4 text-stone-400 shrink-0" />
              <span className="font-public-sans text-sm">{c.event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <Clock className="h-4 w-4 text-stone-400 shrink-0" />
              <span className="font-public-sans text-sm">{c.event.time}</span>
            </div>
            <div className="flex items-center gap-2 text-stone-500">
              <MapPin className="h-4 w-4 text-stone-400 shrink-0" />
              <span className="font-public-sans text-sm">{c.event.place}</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <Link href="/sign-up" className="mt-auto">
          <Button className="w-full h-auto py-4 rounded-2xl bg-[#1a281e] font-cairo text-base text-white hover:bg-[#2e4535] transition-colors">
            Join This Campaign
          </Button>
        </Link>
      </div>
    </aside>
  );
}
