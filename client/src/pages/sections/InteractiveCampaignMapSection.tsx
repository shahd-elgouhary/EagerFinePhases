import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Campaign, liveActivities } from "@/data/campaigns";

const mapFilters = [
  {
    value: "impact-site",
    label: "Impact Sites",
    dotClassName: "bg-red-500",
    activeDot: "bg-red-500",
  },
  {
    value: "campaign-hub",
    label: "Campaign Hubs",
    dotClassName: "bg-[#4c7a5a]",
    activeDot: "bg-[#4c7a5a]",
  },
];

interface Props {
  campaigns: Campaign[];
  selectedId: string;
  searchQuery: string;
  onPinClick: (id: string) => void;
}

export const InteractiveCampaignMapSection = ({
  campaigns,
  selectedId,
  searchQuery,
  onPinClick,
}: Props): JSX.Element => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [activeFilters, setActiveFilters] = useState<string[]>([
    "impact-site",
    "campaign-hub",
  ]);
  const [activityIndex, setActivityIndex] = useState(0);
  const [activityVisible, setActivityVisible] = useState(true);

  // Rotate live activity every 4 seconds with fade
  useEffect(() => {
    const interval = setInterval(() => {
      setActivityVisible(false);
      setTimeout(() => {
        setActivityIndex((i) => (i + 1) % liveActivities.length);
        setActivityVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const toggleFilter = (value: string) => {
    setActiveFilters((prev) =>
      prev.includes(value)
        ? prev.length > 1
          ? prev.filter((f) => f !== value)
          : prev
        : [...prev, value]
    );
  };

  const normalizedQuery = searchQuery.toLowerCase().trim();

  const visibleCampaigns = campaigns.filter((c) => {
    if (!activeFilters.includes(c.type)) return false;
    if (!normalizedQuery) return true;
    return (
      c.title.toLowerCase().includes(normalizedQuery) ||
      c.location.toLowerCase().includes(normalizedQuery) ||
      c.description.toLowerCase().includes(normalizedQuery)
    );
  });

  const currentActivity = liveActivities[activityIndex];

  return (
    <section
      className="relative z-0 w-full h-full overflow-hidden"
      data-testid="map-section"
    >
      {/* Map background */}
      <div className="absolute inset-0 bg-[url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)] bg-cover bg-center" />

      {/* Search result indicator */}
      {normalizedQuery && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-md border border-stone-100">
          <p className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-600">
            {visibleCampaigns.length === 0 ? (
              <span className="text-stone-400">No campaigns match "{searchQuery}"</span>
            ) : (
              <>
                Showing{" "}
                <span className="font-semibold text-[#4c7a5a]">
                  {visibleCampaigns.length}
                </span>{" "}
                result{visibleCampaigns.length !== 1 ? "s" : ""} for "{searchQuery}"
              </>
            )}
          </p>
        </div>
      )}

      {/* Filter toggles */}
      <header className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <div className="flex flex-wrap items-center gap-3">
          {mapFilters.map((filter) => {
            const isActive = activeFilters.includes(filter.value);
            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => toggleFilter(filter.value)}
                aria-pressed={isActive}
                aria-label={`Toggle ${filter.label}`}
                data-testid={`filter-${filter.value}`}
                className={`h-auto rounded-full border px-4 py-2 shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a] transition-all duration-200 ${
                  isActive
                    ? "border-stone-100 bg-white text-stone-800"
                    : "border-stone-200 bg-white/50 text-stone-400"
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  <span
                    className={`h-2 w-2 rounded-full transition-opacity duration-200 ${filter.dotClassName} ${
                      isActive ? "opacity-100" : "opacity-30"
                    }`}
                  />
                  <span className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 whitespace-nowrap">
                    {filter.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Map pins */}
      {campaigns.map((campaign) => {
        const isSelected = campaign.id === selectedId;
        const isHovered = hoveredId === campaign.id;
        const isVisible = visibleCampaigns.some((c) => c.id === campaign.id);
        const isFiltered = !activeFilters.includes(campaign.type);
        const isDimmed = !isVisible && !isFiltered;
        const isTypeHidden = isFiltered;
        const pinColor =
          campaign.type === "impact-site" ? "bg-red-500" : "bg-[#4c7a5a]";
        const pinHover =
          campaign.type === "impact-site"
            ? "hover:bg-red-600"
            : "hover:bg-[#3a6349]";

        return (
          <div
            key={campaign.id}
            className={`absolute z-20 transition-all duration-300 ${
              isTypeHidden
                ? "opacity-0 pointer-events-none scale-50"
                : isDimmed
                ? "opacity-30"
                : "opacity-100"
            }`}
            style={{ top: campaign.pin.top, left: campaign.pin.left }}
          >
            <div className="relative flex flex-col items-center">
              {/* Tooltip */}
              {(isHovered || isSelected) && isVisible && (
                <div className="absolute bottom-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-52 rounded-xl border-0 bg-white shadow-[0px_25px_50px_-12px_#00000040] overflow-hidden transition-all duration-200 z-30">
                  <div className="space-y-1 p-3">
                    <p className="[font-family:'Public_Sans',Helvetica] text-[10px] font-normal leading-4 text-[#4c7a5a] uppercase tracking-widest">
                      {isSelected ? "Currently Selected" : campaign.type === "impact-site" ? "Impact Site" : "Campaign Hub"}
                    </p>
                    <p className="[font-family:'Public_Sans',Helvetica] text-sm font-semibold leading-5 text-[#1a281e]">
                      {campaign.pin.tooltipTitle}
                    </p>
                    <p className="[font-family:'Public_Sans',Helvetica] text-[11px] font-normal leading-[15px] text-stone-400">
                      {campaign.location}
                    </p>
                    <div className="pt-1 flex items-center gap-1.5">
                      <div className="h-1.5 flex-1 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#4c7a5a] rounded-full"
                          style={{ width: `${campaign.goalPercent}%` }}
                        />
                      </div>
                      <span className="[font-family:'Public_Sans',Helvetica] text-[10px] text-[#4c7a5a] font-medium">
                        {campaign.goalPercent}%
      </span>
                    </div>
                    <p className="[font-family:'Public_Sans',Helvetica] text-[10px] text-stone-400">
                      {campaign.pin.tooltipSubtitle}
                    </p>
                  </div>
                </div>
              )}

              {/* Pin button */}
              <button
                type="button"
                aria-label={`Select ${campaign.title}`}
                onClick={() => onPinClick(campaign.id)}
                onMouseEnter={() => setHoveredId(campaign.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`focus:outline-none transition-transform duration-200 ${
                  isSelected ? "" : "hover:scale-110"
                }`}
                data-testid={`pin-${campaign.id}`}
              >
                {isSelected ? (
                  <img
                    className="h-[88px] w-[88px] drop-shadow-lg"
                    alt={`Selected: ${campaign.title}`}
                    src="/figmaAssets/background-border.svg"
                  />
                ) : (
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full ${pinColor} ${pinHover} border-2 border-white shadow-[0px_4px_12px_rgba(0,0,0,0.25)] cursor-pointer transition-colors`}
                  >
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                )}
              </button>

              {isSelected && (
                <div className="-mt-7 h-3 w-1">
                  <div className="-translate-y-1 h-4 w-full bg-[#ffffff80] backdrop-blur-[2px]" />
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Map controls */}
      <aside className="absolute bottom-5 right-4 z-20 sm:bottom-10 sm:right-[60px]">
        <img
          className="h-[216px] w-[88px]"
          alt="Map controls"
          src="/figmaAssets/map-controls.svg"
        />
      </aside>

      {/* Live activity ticker */}
      <Card className="absolute bottom-5 left-4 z-20 w-72 rounded-2xl border-stone-100 bg-[#ffffffe6] shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] backdrop-blur-sm sm:bottom-10 sm:left-10">
        <CardContent className="flex flex-col items-start gap-3 px-5 py-4">
          <div className="flex w-full items-center justify-between">
            <p className="[font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 tracking-[1.20px] text-stone-400 uppercase">
              Live Activity
            </p>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="[font-family:'Public_Sans',Helvetica] text-[10px] text-green-600">
                Live
              </span>
            </span>
          </div>

          <div
            className={`inline-flex items-center gap-3 w-full transition-opacity duration-300 ${
              activityVisible ? "opacity-100" : "opacity-0"
            }`}
            data-testid="live-activity-card"
          >
            <div className="relative shrink-0">
              <div
                className="h-10 w-10 rounded-full border-2 border-[#4c7a5a] bg-cover bg-center"
                style={{ backgroundImage: `url(${currentActivity.avatar})` }}
              />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
            </div>
            <div className="inline-flex flex-col items-start min-w-0">
              <p className="[font-family:'Public_Sans',Helvetica] text-sm font-medium leading-5 text-[#1a281e] truncate w-full">
                {currentActivity.name}
              </p>
              <p className="[font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 text-stone-500 line-clamp-2">
                {currentActivity.action}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
