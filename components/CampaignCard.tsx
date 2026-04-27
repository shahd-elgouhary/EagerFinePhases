"use client";

import Link from "next/link";
import { MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Campaign } from "@/lib/campaigns";

interface Props {
  campaign: Campaign;
}

export function CampaignCard({ campaign: c }: Props) {
  return (
    <div
      className="rounded-2xl border border-stone-100 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0px_8px_24px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200"
      data-testid={`card-campaign-${c.id}`}
    >
      {/* Before / After bento */}
      <div className="grid grid-cols-2 h-36">
        <div
          className="relative bg-cover bg-center border-r border-white/20"
          style={{ backgroundImage: `url(${c.beforeImage})` }}
        >
          <div className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm rounded px-2 py-0.5">
            <span className="font-public-sans text-[9px] uppercase tracking-wide text-white">Before</span>
          </div>
        </div>
        <div
          className="relative bg-cover bg-center"
          style={{ backgroundImage: `url(${c.progressImage})` }}
        >
          <div className="absolute bottom-2 right-2 bg-[#4c7a5a]/80 backdrop-blur-sm rounded px-2 py-0.5">
            <span className="font-public-sans text-[9px] uppercase tracking-wide text-white">Progress</span>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-cairo text-lg text-[#1a281e] leading-snug">{c.title}</h3>
          <Badge
            className={cn(
              "shrink-0 rounded-full text-[10px] font-normal tracking-wide px-2 py-0.5 border-0",
              c.type === "campaign-hub"
                ? "bg-[#4c7a5a1a] text-[#4c7a5a]"
                : "bg-red-50 text-red-500"
            )}
          >
            {c.type === "campaign-hub" ? "Campaign Hub" : "Impact Site"}
          </Badge>
        </div>

        <div className="flex items-center gap-1.5 mb-3">
          <MapPin className="h-3 w-3 text-stone-400" />
          <span className="font-public-sans text-xs text-stone-400">{c.location}</span>
        </div>

        <p className="font-public-sans text-sm text-stone-500 leading-6 line-clamp-2 mb-4">
          {c.description}
        </p>

        {/* Progress */}
        <div className="mb-4">
          <div className="flex justify-between mb-1.5">
            <span className="font-public-sans text-xs text-stone-500">{c.goalLabel}</span>
            <span className="font-public-sans text-xs font-semibold text-[#4c7a5a]">{c.goalPercent}%</span>
          </div>
          <div className="h-2 bg-stone-100 rounded-full overflow-hidden">
            <div className="h-full bg-[#4c7a5a] rounded-full" style={{ width: `${c.goalPercent}%` }} />
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-stone-100">
          <div className="flex items-center gap-1.5 text-stone-400">
            <Users className="h-3.5 w-3.5" />
            <span className="font-public-sans text-xs">{c.volunteers} volunteers</span>
          </div>
          <Link href="/map">
            <Button
              size="sm"
              className="h-auto py-1.5 px-4 rounded-full bg-[#1a281e] font-public-sans text-xs text-white hover:bg-[#2e4535]"
            >
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
