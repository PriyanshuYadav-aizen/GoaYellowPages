# Goa Yellow Pages — Full Redesign Specification (`design.md`)

> **Purpose:** This document is the single source of truth for Codex (or any AI/developer) to fully redesign the Goa Yellow Pages frontend. Follow every section precisely. Do not skip or reorder steps.

---

## 1. Project Overview

**What this app is:** A business directory website for Goa, India — like Yelp or JustDial but specifically for Goa. Users can browse, filter, and view detailed profiles of local businesses. Registered users can leave ratings/reviews. Admins manage listings.

**Tech stack (do not change):**
- React + TypeScript + Vite
- Tailwind CSS (config at `client/tailwind.config.js`)
- React Router DOM
- GraphQL API backend (already connected)
- Cloudinary for images

**Root source folder:** `client/src/`

---

## 2. Design Philosophy

The current design uses a generic blue-purple gradient that feels generic and disconnected from Goa. The redesign must feel **authentically Goanese** — tropical, warm, inviting, coastal — while being modern, professional, and trustworthy like a premium directory (Yelp-level quality).

### Core Design Principles
1. **Tropical Warmth** — Colors should evoke Goa's beaches, sunsets, spice markets, and turquoise sea
2. **Clarity First** — Business listings must be scannable at a glance. Every card must communicate: name, category, location, rating, price tier, open/closed
3. **Mobile-First** — Most users in India access on mobile. Every layout must work perfectly at 375px width
4. **Performance** — No heavy animations on scroll. Subtle, purposeful micro-interactions only
5. **Trust Signals** — Ratings, review counts, verified badges, open/closed status must be prominent
6. **Accessible** — Minimum contrast ratio WCAG AA (4.5:1) everywhere

---

## 3. Brand Identity

### 3.1 Logo & Brand Name
- Brand name: **Goa Yellow Pages**
- Logo concept: A stylized coconut palm leaf OR a compass/map pin combined with a yellow sun motif
- The logo in the Navbar should use the font `Borel` (already imported) for "Goa" and a regular bold sans-serif for "Yellow Pages"
- Favicon: A small yellow sun/palm icon (use emoji 🌴 as placeholder until real icon is provided)

### 3.2 Color Palette

Replace the current blue/purple palette entirely with a **Goa Tropical** palette:

```css
/* PRIMARY — Goa Sunset Orange (warm, energetic, tropical) */
--color-primary-50:  #fff7ed;
--color-primary-100: #ffedd5;
--color-primary-200: #fed7aa;
--color-primary-300: #fdba74;
--color-primary-400: #fb923c;
--color-primary-500: #f97316;   /* Main primary — use for buttons, links, accents */
--color-primary-600: #ea580c;   /* Hover state */
--color-primary-700: #c2410c;
--color-primary-800: #9a3412;
--color-primary-900: #7c2d12;

/* SECONDARY — Goa Turquoise Sea */
--color-secondary-50:  #f0fdfa;
--color-secondary-100: #ccfbf1;
--color-secondary-200: #99f6e4;
--color-secondary-300: #5eead4;
--color-secondary-400: #2dd4bf;
--color-secondary-500: #14b8a6;  /* Main secondary */
--color-secondary-600: #0d9488;
--color-secondary-700: #0f766e;
--color-secondary-800: #115e59;
--color-secondary-900: #134e4a;

/* ACCENT — Goa Golden Sand */
--color-accent-400: #fbbf24;
--color-accent-500: #f59e0b;    /* Stars, highlights, badges */

/* NEUTRAL — Warm Gray (not cold blue-gray) */
--color-neutral-50:  #fafaf9;
--color-neutral-100: #f5f5f4;
--color-neutral-200: #e7e5e4;
--color-neutral-300: #d6d3d1;
--color-neutral-400: #a8a29e;
--color-neutral-500: #78716c;
--color-neutral-600: #57534e;
--color-neutral-700: #44403c;
--color-neutral-800: #292524;
--color-neutral-900: #1c1917;

/* SEMANTIC */
--color-success: #16a34a;   /* Open/available */
--color-danger:  #dc2626;   /* Closed/error */
--color-warning: #d97706;   /* Mid-range price */
--color-info:    #0891b2;   /* Info badges */

/* SURFACE */
--color-bg-page:   #fafaf9;   /* Page background — warm off-white */
--color-bg-card:   #ffffff;
--color-bg-footer: #1c1917;   /* Very dark warm brown-black */
```

### 3.3 Update `tailwind.config.js`

Replace the entire `theme.extend.colors` section:

```js
colors: {
  primary: {
    50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
    400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
    800: '#9a3412', 900: '#7c2d12',
  },
  secondary: {
    50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
    400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
    800: '#115e59', 900: '#134e4a',
  },
  accent: {
    400: '#fbbf24', 500: '#f59e0b', 600: '#d97706',
  },
  neutral: {
    50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1',
    400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c',
    800: '#292524', 900: '#1c1917',
  },
},
```

