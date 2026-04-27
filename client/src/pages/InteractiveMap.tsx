import { useState } from "react";
import { campaigns } from "@/data/campaigns";
import { CampaignOverviewSidebarSection } from "./sections/CampaignOverviewSidebarSection";
import { InteractiveCampaignMapSection } from "./sections/InteractiveCampaignMapSection";
import { PanelLeftOpen } from "lucide-react";

export const InteractiveMap = (): JSX.Element => {
  const [selectedId, setSelectedId] = useState<string>(campaigns[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const selectedCampaign =
    campaigns.find((c) => c.id === selectedId) ?? campaigns[0];

  const handlePinClick = (id: string) => {
    setSelectedId(id);
    setSidebarOpen(true);
  };

  return (
    <div
      className="w-full bg-[#fdfbef]"
      style={{ height: "calc(100vh - 80px)" }}
      data-testid="interactive-map-page"
    >
      <div className="flex w-full items-start relative h-full">
        {/* Sidebar */}
        <div
          className={`shrink-0 h-full transition-all duration-300 ease-in-out overflow-hidden ${
            sidebarOpen ? "w-[384px]" : "w-0"
          }`}
        >
          <div className="w-[384px] h-full">
            <CampaignOverviewSidebarSection
              campaign={selectedCampaign}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>

        {/* Reopen sidebar button when collapsed */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="absolute left-3 top-4 z-30 flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] border border-stone-100 text-[#1a281e] hover:bg-stone-50 transition-colors [font-family:'Public_Sans',Helvetica] text-sm font-normal"
            data-testid="button-open-sidebar"
            aria-label="Open campaign details"
          >
            <PanelLeftOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Campaign Details</span>
          </button>
        )}

        {/* Map */}
        <div className="flex-1 min-w-0 h-full">
          <InteractiveCampaignMapSection
            campaigns={campaigns}
            selectedId={selectedId}
            searchQuery={searchQuery}
            onPinClick={handlePinClick}
          />
        </div>
      </div>
    </div>
  );
};
