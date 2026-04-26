import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Campaign } from "@/data/campaigns";

const mapFilters = [
  { value: "impact-sites", label: "Impact Sites", dotClassName: "bg-red-500" },
  {
    value: "campaign-hubs",
    label: "Campaign Hubs",
    dotClassName: "bg-[#4c7a5a]",
  },
];

interface Props {
  campaigns: Campaign[];
  selectedId: string;
  onPinClick: (id: string) => void;
}

export const InteractiveCampaignMapSection = ({
  campaigns,
  selectedId,
  onPinClick,
}: Props): JSX.Element => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section
      className="relative z-0 min-h-[calc(100vh-80px)] w-full overflow-hidden"
      data-testid="map-section"
    >
      <div className="absolute inset-0 bg-[url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)] bg-cover bg-center" />

      <header className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <ToggleGroup
          type="multiple"
          defaultValue={mapFilters.map((f) => f.value)}
          className="flex flex-wrap items-center gap-3"
        >
          {mapFilters.map((filter) => (
            <ToggleGroupItem
              key={filter.value}
              value={filter.value}
              aria-label={filter.label}
              className="h-auto rounded-full border border-stone-100 bg-white px-4 py-2 text-black shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a] data-[state=on]:bg-white data-[state=on]:text-black"
            >
              <span className="inline-flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${filter.dotClassName}`} />
                <span className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 whitespace-nowrap">
                  {filter.label}
                </span>
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </header>

      {campaigns.map((campaign) => {
        const isSelected = campaign.id === selectedId;
        const isHovered = hoveredId === campaign.id;
        const showTooltip = isHovered || isSelected;

        return (
          <div
            key={campaign.id}
            className="absolute z-20"
            style={{ top: campaign.pin.top, left: campaign.pin.left }}
            data-testid={`pin-${campaign.id}`}
          >
            <div className="relative flex flex-col items-center">
              {showTooltip && (
                <Card className="absolute bottom-[calc(100%+12px)] left-1/2 w-48 -translate-x-1/2 rounded-xl border-0 bg-white shadow-[0px_25px_50px_-12px_#00000040] transition-all duration-200">
                  <CardContent className="space-y-1 p-3">
                    <p className="[font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 text-[#4c7a5a] uppercase tracking-wide">
                      {isSelected ? "Currently Selected" : "Campaign"}
                    </p>
                    <p className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-[#1a281e]">
                      {campaign.pin.tooltipTitle}
                    </p>
                    <p className="[font-family:'Public_Sans',Helvetica] text-[10px] font-normal leading-[15px] text-stone-400">
                      {campaign.pin.tooltipSubtitle}
                    </p>
                  </CardContent>
                </Card>
              )}

              <button
                type="button"
                aria-label={`Select ${campaign.title}`}
                onClick={() => onPinClick(campaign.id)}
                onMouseEnter={() => setHoveredId(campaign.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="focus:outline-none transition-transform duration-200 hover:scale-110"
              >
                {isSelected ? (
                  <img
                    className="h-[88px] w-[88px] drop-shadow-lg"
                    alt={`Selected: ${campaign.title}`}
                    src="/figmaAssets/background-border.svg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-[#4c7a5a] border-2 border-white shadow-[0px_4px_12px_rgba(0,0,0,0.25)] hover:bg-[#3a6349] cursor-pointer">
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

      <aside className="absolute bottom-5 right-4 z-20 sm:bottom-10 sm:right-[60px]">
        <img
          className="h-[216px] w-[88px]"
          alt="Map controls"
          src="/figmaAssets/map-controls.svg"
        />
      </aside>

      <Card className="absolute bottom-5 left-4 z-20 max-w-xs rounded-2xl border-stone-100 bg-[#ffffffe6] shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] backdrop-blur-sm sm:bottom-10 sm:left-10">
        <CardContent className="flex flex-col items-start gap-3 px-6 py-4">
          <p className="[font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 tracking-[1.20px] text-stone-400">
            LIVE ACTIVITY
          </p>
          <div className="inline-flex items-center gap-3">
            <div className="relative inline-flex flex-col items-start">
              <div className="h-10 w-10 rounded-full border-2 border-[#4c7a5a] bg-[url(/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png)] bg-cover bg-center" />
              <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
            </div>
            <div className="inline-flex flex-col items-start">
              <p className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 whitespace-nowrap text-[#1a281e]">
                Elena Marcas
              </p>
              <p className="[font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 whitespace-nowrap text-stone-500">
                Just checked in at Mangrove Sanctuary
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
