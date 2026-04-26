export type CampaignType = "impact-site" | "campaign-hub";

export interface Campaign {
  id: string;
  type: CampaignType;
  title: string;
  location: string;
  description: string;
  beforeImage: string;
  progressImage: string;
  goalLabel: string;
  goalPercent: number;
  treesGoal: number;
  stats: { value: string; label: string; iconSrc: string; iconClass: string }[];
  event: {
    date: string;
    time: string;
    place: string;
  };
  pin: {
    top: string;
    left: string;
    tooltipTitle: string;
    tooltipSubtitle: string;
  };
}

export const campaigns: Campaign[] = [
  {
    id: "coastal-reforestation",
    type: "campaign-hub",
    title: "Coastal Reforestation Project",
    location: "Tulum, Quintana Roo, Mexico",
    description:
      "Restoring the coastal mangrove ecosystem through community-led sapling planting drives along the Tulum shoreline.",
    beforeImage:
      "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    progressImage:
      "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    goalLabel: "Goal: 5,000 Saplings",
    goalPercent: 72,
    treesGoal: 5000,
    stats: [
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
    ],
    event: {
      date: "Saturday, Oct 24th",
      time: "08:00 AM - 01:00 PM",
      place: "Tulum North Entrance Gate",
    },
    pin: {
      top: "46.82%",
      left: "30.65%",
      tooltipTitle: "Coastal Reforestation",
      tooltipSubtitle: "3.6k trees planted",
    },
  },
  {
    id: "mangrove-sanctuary",
    type: "impact-site",
    title: "Mangrove Sanctuary Revival",
    location: "Cancún, Quintana Roo, Mexico",
    description:
      "Rehabilitating degraded mangrove wetlands to protect Cancún's coastline from erosion and provide wildlife habitat.",
    beforeImage:
      "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    progressImage:
      "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    goalLabel: "Goal: 3,000 Saplings",
    goalPercent: 45,
    treesGoal: 3000,
    stats: [
      {
        value: "1,350",
        label: "TREES PLANTED",
        iconSrc: "/figmaAssets/icon.svg",
        iconClass: "w-[18px] h-5",
      },
      {
        value: "92",
        label: "VOLUNTEERS",
        iconSrc: "/figmaAssets/icon-1.svg",
        iconClass: "w-6 h-3",
      },
    ],
    event: {
      date: "Sunday, Nov 2nd",
      time: "09:00 AM - 02:00 PM",
      place: "Cancún Coastal Reserve",
    },
    pin: {
      top: "33.12%",
      left: "65.33%",
      tooltipTitle: "Mangrove Sanctuary",
      tooltipSubtitle: "1.3k trees planted",
    },
  },
  {
    id: "wetland-restoration",
    type: "impact-site",
    title: "Wetland Restoration Initiative",
    location: "Chetumal, Quintana Roo, Mexico",
    description:
      "Reviving ancient wetland ecosystems in Chetumal Bay through large-scale replanting and invasive species removal.",
    beforeImage:
      "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    progressImage:
      "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    goalLabel: "Goal: 8,000 Saplings",
    goalPercent: 28,
    treesGoal: 8000,
    stats: [
      {
        value: "2,240",
        label: "TREES PLANTED",
        iconSrc: "/figmaAssets/icon.svg",
        iconClass: "w-[18px] h-5",
      },
      {
        value: "215",
        label: "VOLUNTEERS",
        iconSrc: "/figmaAssets/icon-1.svg",
        iconClass: "w-6 h-3",
      },
    ],
    event: {
      date: "Friday, Nov 7th",
      time: "07:00 AM - 12:00 PM",
      place: "Chetumal Bay Entrance",
    },
    pin: {
      top: "71.40%",
      left: "48.66%",
      tooltipTitle: "Wetland Restoration",
      tooltipSubtitle: "2.2k trees planted",
    },
  },
];

export const liveActivities = [
  {
    name: "Elena Marcas",
    action: "Just checked in at Mangrove Sanctuary",
    avatar:
      "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
  },
  {
    name: "Carlos Ruiz",
    action: "Planted 12 saplings at Tulum North",
    avatar:
      "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
  },
  {
    name: "Sofia Méndez",
    action: "Joined the Wetland Restoration team",
    avatar:
      "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
  },
  {
    name: "Mateo Vega",
    action: "Volunteered at Cancún Coastal Reserve",
    avatar:
      "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
  },
];
