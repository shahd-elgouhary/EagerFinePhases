import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const mapFilters = [
  { value: "impact-sites", label: "Impact Sites", dotClassName: "bg-red-500" },
  {
    value: "campaign-hubs",
    label: "Campaign Hubs",
    dotClassName: "bg-[#4c7a5a]",
  },
];

const mapPins = [
  {
    id: "selected",
    type: "selected",
    wrapperClassName: "absolute top-[46.82%] left-[30.65%]",
    tooltip: {
      eyebrow: "CURRENTLY SELECTED",
      title: "Coastal Reforestation",
      subtitle: "3.6k trees planted",
    },
  },
  {
    id: "secondary-1",
    type: "secondary-image",
    wrapperClassName: "absolute top-[33.12%] left-[65.33%]",
    src: "/figmaAssets/secondary-pin-1.svg",
    alt: "Secondary pin",
  },
  {
    id: "secondary-2",
    type: "secondary-image",
    wrapperClassName: "absolute top-[71.40%] left-[48.66%]",
    src: "/figmaAssets/secondary-pin.svg",
    alt: "Secondary pin",
  },
];

export const InteractiveCampaignMapSection = (): JSX.Element => {
  return (
    <section className="relative z-0 min-h-[585px] w-full overflow-hidden rounded-none [background:radial-gradient(50%_50%_at_50%_50%,rgba(76,122,90,1)_1%,rgba(76,122,90,0)_1%),linear-gradient(0deg,rgba(231,229,228,1)_0%,rgba(231,229,228,1)_100%)]">
      <div className="absolute inset-0 bg-[url(/figmaAssets/ab6axuaa-oypp9x0mqjqjgzjx9zkt79qlob3shrjezjiscqdizar5na49rbn6sgc.png)] bg-cover bg-center" />
      <header className="absolute left-4 top-4 z-20 sm:left-6 sm:top-6">
        <ToggleGroup
          type="multiple"
          defaultValue={mapFilters.map((filter) => filter.value)}
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
                <span
                  className={`h-2 w-2 rounded-full ${filter.dotClassName}`}
                />
                <span className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 whitespace-nowrap">
                  {filter.label}
                </span>
              </span>
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </header>
      {mapPins.map((pin) => {
        if (pin.type === "selected") {
          return (
            <div key={pin.id} className={`${pin.wrapperClassName} z-20`}>
              <div className="relative flex flex-col items-center">
                <Card className="absolute bottom-[calc(100%+18px)] left-1/2 w-48 -translate-x-1/2 rounded-xl border-0 bg-white opacity-0 shadow-[0px_25px_50px_-12px_#00000040]">
                  <CardContent className="space-y-1 p-3">
                    <p className="[font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 text-[#4c7a5a]">
                      {pin.tooltip.eyebrow}
                    </p>
                    <p className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-[#1a281e]">
                      {pin.tooltip.title}
                    </p>
                    <p className="[font-family:'Public_Sans',Helvetica] text-[10px] font-normal leading-[15px] text-stone-400">
                      {pin.tooltip.subtitle}
                    </p>
                  </CardContent>
                </Card>
                <img
                  className="relative h-[88px] w-[88px]"
                  alt="Selected campaign hub"
                  src="/figmaAssets/background-border.svg"
                />
                <div className="-mt-7 h-3 w-1">
                  <div className="-translate-y-1 h-4 w-full bg-[#ffffff80] backdrop-blur-[2px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(2px)_brightness(100%)]" />
                </div>
              </div>
            </div>
          );
        }

        return (
          <img
            key={pin.id}
            className={`${pin.wrapperClassName} z-10 h-auto w-[3.57%] min-w-[22px]`}
            alt={pin.alt}
            src={pin.src}
          />
        );
      })}

      <aside className="absolute bottom-5 right-4 z-20 sm:bottom-10 sm:right-[60px]">
        <img
          className="h-[216px] w-[88px]"
          alt="Map controls"
          src="/figmaAssets/map-controls.svg"
        />
      </aside>
      <Card className="absolute bottom-5 left-4 z-20 max-w-xs rounded-2xl border-stone-100 bg-[#ffffffe6] shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] backdrop-blur-sm backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(4px)_brightness(100%)] sm:bottom-10 sm:left-10">
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
