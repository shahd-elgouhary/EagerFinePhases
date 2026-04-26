export interface Campaign {
  id: string;
  title: string;
  location: string;
  beforeImage: string;
  progressImage: string;
  goalLabel: string;
  goalPercent: number;
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
    title: "Coastal Reforestation Project",
    location: "Tulum, Quintana Roo, Mexico",
    beforeImage:
      "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    progressImage:
      "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    goalLabel: "Goal: 5,000 Saplings",
    goalPercent: 72,
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
    title: "Mangrove Sanctuary Revival",
    location: "Cancún, Quintana Roo, Mexico",
    beforeImage:
      "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    progressImage:
      "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    goalLabel: "Goal: 3,000 Saplings",
    goalPercent: 45,
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
    title: "Wetland Restoration Initiative",
    location: "Chetumal, Quintana Roo, Mexico",
    beforeImage:
      "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
    progressImage:
      "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
    goalLabel: "Goal: 8,000 Saplings",
    goalPercent: 28,
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
