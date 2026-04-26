import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { X, MapPin, CalendarDays, Navigation } from "lucide-react";
import { Campaign } from "@/data/campaigns";

interface Props {
  campaign: Campaign;
  onClose: () => void;
}

export const CampaignOverviewSidebarSection = ({
  campaign,
  onClose,
}: Props): JSX.Element => {
  return (
    <aside
      className="relative z-[1] flex h-[calc(100vh-80px)] w-full flex-col items-start border-r border-stone-200 bg-[#fdfbefe6] shadow-[0px_25px_50px_-12px_#00000040] backdrop-blur-sm overflow-y-auto"
      data-testid="campaign-sidebar"
    >
      <div className="flex w-full flex-col items-start gap-2 px-8 pt-8 pb-16">
        <header className="flex w-full items-center justify-between">
          <Badge
            className="rounded-full bg-[#4c7a5a1a] px-3 py-1 text-[#4c7a5a] hover:bg-[#4c7a5a1a] [font-family:'Public_Sans',Helvetica] text-xs font-normal tracking-[0.60px] leading-4"
            data-testid="badge-active-campaign"
          >
            ACTIVE CAMPAIGN
          </Badge>
          <button
            type="button"
            aria-label="Close campaign overview"
            onClick={onClose}
            className="shrink-0 text-stone-400 hover:text-stone-600 transition-colors"
            data-testid="button-close-sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <section className="flex w-full flex-col items-start pt-4">
          <h2
            className="relative flex items-center self-stretch [font-family:'Cairo',Helvetica] text-2xl font-normal leading-[30px] tracking-[0] text-[#1a281e] transition-all duration-300"
            data-testid="text-campaign-title"
          >
            {campaign.title}
          </h2>
        </section>

        <div className="flex w-full items-center gap-2">
          <MapPin className="h-3.5 w-3 shrink-0 text-stone-400" />
          <p
            className="relative flex items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-stone-500"
            data-testid="text-campaign-location"
          >
            {campaign.location}
          </p>
        </div>

        <section className="grid w-full grid-cols-2 gap-3 pt-4">
          {[
            { label: "BEFORE", image: campaign.beforeImage, labelClass: "bg-[#00000080]" },
            { label: "PROGRESS", image: campaign.progressImage, labelClass: "bg-[#4c7a5acc]" },
          ].map((item) => (
            <article
              key={item.label}
              className="relative flex flex-col items-start"
            >
              <div
                className="h-32 w-full rounded-xl border border-solid border-[#ffffff33] bg-cover bg-center shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] transition-all duration-300"
                style={{ backgroundImage: `url(${item.image})` }}
                data-testid={`img-campaign-${item.label.toLowerCase()}`}
              />
              <div
                className={`absolute left-2 top-2 inline-flex flex-col items-start rounded-md px-2 py-1 backdrop-blur-[2px] ${item.labelClass}`}
              >
                <span className="flex h-[15px] items-center [font-family:'Public_Sans',Helvetica] text-[10px] font-normal leading-[15px] text-white whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            </article>
          ))}
        </section>

        <section className="flex w-full flex-col items-start gap-6 py-6">
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-start justify-between">
              <p
                className="flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-stone-700 whitespace-nowrap"
                data-testid="text-campaign-goal"
              >
                {campaign.goalLabel}
              </p>
              <p
                className="flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-[#4c7a5a] whitespace-nowrap"
                data-testid="text-campaign-percent"
              >
                {campaign.goalPercent}%
              </p>
            </div>
            <Progress
              value={campaign.goalPercent}
              className="h-3 w-full overflow-hidden rounded-full bg-stone-200 [&>div]:bg-[#4c7a5a] [&>div]:transition-all [&>div]:duration-500"
            />
          </div>

          <div className="grid w-full grid-cols-2 gap-4">
            {campaign.stats.map((stat) => (
              <Card
                key={stat.label}
                className="rounded-xl border border-stone-100 bg-[#ffffff80] shadow-none"
                data-testid={`card-stat-${stat.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <CardContent className="flex h-full flex-col items-start p-4">
                  <img
                    className={stat.iconClass}
                    alt=""
                    aria-hidden="true"
                    src={stat.iconSrc}
                  />
                  <div className="flex w-full flex-col items-start pt-2">
                    <div className="flex items-center self-stretch [font-family:'Public_Sans',Helvetica] text-xl font-normal leading-7 text-[#1a281e]">
                      {stat.value}
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <div className="flex items-center self-stretch [font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 tracking-[-0.60px] text-stone-500">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="relative w-full rounded-2xl border-0 bg-[#1a281e] shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]">
          <CardContent className="relative flex flex-col items-start gap-4 p-6">
            <div className="flex w-full items-center gap-2">
              <CalendarDays className="h-5 w-5 shrink-0 text-white" />
              <h3 className="flex h-6 items-center [font-family:'Public_Sans',Helvetica] text-base font-normal leading-6 text-white whitespace-nowrap">
                Upcoming Planting
              </h3>
            </div>

            <div className="flex w-full flex-col items-start gap-3 pb-2 opacity-90">
              <div className="flex w-full items-start gap-3">
                <CalendarDays className="h-4 w-4 shrink-0 text-white mt-0.5" />
                <div className="inline-flex flex-col items-start">
                  <p
                    className="flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-white whitespace-nowrap"
                    data-testid="text-event-date"
                  >
                    {campaign.event.date}
                  </p>
                  <p className="flex h-4 items-center [font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 text-white whitespace-nowrap">
                    {campaign.event.time}
                  </p>
                </div>
              </div>

              <div className="flex w-full items-start gap-3">
                <Navigation className="h-4 w-4 shrink-0 text-white mt-0.5" />
                <p
                  className="flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-white whitespace-nowrap"
                  data-testid="text-event-place"
                >
                  {campaign.event.place}
                </p>
              </div>
            </div>

            <Button
              className="h-auto w-full rounded-xl bg-[#4c7a5a] px-0 py-3 [font-family:'Public_Sans',Helvetica] text-base font-normal leading-6 text-white hover:bg-[#3a6349] transition-colors"
              data-testid="button-join-campaign"
            >
              Join this Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};