### 3.4 Typography

```css
/* Add to tailwind.config.js theme.extend.fontFamily */
fontFamily: {
  sans:    ['Inter', 'system-ui', 'sans-serif'],
  borel:   ['Borel', 'cursive'],     /* Brand name only */
  display: ['Poppins', 'Inter', 'sans-serif'],  /* Headings */
}
```

Add to `index.html` `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Borel&family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap" rel="stylesheet">
```

**Type Scale:**
| Usage | Size | Weight | Font |
|---|---|---|---|
| Hero H1 | `text-5xl` → `text-7xl` | 800 | Poppins |
| Page H2 | `text-3xl` → `text-4xl` | 700 | Poppins |
| Card Title | `text-lg` → `text-xl` | 700 | Inter |
| Body | `text-base` | 400 | Inter |
| Small / Labels | `text-sm` | 500 | Inter |
| Micro / Badges | `text-xs` | 600 | Inter |

### 3.5 Spacing & Border Radius
- Default border-radius for cards: `rounded-2xl` (16px)
- Buttons: `rounded-xl` (12px)
- Badges/chips: `rounded-full`
- Input fields: `rounded-xl`
- Section padding: `py-16 px-4 sm:px-6 lg:px-8`
- Card padding: `p-5`
- Max content width: `max-w-7xl mx-auto`

### 3.6 Shadows

Replace neumorphic shadows with clean elevation shadows:

```css
/* Add to index.css */
.shadow-card   { box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06); }
.shadow-card-hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.08); }
.shadow-button { box-shadow: 0 2px 8px rgba(249,115,22,0.35); }
```

---

## 4. Global Components

### 4.1 `Navbar.tsx` — Full Rewrite

**Current problem:** Plain white bar with no visual hierarchy. Login/Register buttons are crammed without visual logic.

**New design:**
```
[ 🌴 Goa Yellow Pages ]  [Home] [Businesses] [About] [Contact]  [Login] [List Your Business]
```

**Specifications:**
- Background: `bg-white/95 backdrop-blur-md` with `border-b border-neutral-100`
- Position: `sticky top-0 z-50`
- Height: `h-16`
- Logo: Borel font "Goa" in `text-primary-500` + Inter bold "Yellow Pages" in `text-neutral-800`
- Nav links: `text-neutral-600 hover:text-primary-500 font-medium text-sm transition-colors`
- Active link: `text-primary-600 font-semibold` (use `useLocation` to detect active route)
- **Desktop right side:** Two buttons only:
  - "Sign In" → ghost button: `border border-neutral-300 text-neutral-700 hover:border-primary-400 hover:text-primary-600 rounded-xl px-4 py-2 text-sm font-medium`
  - "List Business" → filled: `bg-primary-500 hover:bg-primary-600 text-white rounded-xl px-4 py-2 text-sm font-semibold shadow-button transition-all`
