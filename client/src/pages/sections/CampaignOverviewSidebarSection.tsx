import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const galleryItems = [
  {
    label: "BEFORE",
    imageClass:
      "bg-[url(/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png)]",
    labelClass: "bg-[#00000080]",
    textWidth: "w-[39.3px]",
  },
  {
    label: "PROGRESS",
    imageClass:
      "bg-[url(/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png)]",
    labelClass: "bg-[#4c7a5acc]",
    textWidth: "w-[54.14px]",
  },
];

const stats = [
  {
    value: "3,612",
    label: "TREES PLANTED",
    iconSrc: "/figmaAssets/icon.svg",
    iconClass: "w-[18px] h-5",
  },
  {
    value: "148",
    label: "VOLUNTEERS",
    iconSrc: "/figmaAssets/icon-1.svg",
    iconClass: "w-6 h-3",
  },
];

const eventDetails = [
  {
    iconSrc: "/figmaAssets/margin-1.svg",
    title: "Saturday, Oct 24th",
    subtitle: "08:00 AM - 01:00 PM",
  },
  {
    iconSrc: "/figmaAssets/margin.svg",
    title: "Tulum North Entrance Gate",
    subtitle: "",
  },
];

export const CampaignOverviewSidebarSection = (): JSX.Element => {
  return (
    <aside className="relative z-[1] flex w-full max-w-96 self-stretch flex-col items-start border-r border-stone-200 bg-[#fdfbefe6] shadow-[0px_25px_50px_-12px_#00000040] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)]">
      <div className="flex w-full flex-col items-start gap-2 px-5 pt-5 pb-16 sm:px-8 sm:pt-8">
        <header className="flex w-full items-center justify-between">
          <Badge className="rounded-full bg-[#4c7a5a1a] px-3 py-1 text-[#4c7a5a] hover:bg-[#4c7a5a1a] [font-family:'Public_Sans',Helvetica] text-xs font-normal tracking-[0.60px] leading-4">
            ACTIVE CAMPAIGN
          </Badge>
          <button
            type="button"
            aria-label="Close campaign overview"
            className="shrink-0"
          >
            <img
              className="relative flex-[0_0_auto]"
              alt="Close"
              src="/figmaAssets/button.svg"
            />
          </button>
        </header>
        <section className="flex w-full flex-col items-start pt-4">
          <h2 className="relative flex items-center self-stretch [font-family:'Cairo',Helvetica] text-2xl font-normal leading-[30px] tracking-[0] text-[#1a281e]">
            Coastal Reforestation Project
          </h2>
        </section>
        <div className="flex w-full items-center gap-2">
          <img
            className="relative flex-[0_0_auto]"
            alt="Location"
            src="/figmaAssets/container-1.svg"
          />
          <p className="relative flex items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-stone-500">
            Tulum, Quintana Roo, Mexico
          </p>
        </div>
        <section className="grid w-full grid-cols-2 gap-3 pt-4">
          {galleryItems.map((item) => (
            <article
              key={item.label}
              className="relative flex flex-col items-start"
            >
              <div
                className={`h-32 w-full rounded-xl border border-solid border-[#ffffff33] bg-cover bg-[50%_50%] shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] ${item.imageClass}`}
              />
              <div
                className={`absolute left-2 top-2 inline-flex flex-col items-start rounded-md px-2 py-1 backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)] ${item.labelClass}`}
              >
                <span
                  className={`relative mt-[-1.00px] flex h-[15px] items-center [font-family:'Public_Sans',Helvetica] text-[10px] font-normal leading-[15px] tracking-[0] text-white whitespace-nowrap ${item.textWidth}`}
                >
                  {item.label}
                </span>
              </div>
            </article>
          ))}
        </section>
        <section className="flex w-full flex-col items-start gap-6 py-6">
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-start justify-between">
              <p className="relative mt-[-1.00px] flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-stone-700 whitespace-nowrap">
                Goal: 5,000 Saplings
              </p>
              <p className="relative mt-[-1.00px] flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-[#4c7a5a] whitespace-nowrap">
                72%
              </p>
            </div>
            <Progress
              value={72}
              className="h-3 w-full overflow-hidden rounded-full bg-stone-200 [&>div]:bg-[#4c7a5a]"
            />
          </div>
          <div className="grid w-full grid-cols-2 gap-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="rounded-xl border border-stone-100 bg-[#ffffff80] shadow-none"
              >
                <CardContent className="flex h-full flex-col items-start p-4">
                  <img
                    className={stat.iconClass}
                    alt=""
                    aria-hidden="true"
                    src={stat.iconSrc}
                  />
                  <div className="flex w-full flex-col items-start pt-2">
                    <div className="relative mt-[-1.00px] flex items-center self-stretch [font-family:'Public_Sans',Helvetica] text-xl font-normal leading-7 tracking-[0] text-[#1a281e]">
                      {stat.value}
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <div className="relative mt-[-1.00px] flex items-center self-stretch [font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 tracking-[-0.60px] text-stone-500">
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
              <img
                className="relative flex-[0_0_auto]"
                alt="Upcoming planting"
                src="/figmaAssets/container.svg"
              />
              <h3 className="relative mt-[-1.00px] flex h-6 items-center [font-family:'Public_Sans',Helvetica] text-base font-normal leading-6 tracking-[0] text-white whitespace-nowrap">
                Upcoming Planting
              </h3>
            </div>
            <div className="flex w-full flex-col items-start gap-3 pb-2 opacity-90">
              {eventDetails.map((detail) => (
                <div
                  key={detail.title}
                  className="flex w-full items-start gap-3"
                >
                  <img
                    className="relative flex-[0_0_auto]"
                    alt=""
                    aria-hidden="true"
                    src={detail.iconSrc}
                  />
                  {detail.subtitle ? (
                    <div className="inline-flex flex-col items-start">
                      <div className="flex w-full flex-col items-start">
                        <p className="relative mt-[-1.00px] flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-white whitespace-nowrap">
                          {detail.title}
                        </p>
                      </div>
                      <div className="flex w-full flex-col items-start">
                        <p className="relative mt-[-1.00px] flex h-4 items-center [font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 tracking-[0] text-white whitespace-nowrap">
                          {detail.subtitle}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <p className="relative mt-[-1.00px] flex h-5 items-center [font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-white whitespace-nowrap">
                      {detail.title}
                    </p>
                  )}
                </div>
              ))}
            </div>
            <Button className="h-auto w-full rounded-xl bg-[#4c7a5a] px-0 py-3 [font-family:'Public_Sans',Helvetica] text-base font-normal leading-6 tracking-[0] text-white hover:bg-[#4c7a5a]">
              Join this Campaign
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};
