import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  X,
  MapPin,
  CalendarDays,
  Navigation,
  Users,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Campaign } from "@/data/campaigns";

interface Props {
  campaign: Campaign;
  onClose: () => void;
}

export const CampaignOverviewSidebarSection = ({
  campaign,
  onClose,
}: Props): JSX.Element => {
  const { toast } = useToast();
  const [joined, setJoined] = useState<Set<string>>(new Set());
  const [descExpanded, setDescExpanded] = useState(false);

  const isJoined = joined.has(campaign.id);

  const handleJoin = () => {
    if (isJoined) return;
    setJoined((prev) => new Set(prev).add(campaign.id));
    toast({
      title: "You've joined the campaign!",
      description: `Welcome to the ${campaign.title} team. We'll send details to your email.`,
    });
  };

  const typeBadgeStyle =
    campaign.type === "impact-site"
      ? "bg-red-50 text-red-600 hover:bg-red-50"
      : "bg-[#4c7a5a1a] text-[#4c7a5a] hover:bg-[#4c7a5a1a]";

  const typeLabel =
    campaign.type === "impact-site" ? "IMPACT SITE" : "ACTIVE CAMPAIGN";

  const treesPlanted = campaign.stats.find((s) =>
    s.label.includes("TREES")
  )?.value;
  const volunteers = campaign.stats.find((s) =>
    s.label.includes("VOLUNTEER")
  )?.value;

  return (
    <aside
      className="relative z-[1] flex h-full w-full flex-col items-start border-r border-stone-200 bg-[#fdfbefe6] shadow-[0px_25px_50px_-12px_#00000040] backdrop-blur-sm overflow-y-auto"
      data-testid="campaign-sidebar"
    >
      <div className="flex w-full flex-col items-start gap-3 px-8 pt-8 pb-16">

        {/* Header badge + close */}
        <header className="flex w-full items-center justify-between">
          <Badge
            className={`rounded-full px-3 py-1 [font-family:'Public_Sans',Helvetica] text-xs font-normal tracking-[0.60px] leading-4 ${typeBadgeStyle}`}
            data-testid="badge-campaign-type"
          >
            {typeLabel}
          </Badge>
          <button
            type="button"
            aria-label="Close campaign overview"
            onClick={onClose}
            className="shrink-0 text-stone-400 hover:text-stone-600 transition-colors p-1 rounded-md hover:bg-stone-100"
            data-testid="button-close-sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Title */}
        <h2
          className="w-full [font-family:'Cairo',Helvetica] text-2xl font-normal leading-[30px] text-[#1a281e] transition-all duration-300"
          data-testid="text-campaign-title"
        >
          {campaign.title}
        </h2>

        {/* Location */}
        <div className="flex w-full items-center gap-2">
          <MapPin className="h-3.5 w-3 shrink-0 text-stone-400" />
          <p
            className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-stone-500"
            data-testid="text-campaign-location"
          >
            {campaign.location}
          </p>
        </div>

        {/* Description with expand toggle */}
        <div className="w-full">
          <p
            className={`[font-family:'Public_Sans',Helvetica] text-sm leading-6 text-stone-500 transition-all duration-300 ${
              descExpanded ? "" : "line-clamp-2"
            }`}
            data-testid="text-campaign-description"
          >
            {campaign.description}
          </p>
          <button
            onClick={() => setDescExpanded((v) => !v)}
            className="mt-1 flex items-center gap-1 [font-family:'Public_Sans',Helvetica] text-xs text-[#4c7a5a] hover:underline"
            data-testid="button-toggle-description"
          >
            {descExpanded ? (
              <>Less <ChevronUp className="h-3 w-3" /></>
            ) : (
              <>Read more <ChevronDown className="h-3 w-3" /></>
            )}
          </button>
        </div>

        {/* Before / Progress images */}
        <section className="grid w-full grid-cols-2 gap-3 pt-2">
          {[
            {
              label: "BEFORE",
              image: campaign.beforeImage,
              labelClass: "bg-[#00000080]",
            },
            {
              label: "PROGRESS",
              image: campaign.progressImage,
              labelClass: "bg-[#4c7a5acc]",
            },
          ].map((item) => (
            <article key={item.label} className="relative flex flex-col items-start">
              <div
                className="h-32 w-full rounded-xl border border-solid border-[#ffffff33] bg-cover bg-center shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] transition-all duration-500"
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

        {/* Progress */}
        <section className="flex w-full flex-col items-start gap-5 pt-2">
          <div className="flex w-full flex-col items-start gap-2">
            <div className="flex w-full items-start justify-between">
              <p
                className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-stone-700"
                data-testid="text-campaign-goal"
              >
                {campaign.goalLabel}
              </p>
              <p
                className="[font-family:'Public_Sans',Helvetica] text-sm font-semibold leading-5 text-[#4c7a5a]"
                data-testid="text-campaign-percent"
              >
                {campaign.goalPercent}%
              </p>
            </div>
            <Progress
              value={campaign.goalPercent}
              className="h-3 w-full overflow-hidden rounded-full bg-stone-200 [&>div]:bg-[#4c7a5a] [&>div]:transition-all [&>div]:duration-700"
            />
            <p className="[font-family:'Public_Sans',Helvetica] text-xs text-stone-400">
              {Math.round((campaign.goalPercent / 100) * campaign.treesGoal).toLocaleString()} of {campaign.treesGoal.toLocaleString()} saplings planted
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid w-full grid-cols-2 gap-3">
            {campaign.stats.map((stat) => (
              <Card
                key={stat.label}
                className="rounded-xl border border-stone-100 bg-[#ffffff80] shadow-none hover:shadow-sm hover:border-stone-200 transition-all"
                data-testid={`card-stat-${stat.label.toLowerCase().replace(/ /g, "-")}`}
              >
                <CardContent className="flex h-full flex-col items-start p-4">
                  <img
                    className={stat.iconClass}
                    alt=""
                    aria-hidden="true"
                    src={stat.iconSrc}
                  />
                  <div className="pt-2">
                    <div className="[font-family:'Public_Sans',Helvetica] text-xl font-semibold text-[#1a281e]">
                      {stat.value}
                    </div>
                    <div className="[font-family:'Public_Sans',Helvetica] text-xs font-normal tracking-[-0.40px] text-stone-500">
                      {stat.label}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Volunteer count strip */}
        <div className="flex w-full items-center justify-between rounded-xl bg-stone-50 border border-stone-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-stone-400" />
            <span className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-600">
              {volunteers} volunteers active
            </span>
          </div>
          <span className="[font-family:'Public_Sans',Helvetica] text-xs text-[#4c7a5a] font-medium">
            +12 this week
          </span>
        </div>

        {/* Upcoming event card */}
        <Card className="relative w-full rounded-2xl border-0 bg-[#1a281e] shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]">
          <CardContent className="relative flex flex-col items-start gap-4 p-6">
            <div className="flex w-full items-center gap-2">
              <CalendarDays className="h-5 w-5 shrink-0 text-[#4c7a5a]" />
              <h3 className="[font-family:'Public_Sans',Helvetica] text-base font-normal leading-6 text-white">
                Upcoming Planting Event
              </h3>
            </div>

            <div className="flex w-full flex-col items-start gap-3 pb-1 opacity-90">
              <div className="flex w-full items-start gap-3">
                <CalendarDays className="h-4 w-4 shrink-0 text-stone-400 mt-0.5" />
                <div className="inline-flex flex-col items-start">
                  <p
                    className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-white"
                    data-testid="text-event-date"
                  >
                    {campaign.event.date}
                  </p>
                  <p className="[font-family:'Public_Sans',Helvetica] text-xs font-normal leading-4 text-stone-400">
                    {campaign.event.time}
                  </p>
                </div>
              </div>

              <div className="flex w-full items-start gap-3">
                <Navigation className="h-4 w-4 shrink-0 text-stone-400 mt-0.5" />
                <p
                  className="[font-family:'Public_Sans',Helvetica] text-sm font-normal leading-5 text-white"
                  data-testid="text-event-place"
                >
                  {campaign.event.place}
                </p>
              </div>
            </div>

            <Button
              onClick={handleJoin}
              disabled={isJoined}
              className={`h-auto w-full rounded-xl px-0 py-3 [font-family:'Public_Sans',Helvetica] text-base font-normal leading-6 text-white transition-all duration-300 ${
                isJoined
                  ? "bg-stone-600 cursor-default"
                  : "bg-[#4c7a5a] hover:bg-[#3a6349]"
              }`}
              data-testid="button-join-campaign"
            >
              {isJoined ? (
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Joined!
                </span>
              ) : (
                "Join this Campaign"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Share strip */}
        <div className="flex w-full items-center justify-center pt-1">
          <button className="[font-family:'Public_Sans',Helvetica] text-sm text-stone-400 hover:text-[#4c7a5a] transition-colors underline underline-offset-2">
            Share this campaign
          </button>
        </div>

      </div>
    </aside>
  );
};
