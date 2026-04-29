# Econova – Environmental Campaign Tracker

A production-ready multi-page web application. Full-stack: Next.js 14 (App Router) frontend + Next.js API Routes backend + PostgreSQL via Drizzle ORM.

## Architecture

- **Framework**: Next.js 14 (App Router), TypeScript
- **Database**: PostgreSQL (Replit built-in) via Drizzle ORM
- **Auth**: Cookie-based sessions (httpOnly, base64-encoded JSON), bcryptjs for password hashing
- **Styling**: Tailwind CSS v3, shadcn/ui components (Radix UI primitives)
- **Icons**: Lucide React, react-icons/si (social logos)
- **Fonts**: Cairo (headings), Public Sans (body) — loaded via `next/font/google`
- **Port**: 5000 via `next dev -p 5000`
- **Workflow**: "Start application" → `next dev -p 5000`

## Design Tokens

- Dark: `#1a281e` — Forest dark green (backgrounds, buttons)
- Green: `#4c7a5a` — Mid green (primary accent, progress bars)
- Cream: `#fdfbef` — Background

## Database Schema (`shared/schema.ts`)

Tables:
- `users` — id (UUID), username, email, password (bcrypt), displayName, bio, location, avatarUrl, createdAt
- `campaigns` — id, slug, type (campaign-hub|impact-site), title, location, description, beforeImage, progressImage, treesGoal, treesPlanted, volunteers, eventDate/Time/Place, pinTop/Left, createdAt
- `posts` — id, authorId (→users), campaignId (→campaigns), title, body, imageUrl, tag, location, likes, comments, createdAt
- `postLikes` — userId, postId
- `postSaves` — userId, postId
- `campaignMembers` — userId, campaignId, joinedAt

## API Routes (`app/api/`)

```
POST /api/auth/signup    — create account (returns session cookie)
POST /api/auth/signin    — sign in (returns session cookie)
POST /api/auth/signout   — clear session cookie
GET  /api/auth/me        — current user from session

GET  /api/campaigns      — all campaigns with goalPercent
GET  /api/campaigns/:id  — single campaign by slug or ID
POST /api/campaigns/:id/join — join campaign (auth required)

GET  /api/posts          — all posts with author + campaignTitle
POST /api/posts          — create post (auth required)
POST /api/posts/:id/like — toggle like (auth required)
POST /api/posts/:id/save — toggle save (auth required)

GET  /api/profile        — current user profile + posts + campaigns (auth required)
GET  /api/stats          — global treesPlanted, volunteers, campaigns count
```

## Route Structure

```
app/
  layout.tsx              # Root: html/body + fonts + globals.css
  globals.css
  (main)/
    layout.tsx            # Adds Navbar
    page.tsx              # / Home — hero, before/after slider, live DB data
    campaigns/page.tsx    # /campaigns — DB campaigns with filter/search
    explore/page.tsx      # /explore — DB posts with like/save
    map/page.tsx          # /map — DB campaigns on map with sidebar
    profile/page.tsx      # /profile — user profile
  sign-in/
    layout.tsx / page.tsx # Auth — no Navbar, calls /api/auth/signin
  sign-up/
    layout.tsx / page.tsx # Auth — no Navbar, calls /api/auth/signup
  api/
    auth/signup|signin|signout|me/route.ts
    campaigns/[id]/join/route.ts
    posts/[id]/like|save/route.ts
    profile/route.ts
    stats/route.ts
```

## Key Files

- `shared/schema.ts` — Drizzle table definitions + Zod schemas + types
- `lib/db.ts` — Drizzle + pg Pool connection (uses DATABASE_URL)
- `lib/storage.ts` — All DB CRUD operations (storage object)
- `lib/session.ts` — Cookie-based session helpers
- `lib/api.ts` — Frontend fetch wrapper for all API calls
- `lib/campaigns.ts` — Static liveActivities data (for map ticker)
- `scripts/seed.ts` — Database seed script (run with `npx tsx scripts/seed.ts`)

## Seed Data

4 users (elena, carlos, sofia, mateo) — all with password `password123`
Demo login: `elena@example.com` / `password123`
3 campaigns, 4 posts pre-seeded.

## Component Structure

```
components/
  Navbar.tsx        # Sticky nav with active link, search, mobile drawer
  CampaignCard.tsx  # Before/After bento with progress bar
  PostCard.tsx      # Social post card with like/save
  Sidebar.tsx       # Campaign detail panel for /map
  ui/avatar|badge|button|input|label|progress.tsx
```