- When user is logged in: Show avatar initials circle + "Logout" ghost button
- **Mobile:** Hamburger menu — slide-in drawer from the right with all nav links stacked. Use `useState` for open/close. Overlay backdrop `bg-black/40`.
- **Remove:** The separate Admin Login / Admin Register buttons from the navbar entirely. Admin accesses via `/login` directly (keep the route, just don't show in nav).

### 4.2 `HeroSection.tsx` — Full Rewrite

**Current problem:** Tiny hero with only a text gradient. No visual impact.

**New design:** Full-width immersive hero with a tropical Goa vibe.

```tsx
// Layout structure:
<section className="relative min-h-[70vh] flex items-center overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-teal-50">
  {/* Decorative blobs — subtle, don't animate on scroll */}
  <div className="absolute top-0 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
  <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
  
  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
    <div className="max-w-3xl">
      {/* Eyebrow tag */}
      <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 text-primary-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
        <span>🌴</span> Goa's #1 Business Directory
      </div>
      
      {/* Headline */}
      <h1 className="font-display font-extrabold text-5xl md:text-6xl lg:text-7xl text-neutral-900 leading-tight mb-6">
        Discover the Best<br/>
        <span className="text-primary-500">Businesses</span> in Goa
      </h1>
      
      {/* Subtext */}
      <p className="text-xl text-neutral-600 mb-10 leading-relaxed max-w-2xl">
        From beachside shacks to luxury resorts — find authentic ratings, 
        real reviews, and trusted contact details for every business in paradise.
      </p>
      
      {/* Inline search bar — the primary CTA */}
      <div className="flex flex-col sm:flex-row gap-3 max-w-2xl bg-white rounded-2xl shadow-lg p-2 border border-neutral-200">
        <div className="flex-1 flex items-center gap-3 px-4">
          <svg {/* search icon */} className="w-5 h-5 text-neutral-400" />
          <input 
            placeholder="Search restaurants, hotels, cafes..."
            className="flex-1 outline-none text-neutral-800 placeholder-neutral-400 text-base bg-transparent"
          />
        </div>
        <select className="border-l border-neutral-200 px-4 py-2 text-neutral-600 bg-transparent outline-none text-sm hidden sm:block">
          <option>All Categories</option>
          {/* categories list */}
        </select>
        <button className="bg-primary-500 hover:bg-primary-600 text-white rounded-xl px-6 py-3 font-semibold transition-all shadow-button whitespace-nowrap">
          Search
        </button>
      </div>
      
      {/* Quick category pills */}
      <div className="flex flex-wrap gap-2 mt-6">
        {['🍽 Restaurants','🏨 Hotels','☕ Cafes','🍹 Bars','🏖 Resorts','🗺 Tours'].map(cat => (
          <button className="bg-white border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 text-neutral-700 hover:text-primary-600 rounded-full px-4 py-1.5 text-sm font-medium transition-all">
            {cat}
          </button>
        ))}
      </div>
    </div>
    
    {/* Stats strip — bottom right or below hero */}
    <div className="mt-16 flex flex-wrap gap-8">
      {[['500+','Businesses Listed'],['4.5★','Average Rating'],['10K+','Monthly Visitors']].map(([num, label]) => (
        <div>
          <div className="text-2xl font-bold text-neutral-900">{num}</div>
          <div className="text-sm text-neutral-500">{label}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

**Notes:**
- The search input in the hero should update the `filter.search` state in `Home.tsx` — wire it up via a prop callback
- The category pills should set `filter.category`
- Remove the "CTA buttons moved to footer" comment — the hero now has real CTAs

### 4.3 `BusinessCard.tsx` — Full Rewrite

**Current problem:** Neumorphic shadows, inconsistent badge placement, large price badge overlapping image.

**New card design (compact, information-dense, clean):**

```tsx
<article className="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group cursor-pointer flex flex-col">
  
  {/* Image section */}
  <div className="relative h-48 overflow-hidden bg-neutral-100">
    {heroImageUrl ? (
      <img src={...} alt={...} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-5xl">🏢</div>
    )}
    
    {/* Top-left: Category badge */}
    <div className="absolute top-3 left-3">
      <span className="bg-white/90 backdrop-blur-sm text-neutral-700 text-xs font-semibold px-3 py-1 rounded-full border border-neutral-200">
        {category || 'Business'}
      </span>
    </div>
    
    {/* Top-right: Price tier */}
    <div className="absolute top-3 right-3">
      <PriceBadge category={priceCategory} />  {/* See below */}
    </div>
    
    {/* Bottom-right: Open/Closed — overlaps image bottom edge */}
    <div className={`absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${isOpen ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
      {isOpen ? 'Open' : 'Closed'}
    </div>
  </div>
  
  {/* Card body */}
  <div className="p-5 flex flex-col flex-1">
    
    {/* Business name */}
    <h3 className="font-bold text-neutral-900 text-lg leading-snug mb-1 group-hover:text-primary-600 transition-colors line-clamp-1">
      {name}
    </h3>
    
    {/* Location */}
    <p className="flex items-center gap-1.5 text-neutral-500 text-sm mb-3">
      <MapPinIcon className="w-3.5 h-3.5 text-neutral-400 flex-shrink-0" />
      <span className="line-clamp-1">{location}</span>
    </p>
    
    {/* Rating row */}
    <div className="flex items-center gap-2 mb-4">
      <div className="flex">
        {[1,2,3,4,5].map(i => (
          <StarIcon key={i} filled={i <= Math.round(averageRating || 0)} />
        ))}
      </div>
      <span className="font-semibold text-neutral-800 text-sm">{averageRating?.toFixed(1) || '0.0'}</span>
      <span className="text-neutral-400 text-sm">({totalRatings || 0} reviews)</span>
    </div>
    
    {/* Spacer pushes CTA to bottom */}
    <div className="flex-1" />
    
    {/* Bottom CTA row */}
    <div className="flex gap-2 pt-3 border-t border-neutral-100">
      {canViewContact ? (
        <a href={`tel:${phone}`} className="flex-1 flex items-center justify-center gap-2 border border-neutral-200 hover:border-primary-300 hover:bg-primary-50 text-neutral-700 hover:text-primary-600 rounded-xl py-2.5 text-sm font-medium transition-all">
          <PhoneIcon className="w-4 h-4" /> Call
        </a>
      ) : (
        <Link to="/user/login" className="flex-1 text-center border border-neutral-200 hover:border-primary-300 text-neutral-600 hover:text-primary-600 rounded-xl py-2.5 text-sm font-medium transition-all">
          Login to Call
        </Link>
      )}
      <Link to={`/business/${id}`} className="flex-1 bg-primary-500 hover:bg-primary-600 text-white rounded-xl py-2.5 text-sm font-semibold text-center transition-all shadow-sm hover:shadow-button">
        View Details
      </Link>
    </div>
    
  </div>
</article>
```

**PriceBadge component (inline in same file):**
```tsx
const PriceBadge = ({ category }: { category: string }) => {
  const map = {
    cheap:     { label: '₹ Budget',   className: 'bg-green-100 text-green-700 border-green-200' },
    moderate:  { label: '₹₹ Mid',     className: 'bg-amber-100 text-amber-700 border-amber-200' },
    expensive: { label: '₹₹₹ Premium',className: 'bg-rose-100 text-rose-700 border-rose-200'   },
  };
  const { label, className } = map[category] || { label: category, className: 'bg-neutral-100 text-neutral-700 border-neutral-200' };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${className}`}>
      {label}
    </span>
  );
};
```

**Star component:**
```tsx
const StarIcon = ({ filled }: { filled: boolean }) => (
  <svg className={`w-4 h-4 ${filled ? 'text-accent-500' : 'text-neutral-200'}`} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.178c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.286 3.966c.3.922-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.176 0l-3.386 2.46c-.784.57-1.838-.196-1.539-1.118l1.285-3.966a1 1 0 00-.364-1.118L2.045 9.394c-.783-.57-.38-1.81.588-1.81h4.178a1 1 0 00.95-.69l1.286-3.967z"/>
  </svg>
);
```

### 4.4 `BusinessGrid.tsx` — Update

- Grid: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`
- When filter sidebar is hidden: `lg:grid-cols-4`
- Empty state: Large centered illustration (use emoji 🔍), heading "No businesses found", subtext "Try adjusting your search or filters"
- Loading skeleton: Show 6 skeleton cards (gray animated pulse rectangles) instead of spinner
- Pagination: New clean pill-style pagination at bottom

