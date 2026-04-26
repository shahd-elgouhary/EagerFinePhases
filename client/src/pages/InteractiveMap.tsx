import { useState } from "react";
import { campaigns } from "@/data/campaigns";
import { CampaignOverviewSidebarSection } from "./sections/CampaignOverviewSidebarSection";
import { InteractiveCampaignMapSection } from "./sections/InteractiveCampaignMapSection";
import { PrimaryNavigationHeaderSection } from "./sections/PrimaryNavigationHeaderSection";

export const InteractiveMap = (): JSX.Element => {
  const [selectedId, setSelectedId] = useState<string>(campaigns[0].id);

  const selectedCampaign =
    campaigns.find((c) => c.id === selectedId) ?? campaigns[0];

  return (
    <main className="w-full min-h-screen bg-[linear-gradient(0deg,rgba(253,251,239,1)_0%,rgba(253,251,239,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]">
      <div className="flex w-full flex-col">
        <header className="w-full shrink-0">
          <PrimaryNavigationHeaderSection />
        </header>
        <div className="flex w-full items-start">
          <aside className="w-[384px] shrink-0">
            <CampaignOverviewSidebarSection
              campaign={selectedCampaign}
              onClose={() => {}}
            />
          </aside>
          <section className="flex-1 min-w-0">
            <InteractiveCampaignMapSection
              campaigns={campaigns}
              selectedId={selectedId}
              onPinClick={setSelectedId}
            />
          </section>
        </div>
      </div>
    </main>
  );
};
