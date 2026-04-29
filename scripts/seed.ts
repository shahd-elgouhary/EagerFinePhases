import { db } from "../lib/db";
import { users, campaigns, posts } from "../shared/schema";
import bcrypt from "bcryptjs";
import { sql } from "drizzle-orm";

async function seed() {
  console.log("Seeding database...");

  // Clean existing seed data
  await db.execute(sql`TRUNCATE posts, campaign_members, post_likes, post_saves, campaigns, users RESTART IDENTITY CASCADE`);

  // Seed users
  const hashedPw = await bcrypt.hash("password123", 12);
  const [elena, carlos, sofia, mateo] = await db.insert(users).values([
    {
      username: "elena.marcas",
      email: "elena@example.com",
      password: hashedPw,
      displayName: "Elena Marcas",
      bio: "Environmental steward passionate about coastal reforestation. 3+ years planting native species across the Yucatán Peninsula.",
      location: "Tulum, Mexico",
      avatarUrl: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    },
    {
      username: "carlos.ruiz",
      email: "carlos@example.com",
      password: hashedPw,
      displayName: "Carlos Ruiz",
      bio: "Reforestation volunteer from Cancún.",
      location: "Cancún, Mexico",
      avatarUrl: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    },
    {
      username: "sofia.mendez",
      email: "sofia@example.com",
      password: hashedPw,
      displayName: "Sofia Méndez",
      bio: "Wetland restoration specialist.",
      location: "Chetumal, Mexico",
      avatarUrl: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    },
    {
      username: "mateo.vega",
      email: "mateo@example.com",
      password: hashedPw,
      displayName: "Mateo Vega",
      bio: "Urban greening advocate.",
      location: "Mexico City, Mexico",
      avatarUrl: "/figmaAssets/ab6axuanvojescuf1mrvnj0ya58xp8gi3mtvhndatzhm47yd3ykaop3v-tnlwexd.png",
    },
  ]).returning();

  // Seed campaigns
  const [coastal, mangrove, wetland] = await db.insert(campaigns).values([
    {
      slug: "coastal-reforestation",
      type: "campaign-hub",
      title: "Coastal Reforestation Project",
      location: "Tulum, Quintana Roo, Mexico",
      description: "Restoring the coastal mangrove ecosystem through community-led sapling planting drives along the Tulum shoreline.",
      beforeImage: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
      progressImage: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
      treesGoal: 5000,
      treesPlanted: 3612,
      volunteers: 148,
      eventDate: "Saturday, Oct 24th",
      eventTime: "08:00 AM - 01:00 PM",
      eventPlace: "Tulum North Entrance Gate",
      pinTop: "46.82%",
      pinLeft: "30.65%",
    },
    {
      slug: "mangrove-sanctuary",
      type: "impact-site",
      title: "Mangrove Sanctuary Revival",
      location: "Cancún, Quintana Roo, Mexico",
      description: "Rehabilitating degraded mangrove wetlands to protect Cancún's coastline from erosion and provide wildlife habitat.",
      beforeImage: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
      progressImage: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
      treesGoal: 3000,
      treesPlanted: 1350,
      volunteers: 92,
      eventDate: "Sunday, Nov 2nd",
      eventTime: "09:00 AM - 02:00 PM",
      eventPlace: "Cancún Coastal Reserve",
      pinTop: "33.12%",
      pinLeft: "65.33%",
    },
    {
      slug: "wetland-restoration",
      type: "impact-site",
      title: "Wetland Restoration Initiative",
      location: "Chetumal, Quintana Roo, Mexico",
      description: "Reviving ancient wetland ecosystems in Chetumal Bay through large-scale replanting and invasive species removal.",
      beforeImage: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
      progressImage: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
      treesGoal: 8000,
      treesPlanted: 2240,
      volunteers: 215,
      eventDate: "Friday, Nov 7th",
      eventTime: "07:00 AM - 12:00 PM",
      eventPlace: "Chetumal Bay Entrance",
      pinTop: "71.40%",
      pinLeft: "48.66%",
    },
  ]).returning();

  // Seed posts
  await db.insert(posts).values([
    {
      authorId: elena.id,
      campaignId: coastal.id,
      title: "Planted 50 native oaks in the Retiro buffer zone today.",
      body: "The soil was perfect after the morning rain. Special thanks to the local nursery for the saplings! This is our 3rd week on-site and the progress is incredible.",
      imageUrl: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
      tag: "Reforestation",
      location: "Tulum, Mexico",
      likes: 124,
      comments: 18,
    },
    {
      authorId: carlos.id,
      campaignId: mangrove.id,
      title: "2 years later, the burned hill is showing signs of life.",
      body: "Biodiversity is returning! We counted 12 new bird species this month alone. The recovery is real and it's breathtaking to witness.",
      imageUrl: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
      tag: "Wildlife",
      location: "Cancún, Mexico",
      likes: 89,
      comments: 31,
    },
    {
      authorId: sofia.id,
      campaignId: wetland.id,
      title: "Chetumal Bay restoration: Phase 2 complete.",
      body: "We've cleared 3 hectares of invasive species and replanted with native wetland flora. The team was amazing — 47 volunteers showed up on a Saturday!",
      imageUrl: "/figmaAssets/ab6axudchdf5r2xqdnkqp20bjpqrddkqdhkr-c1ocltlckgacao5no7-hmvxt0-c.png",
      tag: "Wetlands",
      location: "Chetumal, Mexico",
      likes: 203,
      comments: 45,
    },
    {
      authorId: mateo.id,
      campaignId: coastal.id,
      title: "Urban rooftop garden turned community hub.",
      body: "Started with 12 raised beds. Now we have 80+ families growing their own food and our carbon offset score has tripled.",
      imageUrl: "/figmaAssets/ab6axucjk39usfnoqzursffugo-bi9--iio7detul2eklqdm-4ng5gzw5c12dtoq.png",
      tag: "Urban Garden",
      location: "Mexico City, Mexico",
      likes: 157,
      comments: 22,
    },
  ]);

  console.log("✓ Seeded users, campaigns, and posts.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