**Pagination style:**
```tsx
<div className="flex items-center justify-center gap-2 mt-10">
  <button className="p-2 rounded-xl border border-neutral-200 hover:border-primary-300 disabled:opacity-40">←</button>
  {pages.map(p => (
    <button className={`w-10 h-10 rounded-xl text-sm font-semibold ${p === current ? 'bg-primary-500 text-white' : 'border border-neutral-200 text-neutral-600 hover:border-primary-300'}`}>{p}</button>
  ))}
  <button className="p-2 rounded-xl border border-neutral-200 hover:border-primary-300 disabled:opacity-40">→</button>
</div>
```

### 4.5 `BusinessFilterSidebar.tsx` — Rewrite

**Current problem:** Neumorphic inset shadows. Looks dated.

**New design:**
- Background: `bg-white rounded-2xl border border-neutral-200 shadow-card p-5`
- Title: "Filter Results" in `text-lg font-bold text-neutral-900`
- Search input: Full-width with search icon inside, `border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-300 focus:border-primary-400 outline-none`
- Category section: "Category" label above, pill buttons in a 2-column flex-wrap grid
  - Pill: `border border-neutral-200 rounded-full px-3 py-1.5 text-xs font-medium cursor-pointer hover:border-primary-400 hover:bg-primary-50 hover:text-primary-600`
  - Selected pill: `border-primary-500 bg-primary-50 text-primary-700`
- Price tier: Same pill style but in a row: Budget | Mid | Premium
- Clear button: Bottom of sidebar, ghost with red text: `text-red-500 hover:text-red-600 text-sm font-medium`
- Results count: "Showing **12** businesses" in small muted text below the filter header

### 4.6 `Footer.tsx` — Rewrite

**Keep structure but update styling:**
- Background: `bg-neutral-900` (warm near-black, not the current `from-gray-900`)
- Logo area: Use new brand identity (palm icon + Borel/Inter font combo)
- Social icons: Rounded squares with brand colors (Facebook blue, Instagram gradient placeholder, etc.)
- Bottom bar: `border-t border-neutral-800 mt-12 pt-6 flex justify-between items-center text-neutral-500 text-sm`
- Add "Made with ❤️ for Goa" tagline in the footer
- Nav links in footer: White/neutral-300 text, `hover:text-primary-400` on hover
- Remove the inline SVG building icon — use a proper emoji or icon

### 4.7 `LoadingSpinner.tsx` — Rewrite

Replace the current spinner with a skeleton loader system:

```tsx
// Full-page loading:
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-50">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-neutral-200 border-t-primary-500 rounded-full animate-spin" />
      <p className="text-neutral-500 text-sm font-medium">Loading...</p>
    </div>
  </div>
);

// Card skeleton:
const CardSkeleton = () => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-card animate-pulse">
    <div className="h-48 bg-neutral-200" />
    <div className="p-5 space-y-3">
      <div className="h-5 bg-neutral-200 rounded-lg w-3/4" />
      <div className="h-4 bg-neutral-200 rounded-lg w-1/2" />
      <div className="h-4 bg-neutral-200 rounded-lg w-2/3" />
      <div className="h-10 bg-neutral-200 rounded-xl mt-4" />
    </div>
  </div>
);
```

---

## 5. Page-by-Page Redesign

### 5.1 `pages/Home.tsx`

