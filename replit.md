# Econova – Environmental Campaign Tracker

A production-ready multi-page web application built from a Figma design (file key: jJKhdzlD3Tqls1Ycf2Jf54). Features a full campaign tracker with interactive map, explore feed, user profile, and auth pages.

## Architecture

- **Frontend**: React 18 + Vite + TypeScript, served via Express
- **Backend**: Express 5 + Drizzle ORM
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React, react-icons/si (social logos)
- **Routing**: Wouter
- **Data fetching**: TanStack Query v5
- **Fonts**: Cairo (headings), Public Sans (body)

## Design Tokens

- `#1a281e` — dark forest green (primary bg, headings)
- `#4c7a5a` — mid-green (accents, buttons, active states)
- `#fdfbef` — cream (main background)
- `#e7e5e4` / `stone-200` — border/divider color

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | HomePage | Landing page with hero, before/after slider, activity feed |
| `/map` | InteractiveMap | Interactive map with campaign pins & sidebar |
| `/explore` | ExplorePage | Social feed with search/filter/tabs |
| `/campaigns` | CampaignsPage | Campaign grid with search/filter |
| `/profile` | UserProfilePage | User profile with tabs (Posts/Campaigns/Impact) |
| `/sign-in` | SignInPage | Auth page (two-panel layout) |
| `/sign-up` | SignUpPage | Auth page (two-panel layout) |

## Project Structure

```
client/
  src/
    data/campaigns.ts               — Static campaign data (3 campaigns)
    components/
      AppShell.tsx                  — Layout wrapper: sticky nav header + main content
      ui/                           — shadcn/ui component library
    pages/
      HomePage.tsx                  — Hero + before/after slider + 3-col activity feed
      InteractiveMap.tsx            — Map page (no own header; AppShell provides it)
      CampaignsPage.tsx             — Campaign grid with type filter & search
      ExplorePage.tsx               — Post feed with trending tags sidebar
      UserProfilePage.tsx           — Profile header + tabbed post/campaign/impact view
      SignInPage.tsx                — Two-panel auth page
      SignUpPage.tsx                — Two-panel auth page
      sections/
        CampaignOverviewSidebarSection.tsx  — Sidebar for selected campaign
        InteractiveCampaignMapSection.tsx   — Interactive map with pins
        PrimaryNavigationHeaderSection.tsx  — (legacy, not used in main routing)
server/
  index.ts                          — Express entry point
  routes.ts                         — API routes
  storage.ts                        — In-memory storage interface
shared/
  schema.ts                         — Drizzle schema + Zod types
```

## Static Assets

All Figma-extracted images are in `client/public/figmaAssets/`. Referenced as `/figmaAssets/...` in code.

## Key Notes

- No real database needed — uses MemStorage
- Auth pages (`/sign-in`, `/sign-up`) skip the AppShell (no nav header)
- InteractiveMap fills `calc(100vh - 80px)` since AppShell header is 80px
- Map pin search/filter is internal to InteractiveCampaignMapSection
