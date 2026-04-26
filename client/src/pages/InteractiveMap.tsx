import { CampaignOverviewSidebarSection } from "./sections/CampaignOverviewSidebarSection";
import { InteractiveCampaignMapSection } from "./sections/InteractiveCampaignMapSection";
import { PrimaryNavigationHeaderSection } from "./sections/PrimaryNavigationHeaderSection";

export const InteractiveMap = (): JSX.Element => {
  return (
    <main className="w-full bg-[linear-gradient(0deg,rgba(253,251,239,1)_0%,rgba(253,251,239,1)_100%),linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]">
      <div className="flex w-full flex-col">
        <header className="w-full shrink-0">
          <PrimaryNavigationHeaderSection />
        </header>
        <div className="flex w-full items-start">
          <aside className="w-[30%] shrink-0">
            <CampaignOverviewSidebarSection />
          </aside>
          <section className="w-[70%] min-w-0 shrink-0">
            <InteractiveCampaignMapSection />
          </section>
        </div>
      </div>
    </main>
  );
};