**Layout:**
```
<div className="min-h-screen bg-neutral-50">
  <Navbar />
  <HeroSection onSearch={setFilter} />   {/* Pass filter setter as prop */}
  
  {/* Category Strip — horizontal scrollable row of category cards */}
  <CategoryStrip onCategorySelect={...} />  {/* New component, see 5.1.1 */}
  
  {/* Main content area */}
  <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <div className="flex gap-6 items-start">
      {isFilterVisible && <BusinessFilterSidebar ... />}
      <div className="flex-1 min-w-0">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-neutral-900">
            {filteredCount} Businesses Found
          </h2>
          <button onClick={() => setIsFilterVisible(!isFilterVisible)} ...>
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        <BusinessGrid ... />
      </div>
    </div>
  </section>
  
  <Footer />
</div>
```

**5.1.1 New: `CategoryStrip.tsx` component**

A horizontal scrollable strip of category cards below the hero:

```tsx
const CATEGORIES = [
  { emoji: '🍽', label: 'Restaurants', value: 'Restaurant' },
  { emoji: '🏨', label: 'Hotels',      value: 'Hotel' },
  { emoji: '☕', label: 'Cafes',       value: 'Cafe' },
  { emoji: '🍹', label: 'Bars',        value: 'Bar' },
  { emoji: '🏖', label: 'Resorts',     value: 'Resort' },
  { emoji: '🗺', label: 'Tours',       value: 'Tour' },
  { emoji: '🛍', label: 'Shops',       value: 'Shop' },
  { emoji: '🏢', label: 'Other',       value: 'Other' },
];

// Layout:
<div className="bg-white border-b border-neutral-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex overflow-x-auto gap-2 py-4 scrollbar-hide">
      {CATEGORIES.map(cat => (
        <button
          key={cat.value}
          onClick={() => onCategorySelect(cat.value)}
          className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-xl border transition-all
            ${selected === cat.value 
              ? 'border-primary-500 bg-primary-50 text-primary-700' 
              : 'border-neutral-200 bg-white text-neutral-600 hover:border-primary-300 hover:bg-primary-50'}`}
        >
          <span className="text-2xl">{cat.emoji}</span>
          <span className="text-xs font-semibold whitespace-nowrap">{cat.label}</span>
        </button>
      ))}
    </div>
  </div>
</div>
```

Add `scrollbar-hide` utility to `index.css`:
```css
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
```

### 5.2 `pages/BusinessDetails.tsx` + `components/BusinessDetails/*`

**`BusinessHeader.tsx` — Update:**
- Keep the fullscreen hero image approach — it's good
- Change overlay to `bg-gradient-to-t from-black/80 via-black/30 to-transparent`
- Text should sit at the **bottom** of the hero section (not center), for a more editorial feel
- Add a "Back" button (top-left) linking back to home: `← Back to Results`
- Add a breadcrumb: `Home > Restaurants > {business.name}`
- Below the business name, show category pill and price tier pill side by side

**`BusinessInfo.tsx` — Update:**
- Use a card-based layout: contact card, hours card, map card each in their own `bg-white rounded-2xl border border-neutral-200 p-5`
- Phone number: Show it clearly in `text-lg font-semibold`, with a green "Call Now" button
- Map section: Keep embedded map but give it `rounded-xl overflow-hidden`
- "Open/Closed" status at top of info section in a prominent banner:
  ```tsx
  <div className={`rounded-xl px-4 py-3 mb-4 flex items-center gap-2 ${isOpen ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
    <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-400'}`} />
    <span className={`font-semibold text-sm ${isOpen ? 'text-green-700' : 'text-red-700'}`}>
      {isOpen ? `Open · Closes at ${closingTime}` : `Closed · Opens at ${openingTime}`}
    </span>
  </div>
  ```

**`BusinessGallery.tsx` — Update:**
- Grid layout: first image large (spans 2 cols), rest small: `grid grid-cols-3 gap-2`
- All images `rounded-xl` with `overflow-hidden`
- Add a "View All Photos" button if more than 4 images

**`BusinessReviews.tsx` — Update:**
- Review cards: `bg-neutral-50 rounded-xl p-4 border border-neutral-100`
- User avatar: colored circle with initials (derive color from userId hash)
- Star display: Gold stars as before but use the new `StarIcon` component
- Rating summary bar chart: Show distribution (5★: ███ 60%, 4★: ██ 30%, etc.) above individual reviews

**`BusinessFAQ.tsx` — Update:**
- Accordion style with smooth expand/collapse using CSS `max-height` transition
- Each FAQ item: border-bottom divider, `+` / `−` toggle icon
- Background: `bg-white rounded-2xl border border-neutral-200 overflow-hidden`

### 5.3 `pages/Login.tsx` and `pages/NormalUserLogin.tsx`

**Current problem:** No styling context — just plain form.

**New design:**
```
Left side (md+): Decorative panel — coral/orange gradient with Goa branding, tagline, 3 feature bullets
Right side: White card with form centered
```

```tsx
<div className="min-h-screen grid md:grid-cols-2">
  {/* Left decorative panel */}
  <div className="hidden md:flex flex-col justify-center items-start bg-gradient-to-br from-primary-500 to-secondary-600 p-16 text-white">
    <div className="font-borel text-4xl mb-2">Goa Yellow Pages</div>
    <p className="text-white/80 text-lg mb-12">Your trusted guide to Goa's best businesses</p>
    <ul className="space-y-4">
      {['Discover 500+ local businesses','Read authentic reviews','Get direct contact details'].map(item => (
        <li className="flex items-center gap-3">
          <span className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">✓</span>
          {item}
        </li>
      ))}
    </ul>
  </div>
  
  {/* Right: form */}
  <div className="flex items-center justify-center p-8 bg-white">
    <div className="w-full max-w-sm">
      <h2 className="font-display font-bold text-2xl text-neutral-900 mb-2">Welcome back</h2>
      <p className="text-neutral-500 mb-8 text-sm">Sign in to your account</p>
      {/* form fields */}
    </div>
  </div>
