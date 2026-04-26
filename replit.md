# Econova – Interactive Campaign Map

A production-ready web application built from a Figma design (node 27-2097). It shows an interactive map of reforestation campaigns, with a collapsible sidebar that updates dynamically when map pins are clicked.

## Architecture

- **Frontend**: React 18 + Vite + TypeScript, served via Express
- **Backend**: Express 5 + Drizzle ORM + PostgreSQL
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React
- **Routing**: Wouter
- **Data fetching**: TanStack Query v5
- **Fonts**: Cairo (headings), Public Sans (body)

## Project Structure

```
client/
  src/
    data/campaigns.ts          — Static campaign data for the 3 map pins
    pages/
      InteractiveMap.tsx       — Main page with selected-campaign state
      sections/
        PrimaryNavigationHeaderSection.tsx
        CampaignOverviewSidebarSection.tsx  — Dynamic sidebar (receives campaign prop)
        InteractiveCampaignMapSection.tsx   — Interactive map with clickable pins
    components/ui/             — shadcn/ui component library
server/
  index.ts                     — Express entry point
  routes.ts                    — API routes
  storage.ts                   — Data access layer
shared/
  schema.ts                    — Drizzle ORM schema + Zod types
client/public/figmaAssets/     — All images/SVGs from Figma
```

## Key Features

- **Interactive map pins**: Clicking any of the 3 campaign pins updates the sidebar
- **Hover tooltips**: Hovering over unselected pins shows a tooltip preview
- **Dynamic sidebar**: Campaign title, location, before/after images, progress bar, stats, and upcoming event all update per selection
- **Smooth transitions**: Progress bar and content animate on campaign switch

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variable
DATABASE_URL=postgresql://user:password@localhost:5432/econova

# 3. Push database schema
npm run db:push

# 4. Start development server
npm run dev
# App runs on http://localhost:5000
```

## Color Tokens (from Figma)

| Token       | Value     |
|-------------|-----------|
| Dark green  | `#1a281e` |
| Brand green | `#4c7a5a` |
| Cream bg    | `#fdfbef` |
| Border      | `#e7e5e4` |
| Muted text  | `#78716c` |
