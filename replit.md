# Econova – Environmental Campaign Tracker

A production-ready multi-page web application built from a Figma design. Features a full campaign tracker with interactive map, explore feed, user profile, and auth pages.

## Architecture

- **Framework**: Next.js 14 (App Router), TypeScript
- **Styling**: Tailwind CSS v3, shadcn/ui components (Radix UI primitives)
- **Icons**: Lucide React, react-icons/si (social logos)
- **Fonts**: Cairo (headings), Public Sans (body) — loaded via `next/font/google`
- **Port**: 5000 via `next dev -p 5000`
- **Workflow**: "Start application" → `next dev -p 5000`

## Design Tokens

- Dark: `#1a281e` (forest dark green)
- Green: `#4c7a5a` (mid green, primary accent)
- Cream: `#fdfbef` (background)

## Route Structure

```
app/
  layout.tsx              # Root layout: html/body + fonts + globals.css
  globals.css             # Tailwind base + custom CSS variables
  (main)/
    layout.tsx            # Adds Navbar to all main routes
    page.tsx              # / Home — hero, before/after slider, 3-col activity feed
    campaigns/page.tsx    # /campaigns — filterable campaign grid
    explore/page.tsx      # /explore — social feed with tabs + sidebar
    map/page.tsx          # /map — interactive campaign map with sidebar panel
    profile/page.tsx      # /profile — user profile with tabs and impact stats
  sign-in/
    layout.tsx            # Auth layout (no Navbar)
    page.tsx              # /sign-in — two-panel auth page
  sign-up/
    layout.tsx            # Auth layout (no Navbar)
    page.tsx              # /sign-up — two-panel registration page
```

## Component Structure

```
components/
  Navbar.tsx        # Sticky top nav with active link highlighting, search, mobile drawer
  CampaignCard.tsx  # Before/After bento card with progress bar and stats
  PostCard.tsx      # Social post card with like/save interactions
  Sidebar.tsx       # Campaign detail panel used on /map
  ui/
    avatar.tsx
    badge.tsx
    button.tsx
    input.tsx
    label.tsx
    progress.tsx
lib/
  utils.ts          # cn() helper (clsx + tailwind-merge)
  campaigns.ts      # Campaign data + liveActivities arrays
```

## Key Features

- **Home**: Drag-to-compare Before/After slider, 3-column community feed (trending posts, active campaigns, global stats)
- **Map**: Full-screen map with campaign pins, animated live-activity ticker, collapsible sidebar with detailed campaign info
- **Campaigns**: Search + type filter (Campaign Hub / Impact Site), responsive 3-col grid
- **Explore**: Trending/Recent/Following feed tabs, post cards with like/save, sidebar with tags and stats
- **Profile**: Avatar, cover, stats, badges, tabbed Posts/Campaigns/Impact views
- **Auth**: No-Navbar two-panel layout (brand panel left, form right) with OAuth buttons