</div>
```

**Form field styles:**
```tsx
<input className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all" />
```

**Submit button:**
```tsx
<button className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-xl py-3 text-sm transition-all shadow-button hover:shadow-lg active:scale-[0.98]">
  Sign In
</button>
```

### 5.4 `pages/Register.tsx` and `pages/NormalUserRegister.tsx`

Same split-panel layout as Login, but with "Create your account" heading and matching form styles. Right side background can be white. Left panel can show: "Join Goa's business community" + trust stats.

### 5.5 `pages/AboutUs.tsx` — Rewrite

**Keep data/logic, update layout entirely:**
- Hero section with warm gradient background and the brand tagline
- Stats row: Founded year, team members, listings — displayed as large numbers in a `grid grid-cols-3` row inside a colored band
- Mission & Vision: Two-column card layout side by side
- Values: Pill-style tags in primary color
- Remove the animate-blob CSS (it can cause jank on mobile)

### 5.6 `pages/Contact.tsx` — Update

- Two-column: left = form, right = contact info cards (phone, email, address, hours)
- Map embed (if coordinates available): full-width at bottom
- Form submit button: same `bg-primary-500` style

### 5.7 `pages/Dashboard.tsx` — Update

**Keep all logic, update only styling:**
- Sidebar: `bg-neutral-900 text-white w-64 min-h-screen` — dark sidebar navigation
- Active nav item: `bg-primary-500/20 text-primary-400 border-l-2 border-primary-500`
- Stats cards at top: `bg-white rounded-2xl border border-neutral-200 shadow-card p-6` — show count, icon, label
- Tables: clean with `divide-y divide-neutral-100`, `hover:bg-neutral-50` on rows
- Action buttons: `bg-primary-500 text-white text-xs px-3 py-1.5 rounded-lg` for primary, `border border-neutral-300 text-xs px-3 py-1.5 rounded-lg` for secondary

### 5.8 `pages/PrivacyPolicy.tsx` and `pages/TermsOfService.tsx`

- Wrap content in `max-w-3xl mx-auto px-4 py-16`
- Add a sticky table of contents sidebar on desktop
- Heading: `font-display font-bold text-3xl text-neutral-900 mb-2`
- Section headings: `font-semibold text-xl text-neutral-800 mt-10 mb-3`
- Body text: `text-neutral-600 leading-relaxed`

---

## 6. `index.css` — Full Rewrite

```css
/* Fonts */
@import url("https://fonts.googleapis.com/css2?family=Borel&family=Inter:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap");

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Prevent layout shift */
html { overflow-y: scroll; }

@layer base {
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background-color: #fafaf9;
    color: #1c1917;
    -webkit-font-smoothing: antialiased;
  }
  
  * { box-sizing: border-box; }
}

@layer components {
  /* Button system */
  .btn-primary {
    @apply bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200;
    box-shadow: 0 2px 8px rgba(249,115,22,0.35);
  }
  .btn-primary:hover {
    box-shadow: 0 4px 16px rgba(249,115,22,0.45);
  }
  .btn-secondary {
    @apply border border-neutral-300 hover:border-primary-400 text-neutral-700 hover:text-primary-600 font-medium py-2.5 px-5 rounded-xl transition-all duration-200 bg-white;
  }
  .btn-ghost {
    @apply text-neutral-600 hover:text-primary-600 hover:bg-primary-50 font-medium py-2 px-4 rounded-xl transition-all duration-200;
  }
  .btn-danger {
    @apply bg-red-500 hover:bg-red-600 text-white font-semibold py-2.5 px-5 rounded-xl transition-all duration-200;
  }
  
  /* Input system */
  .input-field {
    @apply w-full border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-neutral-900 placeholder-neutral-400 bg-white;
    @apply focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-400 transition-all duration-200;
  }
  
  /* Card system */
  .card {
    @apply bg-white rounded-2xl border border-neutral-200;
    box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06);
  }
  .card-hover {
    @apply transition-shadow duration-300;
  }
  .card-hover:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.08);
  }
  
  /* Badge system */
  .badge-primary { @apply bg-primary-100 text-primary-700 border border-primary-200 text-xs font-semibold px-2.5 py-1 rounded-full; }
  .badge-secondary { @apply bg-secondary-100 text-secondary-700 border border-secondary-200 text-xs font-semibold px-2.5 py-1 rounded-full; }
  .badge-neutral { @apply bg-neutral-100 text-neutral-700 border border-neutral-200 text-xs font-semibold px-2.5 py-1 rounded-full; }
  
  /* Typography */
  .heading-display { @apply font-display font-extrabold text-neutral-900; }
  .heading-section  { @apply font-display font-bold text-neutral-900; }
  .text-muted       { @apply text-neutral-500; }
  
  /* Line clamp */
  .line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
  .line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
  .line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
}

