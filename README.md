# NextStore 

> A modern e-commerce demo application built with **Next.js 14**, **Zustand**, **TailwindCSS**, and **TypeScript**.
>
> **Course:** WEB PROGRAMMING & APPLICATIONS – 503073 | **Topic ID:** 2 – Modern Front-End Ecosystems (React/Next.js) | **Semester 2, AY 2025–2026**

---

##  Pages

| Page | Route | Rendering |
|---|---|---|
| Product Catalog | `/` | SSG + ISR |
| Product Detail | `/products/[id]` | SSR |
| Shopping Cart | `/cart` | CSR |
| Wishlist | `/wishlist` | CSR |
| Admin Dashboard | `/dashboard` | SSR |
| Login | `/auth/login` | CSR |
| Register | `/auth/register` | CSR |

---

##  Quick Start

### Prerequisites

| Tool | Version |
|---|---|
| Node.js | **v18+** |
| npm | **v9+** |

Check your versions:

```bash
node -v
npm -v
```

Download Node.js at [https://nodejs.org](https://nodejs.org) (choose **LTS**).

---

### 1 — Clone / Extract

If using the zip file:

```bash
unzip nextstore.zip
cd nextstore
```

If cloning from GitHub:

```bash
git clone https://github.com/YOUR_USERNAME/nextstore.git
cd nextstore
```

---

### 2 — Install Dependencies

```bash
npm install
```

> First install takes ~1–2 minutes. Requires ~500 MB free disk space.

---

### 3 — Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

### 4 — Build for Production

```bash
npm run build
npm run start
```

---

##  Project Structure

```
nextstore/
│
├── pages/                        # Next.js file-based routing
│   ├── _app.tsx                  # App entry point — wraps Layout
│   ├── _document.tsx             # Custom HTML shell (lang, fonts, theme-color)
│   ├── index.tsx                 # Homepage — getStaticProps (SSG + ISR)
│   ├── cart.tsx                  # Cart page — CSR (Zustand only)
│   ├── wishlist.tsx              # Wishlist page — CSR (Zustand only)
│   ├── dashboard.tsx             # Admin dashboard — getServerSideProps (SSR)
│   ├── sitemap.xml.tsx           # Dynamic XML sitemap — getServerSideProps
│   ├── auth/
│   │   ├── login.tsx             # Login page — CSR
│   │   └── register.tsx          # Register page — CSR
│   └── products/
│       └── [id].tsx              # Product detail — getServerSideProps (SSR)
│
├── components/
│   ├── Layout.tsx                # Navbar + Footer wrapper (used in _app.tsx)
│   ├── ProductCard.tsx           # Reusable product card with cart/wishlist actions
│   ├── CartDrawer.tsx            # Slide-in cart sidebar (global, mounted in Layout)
│   ├── ToastContainer.tsx        # Global toast notifications (mounted in Layout)
│   └── SEO.tsx                   # Reusable Head component (OG, JSON-LD, canonical)
│
├── store/                        # Zustand global state stores
│   ├── cartStore.ts              # Cart items + drawer open/close state
│   ├── wishlistStore.ts          # Saved/favourited products
│   ├── authStore.ts              # User session (login, register, logout)
│   ├── toastStore.ts             # Toast notification queue (auto-dismiss 3s)
│   └── recentStore.ts            # Recently viewed products (last 6)
│
├── data/
│   └── products.ts               # 17 product records + CATEGORIES array
│
├── types/
│   └── index.ts                  # TypeScript interfaces: Product, CartItem, User
│
├── utils/
│   └── format.ts                 # formatPrice() and formatNumber() — locale-safe
│
├── styles/
│   └── globals.css               # Tailwind base + CSS variables + animations
│
├── public/
│   ├── robots.txt                # Crawler rules — disallow /cart and /auth/
│   └── site.webmanifest          # PWA metadata (theme-color, icons, name)
│
├── next.config.js                # Next.js config (images domains)
├── tailwind.config.ts            # Tailwind content paths + custom tokens
├── tsconfig.json                 # TypeScript strict mode config
├── postcss.config.js             # PostCSS with autoprefixer
└── package.json                  # Dependencies and npm scripts
```

---

##  Rendering Strategies

| Strategy | Next.js API | Used on | When data is fetched |
|---|---|---|---|
| **SSG** | `getStaticProps` + `revalidate` | `/` | Build time — refreshed every 1 hour (ISR) |
| **SSR** | `getServerSideProps` | `/products/[id]`, `/dashboard`, `/sitemap.xml` | On every request — always fresh |
| **CSR** | Zustand / `useState` | `/cart`, `/wishlist`, `/auth/*` | Client-side — no server fetch |

---

##  Zustand Stores

| Store | File | Manages |
|---|---|---|
| `useCartStore` | `store/cartStore.ts` | Items, qty, drawer open state, totals |
| `useWishlistStore` | `store/wishlistStore.ts` | Saved products, toggle, count |
| `useAuthStore` | `store/authStore.ts` | User object, login, register, logout |
| `useToastStore` | `store/toastStore.ts` | Toast queue, show, auto-dismiss |
| `useRecentStore` | `store/recentStore.ts` | Recently viewed (last 6 products) |

All stores are available in any component without a Provider wrapper or prop drilling.

---

##  SEO Implementation

| Feature | File | Description |
|---|---|---|
| Open Graph tags | `components/SEO.tsx` | `og:title`, `og:image`, `og:url` on every page |
| Twitter Cards | `components/SEO.tsx` | `summary_large_image` for social sharing |
| Canonical URL | `components/SEO.tsx` | `<link rel="canonical">` per page |
| JSON-LD — Product | `pages/products/[id].tsx` | Price, rating, stock → Google rich results |
| JSON-LD — WebSite | `pages/index.tsx` | SearchAction → Google Sitelinks Searchbox |
| JSON-LD — BreadcrumbList | `pages/products/[id].tsx` | Breadcrumb in Google SERP |
| Dynamic Sitemap | `pages/sitemap.xml.tsx` | Auto-lists all product URLs |
| robots.txt | `public/robots.txt` | Disallow `/cart`, `/auth/` |
| PWA Manifest | `public/site.webmanifest` | App name, theme-color, icons |

---

##  Tech Stack

| Technology | Version | Role |
|---|---|---|
| Next.js | 14.2.5 | Framework — SSG / SSR / ISR / routing |
| React | 18 | UI component library |
| TypeScript | 5 | Type safety — strict mode |
| Zustand | 4.5.4 | Global client-side state management |
| TailwindCSS | 3.4.1 | Utility-first styling |
| Unsplash | CDN | Product images |
| UI Avatars | API | User avatar generation |

---

##  Test Credentials

| Field | Value |
|---|---|
| Email | `demo@nextstore.com` |
| Password | `demo1234` |

The register page also accepts new accounts — they are stored in memory for the session only.

---

##  Environment Variables

No environment variables are required to run this project locally.

For a production deployment, create a `.env.local` file:

```env
# Base URL — update to your domain
NEXT_PUBLIC_BASE_URL=https://nextstore.vercel.app

# Example for future database integration
DATABASE_URL=postgresql://user:password@localhost:5432/nextstore

# Example for NextAuth.js (future)
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
```

---

##  Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server at localhost:3000 |
| `npm run build` | Build optimised production bundle |
| `npm run start` | Start production server (requires build first) |
| `npm run lint` | Run ESLint on all TypeScript files |

---

##  Known Limitations

- **State is not persisted** — Zustand resets on page refresh (no localStorage middleware)
- **Static product data** — no real database; all products defined in `data/products.ts`
- **Client-only auth** — no JWT/session server validation; auth state lives in Zustand only
- **No real payment** — Checkout button is UI-only; no Stripe or payment gateway connected

---

##  Future Improvements

- Migrate to **Next.js App Router** with React Server Components
- Integrate **PostgreSQL + Prisma ORM** to replace static data
- Add **Zustand persist middleware** to save cart to localStorage
- Implement **NextAuth.js** with Google/GitHub OAuth + JWT sessions
- Add **Stripe** payment gateway on the checkout flow

---

##  Team

| Member | Student ID | Responsibility |
|---|---|---|
| Phan Trí Hiếu | 523H0133 | Introduction, Theory, Architecture, Auth |
| Lê Khắc Thanh Trí | 523H0186 | Implementation, SEO, Dashboard, Demo |

---

##  References

1. Vercel, "Next.js Documentation," 2024. [Online]. Available: https://nextjs.org/docs
2. Meta Open Source, "React Documentation," 2024. [Online]. Available: https://react.dev
3. Zustand GitHub, "Bear necessities for state management," 2024. Available: https://github.com/pmndrs/zustand
4. A. Wathan, "TailwindCSS Documentation," Tailwind Labs, 2024. Available: https://tailwindcss.com/docs
5. Google, "Structured Data — Search for Developers," 2024. Available: https://developers.google.com/search/docs/appearance/structured-data
