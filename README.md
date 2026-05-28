# ContentHub-Personalized Content Dashboard

A modern SaaS-style personalized content dashboard that aggregates news articles, movie recommendations, and social posts into one unified interactive feed. Built as a frontend engineering assignment demonstrating scalable React architecture, state management, API integration, and polished UI/UX.



---

## 🔗 Links

| | |
|---|---|
| **Live Demo** | [https://personalized-dashboard-ikbl.vercel.app](https://personalized-dashboard-ikbl.vercel.app/login) |
| **GitHub Repo** | [https://github.com/sahilnikalje/personalized-dashboard](https://github.com/sahilnikalje/personalized-dashboard) |

---

## ✨ Features

### Core Features
- **Personalized Feed** — Unified feed combining real news, TMDB movies, and mock social posts
- **API Integration** — NewsAPI (via server proxy) + TMDB API with RTK Query caching
- **Search** — Global debounced search (400ms) across news and movies with live dropdown results
- **Favorites System** — Save/remove any card, persists across page refreshes
- **Dark / Light Mode** — Full theme switching, persisted in localStorage
- **Responsive Design** — Mobile, tablet, and desktop layouts

### Advanced Features
- **Drag & Drop** — Reorder feed cards using dnd-kit with smooth animations
- **Mock Authentication** — Protected routes, session persistence, login/logout flow
- **Trending Page** — Dedicated page for trending movies and breaking news
- **Settings Page** — Category preferences and theme selection
- **Redux Persist** — Favorites, preferences, and auth session survive page refresh
- **Skeleton Loaders** — Polished loading states for every API-driven section
- **Empty & Error States** — Friendly fallback UI for all edge cases
- **Framer Motion** — Page transitions, card hover effects, drag animations

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| State Management | Redux Toolkit |
| API Fetching | RTK Query |
| Animations | Framer Motion |
| Drag & Drop | dnd-kit |
| Theme | next-themes |
| Notifications | Sonner |
| Icons | Lucide React |
| Persistence | Redux Persist + localStorage |
| Deployment | Vercel |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (auth)/
│   │   └── login/          # Login page (auth route group)
│   ├── api/
│   │   └── news/           # NewsAPI server proxy (bypasses CORS)
│   ├── dashboard/          # Main feed page
│   ├── favorites/          # Saved content page
│   ├── settings/           # Preferences & theme page
│   ├── trending/           # Trending movies & news
│   ├── layout.tsx
│   └── page.tsx            # Redirects to /dashboard
│
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── Header.tsx
│   │   └── Sidebar.tsx
│   └── ui/
│       ├── EmptyState.tsx
│       ├── ErrorState.tsx
│       └── SkeletonCard.tsx
│
├── features/
│   ├── auth/               # Auth slice (login/logout)
│   ├── feed/               # Feed slice + card components
│   │   └── components/
│   │       ├── FeedContainer.tsx
│   │       ├── NewsCard.tsx
│   │       ├── MovieCard.tsx
│   │       └── SocialCard.tsx
│   ├── favorites/          # Favorites slice
│   ├── preferences/        # Category preferences slice
│   └── search/             # Search query slice
│
├── services/
│   ├── news/               # RTK Query API + transformer
│   ├── tmdb/               # RTK Query API + transformer
│   └── social/             # Mock social posts data
│
├── store/                  # Redux store + persist config
├── hooks/                  # useAppSelector, useDebounce, useHasMounted
├── providers/              # Redux + Theme + ProtectedRoute wrapper
├── types/                  # Shared TypeScript interfaces
├── constants/              # Categories, API base URLs, fallback images
└── utils/                  # cn(), formatDate()
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### 1. Clone the repository

```bash
git clone https://github.com/sahilnikalje/personalized-dashboard.git
cd personalized-dashboard
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env.local` file in the project root:

```env
# NewsAPI key — server-side only (free plan blocks browser requests)
NEWS_API_KEY=your_newsapi_key_here

# TMDB API key — browser-safe
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

#### Getting API Keys

**NewsAPI (free)**
1. Go to [https://newsapi.org](https://newsapi.org)
2. Click "Get API Key" → sign up
3. Copy your API key from the dashboard

**TMDB (free)**
1. Go to [https://www.themoviedb.org](https://www.themoviedb.org)
2. Create an account → Settings → API
3. Request a Developer API key
4. Copy the **v3 API Key**

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Login credentials

Use the demo account or fill automatically with the "Use demo credentials" button:

| Field | Value |
|---|---|
| Email | `demo@contenthub.com` |
| Password | `demo1234` |

---

## 🔐 Authentication

This project uses **mock authentication** (as permitted by the assignment spec).

- Credentials are validated against hardcoded mock users
- On success, user data is stored in Redux and persisted via Redux Persist
- All dashboard routes are protected — unauthenticated users are redirected to `/login`
- Session survives page refresh; logout clears state and redirects to login

No real backend or OAuth required to run the project.

---

## 📡 API Architecture

### NewsAPI Proxy

NewsAPI's free plan blocks direct browser requests (CORS). Requests are routed through a Next.js API route at `/api/news` which calls NewsAPI server-side and returns the data to the client.

```
Client → RTK Query → /api/news (Next.js route) → NewsAPI → normalized response
```

### TMDB API

TMDB allows direct browser requests. RTK Query calls it directly from the client using the public API key.

```
Client → RTK Query → TMDB API → normalized response
```

### Data Normalization

All API responses are normalized into a single `FeedItem` type before rendering:

```ts
interface FeedItem {
  id: string;
  type: 'news' | 'movie' | 'social';
  title: string;
  description: string;
  image: string;
  source: string;
  url?: string;
  publishedAt?: string;
  rating?: number;
  hashtags?: string[];
  likes?: number;
  comments?: number;
  avatar?: string;
  username?: string;
}
```

This unified model powers the feed, favorites, and search without component-level API knowledge.

---

## 🧠 State Management

Redux Toolkit manages all global state via isolated feature slices:

| Slice | Manages | Persisted |
|---|---|---|
| `auth` | User session, isAuthenticated | ✅ Yes |
| `favorites` | Saved content items | ✅ Yes |
| `preferences` | Selected categories | ✅ Yes |
| `feed` | Feed items, card order | ❌ No |
| `search` | Current search query | ❌ No |
| `newsApi` | RTK Query cache | ❌ No |
| `tmdbApi` | RTK Query cache | ❌ No |

Feed and search reset on refresh intentionally — fresh data is fetched on each load.

---

## 🎯 User Flow

```
/login
  └── Enter credentials → dispatches login action
        └── Redux Persist saves auth state
              └── Redirect to /dashboard

/dashboard
  ├── FeedContainer fetches news + movies
  ├── Interleaves with mock social posts
  ├── Filter tabs: All / News / Movies / Social
  ├── Drag cards to reorder (dnd-kit)
  └── Heart icon → saves to favorites

/trending
  ├── TMDB trending movies
  └── NewsAPI general headlines

/favorites
  ├── All saved items (persisted)
  └── Heart icon → removes from favorites

/settings
  ├── Theme toggle (light / dark)
  └── Category pills → affects feed content

Header search
  ├── Debounced 400ms
  ├── Queries NewsAPI + TMDB simultaneously
  └── Live dropdown with type badges
```

---

## 🏗 Commit History

The project was built feature-by-feature to demonstrate natural development progression:

```
feat: initialize Next.js dashboard project with base configuration
feat: setup scalable Redux architecture and shared utilities
feat: implement Redux slices for feed, favorites, search and preferences
feat: integrate NewsAPI and TMDB with RTK Query architecture
feat: build responsive dashboard layout with sidebar and header
feat: add reusable loading, empty and error state components
feat: create interactive feed cards for news movies and social posts
feat: implement unified personalized feed with drag and drop
feat: build personalized dashboard homepage
feat: add trending content section for movies and news
feat: implement persistent favorites system
feat: add dashboard customization and theme preferences
feat: add mock authentication with protected routes and persistent session
fix: upgrade Next.js to 15.3.6 and resolve ESLint config
docs: add README and finalize production build
```

---

## 🌐 Deployment

Deployed on **Vercel** with automatic CI/CD from the `main` branch.

Environment variables are configured in the Vercel project dashboard under Settings → Environment Variables.

To deploy your own instance:

1. Fork the repository
2. Import to [vercel.com](https://vercel.com)
3. Add `NEWS_API_KEY` and `NEXT_PUBLIC_TMDB_API_KEY` in Vercel environment variables
4. Deploy

---

## 📋 Assignment Coverage

| Requirement | Status |
|---|---|
| Personalized feed (news + movies + social) | ✅ |
| User preferences with persistence | ✅ |
| NewsAPI integration | ✅ |
| TMDB API integration | ✅ |
| Mock social feed | ✅ |
| Interactive content cards with CTA | ✅ |
| Responsive dashboard layout | ✅ |
| Sidebar + header navigation | ✅ |
| Trending section | ✅ |
| Favorites section | ✅ |
| Debounced global search | ✅ |
| Drag and drop reordering | ✅ |
| Dark / light mode with persistence | ✅ |
| Framer Motion animations | ✅ |
| Redux Toolkit state management | ✅ |
| RTK Query async data fetching | ✅ |
| localStorage / Redux Persist | ✅ |
| Skeleton loaders + empty + error states | ✅ |
| Mobile / tablet / desktop responsive | ✅ |
| Mock authentication (bonus) | ✅ |
| Vercel deployment + live link | ✅ |