@layer utilities {
  /* Hide scrollbar */
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
  
  /* Shadow utilities */
  .shadow-card   { box-shadow: 0 1px 3px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.06); }
  .shadow-card-hover { box-shadow: 0 4px 12px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.08); }
  .shadow-button { box-shadow: 0 2px 8px rgba(249,115,22,0.35); }
  
  /* Text gradient */
  .text-gradient-primary {
    background: linear-gradient(135deg, #f97316, #ea580c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .text-gradient-tropical {
    background: linear-gradient(135deg, #f97316, #14b8a6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}
```

---

## 7. New `tailwind.config.js` (Complete)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
        borel:   ['Borel', 'cursive'],
      },
      colors: {
        primary: {
          50: '#fff7ed', 100: '#ffedd5', 200: '#fed7aa', 300: '#fdba74',
          400: '#fb923c', 500: '#f97316', 600: '#ea580c', 700: '#c2410c',
          800: '#9a3412', 900: '#7c2d12',
        },
        secondary: {
          50: '#f0fdfa', 100: '#ccfbf1', 200: '#99f6e4', 300: '#5eead4',
          400: '#2dd4bf', 500: '#14b8a6', 600: '#0d9488', 700: '#0f766e',
          800: '#115e59', 900: '#134e4a',
        },
        accent: {
          400: '#fbbf24', 500: '#f59e0b', 600: '#d97706',
        },
        neutral: {
          50: '#fafaf9', 100: '#f5f5f4', 200: '#e7e5e4', 300: '#d6d3d1',
          400: '#a8a29e', 500: '#78716c', 600: '#57534e', 700: '#44403c',
          800: '#292524', 900: '#1c1917',
        },
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [],
};
```

---

## 8. Routing & Navigation Logic Changes

### 8.1 Remove admin links from public navbar
- Navbar should NOT show Admin Login or Admin Register
- Only show: Home, About, Contact (left) | Sign In, List Business (right)
- Admin accesses `/login` and `/register` directly via URL

### 8.2 Add Navbar to all pages
Currently `<Navbar />` is NOT inside `App.tsx` — it's rendered inside individual pages. This causes inconsistency.

**Recommended:** Move `<Navbar />` into `App.tsx` wrapping all non-dashboard routes:
```tsx
<Route element={<PublicLayout />}>
  <Route path="/" element={<Home />} />
  <Route path="/contact" element={<Contact />} />
  {/* etc. */}
</Route>
```

Where `PublicLayout`:
```tsx
const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);
```

### 8.3 "List Your Business" flow
The "List Business" button in navbar should link to `/user/register` if not logged in, or directly to the business listing form if logged in.

---

## 9. Mobile Responsiveness Rules

Apply these rules to every component:

| Breakpoint | Rule |
|---|---|
| `< 640px` (mobile) | Single column, full-width buttons, 16px horizontal padding |
| `640–768px` (sm) | 2-col grid for cards |
| `768–1024px` (md) | Sidebar appears, 2-col cards |
| `> 1024px` (lg) | 3-col cards with sidebar, 4-col without |
| `> 1280px` (xl) | Max-width container locks at 1280px |

**Touch targets:** All buttons/links minimum `44px` tall on mobile.
**Font sizes:** Never go below `text-sm` (`14px`) for body content.
**Navbar:** Always sticky on mobile. Hamburger menu at `< 768px`.

---

## 10. Micro-Interactions & Animations

Keep animations subtle and purposeful:

```css
/* Standard transition for interactive elements */
transition: all 0.2s ease;

/* Card hover — use transform for GPU acceleration */
.card-hover:hover { transform: translateY(-2px); }

/* Button press */
button:active { transform: scale(0.98); }

/* Image zoom on hover — BusinessCard */
.card-image img { transition: transform 0.5s ease; }
.card:hover .card-image img { transform: scale(1.04); }
```

**Do NOT use:**
- `animate-blob` (causes paint jank on mobile)
- Complex keyframe animations on scroll
- Parallax effects
- Any animation on the filter sidebar (just show/hide with opacity)

---

## 11. Iconography

Use inline SVG icons throughout (no icon library needed, keeps bundle small). If you need an icon library, use `lucide-react` (already compatible with the project structure):

```bash
npm install lucide-react
```

Standard icons to use:
- Search: `Search`
- Location: `MapPin`
- Phone: `Phone`
- Star: `Star`
- Filter: `SlidersHorizontal`
- Menu: `Menu`
- Close: `X`
- Arrow: `ChevronLeft`, `ChevronRight`
- Clock: `Clock`
- Eye (views): `Eye`
- Edit: `Pencil`
- Delete: `Trash2`
- Check: `Check`
- External link: `ExternalLink`

---

## 12. Component File Checklist

For Codex: Process these files in this order. Tick each off before moving to the next.

### Phase 1 — Foundation
- [ ] `tailwind.config.js` — New color palette
- [ ] `src/index.css` — New global styles
- [ ] `index.html` — Add Google Fonts link

### Phase 2 — Global Components
- [ ] `src/components/Navbar.tsx`
- [ ] `src/components/HeroSection.tsx`
- [ ] `src/components/LoadingSpinner.tsx`
- [ ] `src/components/ErrorDisplay.tsx`

### Phase 3 — Core Listing Components
- [ ] `src/components/BusinessCard.tsx`
- [ ] `src/components/BusinessGrid.tsx`
- [ ] `src/components/BusinessFilterSidebar.tsx`
- [ ] `src/components/CategoryStrip.tsx` *(new file)*
- [ ] `src/components/Footer.tsx`

### Phase 4 — Business Detail Components
- [ ] `src/components/BusinessDetails/BusinessHeader.tsx`
- [ ] `src/components/BusinessDetails/BusinessInfo.tsx`
- [ ] `src/components/BusinessDetails/BusinessGallery.tsx`
- [ ] `src/components/BusinessDetails/BusinessReviews.tsx`
- [ ] `src/components/BusinessDetails/BusinessFAQ.tsx`

### Phase 5 — Pages
- [ ] `src/pages/Home.tsx`
- [ ] `src/pages/Login.tsx`
- [ ] `src/pages/NormalUserLogin.tsx`
- [ ] `src/pages/Register.tsx`
- [ ] `src/pages/NormalUserRegister.tsx`
- [ ] `src/pages/AboutUs.tsx`
- [ ] `src/pages/Contact.tsx`
- [ ] `src/pages/BusinessDetails.tsx`
- [ ] `src/pages/PrivacyPolicy.tsx`
- [ ] `src/pages/TermsOfService.tsx`

### Phase 6 — Dashboard (admin)
- [ ] `src/pages/Dashboard.tsx` (style only, keep all logic)
- [ ] `src/pages/BusinessAdminDashboard.tsx` (style only)
- [ ] `src/components/dashboard/BusinessesTable.tsx`
- [ ] `src/components/dashboard/AdminsTable.tsx`
- [ ] `src/components/dashboard/ContactsTable.tsx`

---

## 13. What NOT to Change

> Critical: these must remain untouched to preserve app functionality.

- ❌ `src/services/graphql.ts` — All API calls
- ❌ `src/services/api.ts` — API config
- ❌ `src/services/auth.ts` — Auth logic
- ❌ `src/services/normalUserAuth.ts`
- ❌ `src/contexts/AuthContext.tsx`
- ❌ `src/contexts/NormalUserAuthContext.tsx`
- ❌ `src/types/index.ts` — TypeScript interfaces
- ❌ `src/config.ts` — API_URL constant
- ❌ `src/lib/utils.ts` — `cn()` utility
- ❌ All server files in `server/src/`
- ❌ Route paths in `App.tsx` — Keep all existing routes, only optionally add `PublicLayout`
- ❌ All business logic (filter logic, pagination logic, auth checks, etc.)

---

## 14. Design Inspiration Reference

The redesign targets a quality level between:
- **JustDial** (information density, trust signals)
- **Yelp** (card design, ratings, photos)
- **MakeMyTrip** (warm Indian colors, tropical vibe)
- **Airbnb** (clean white surfaces, strong typography)

Key differentiator: The **orange + teal** palette is uniquely Goanese — it evokes the sunset over the Arabian Sea (orange) and the coastal waters (teal), which no generic directory uses. This makes the brand instantly recognizable and emotionally connected to Goa.

---

## 15. Final Notes for Codex

1. **Do not remove any props or state** from components — only modify JSX and className strings
2. **Preserve all TypeScript types** — do not use `any` to bypass type errors
3. **Test filter functionality** — make sure HeroSection search prop correctly updates filter state
4. **Maintain the `cn()` utility** for conditional classNames — use it everywhere
5. **`API_URL` usage** in image URLs must stay as-is — images may be relative paths or full Cloudinary URLs
6. When in doubt: **white background, orange accent, neutral text** — that is the system