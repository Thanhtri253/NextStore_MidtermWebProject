// pages/index.tsx — SSG + ISR
import type { GetStaticProps, NextPage } from "next";
import { useState } from "react";
import { PRODUCTS, CATEGORIES } from "@/data/products";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import SEO from "@/components/SEO";
import { formatPrice } from "@/utils/format";

interface Props { products: Product[] }

// JSON-LD: WebSite + SearchAction (enables Google Sitelinks Searchbox)
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "NextStore",
  "url": "https://nextstore.vercel.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://nextstore.vercel.app/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// JSON-LD: Organization
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NextStore",
  "url": "https://nextstore.vercel.app",
  "logo": "https://nextstore.vercel.app/logo.png",
  "sameAs": [
    "https://twitter.com/nextstore",
    "https://instagram.com/nextstore"
  ]
};

const Home: NextPage<Props> = ({ products }) => {
  const [activeCat, setActiveCat] = useState("All");
  const [sort, setSort]           = useState("featured");
  const [search, setSearch]       = useState("");

  const filtered = products
    .filter(p => activeCat === "All" || p.category === activeCat)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc")  return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "rating")     return b.rating - a.rating;
      return 0;
    });

  return (
    <>
      <SEO
        title="Premium Tech Store"
        description="Shop the latest laptops, phones, audio gear, gaming and more. Free shipping on orders over $500. 30-day returns."
        url="https://nextstore.vercel.app"
        jsonLd={[websiteJsonLd, orgJsonLd] as unknown as object}
      />

      {/* Hero */}
      <section className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-br from-violet-900/40 via-[#111118] to-[#0a0a0f] border border-white/5 px-8 py-12 sm:px-14 sm:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent pointer-events-none"/>
        <div className="relative max-w-xl">
          <span className="inline-block text-xs font-semibold text-violet-400 bg-violet-500/10 border border-violet-500/20 px-3 py-1 rounded-full mb-4">
            New arrivals — 2026
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight mb-4">
            Technology that moves <span className="text-violet-400">you forward</span>
          </h1>
          <p className="text-[#888] text-sm sm:text-base leading-relaxed mb-8">
            Curated selection of premium gadgets. Free shipping on orders over $500.
          </p>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => setActiveCat("All")}
              className="px-6 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-colors">
              Shop Now
            </button>
            <button onClick={() => setActiveCat("Gaming")}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold rounded-xl text-sm transition-colors">
              Explore Gaming
            </button>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        {[
          {icon:"🚚", title:"Free Shipping",   sub:"On orders over $500"},
          {icon:"🔄", title:"30-Day Returns",   sub:"Hassle-free policy"},
          {icon:"🔒", title:"Secure Payment",   sub:"256-bit encryption"},
          {icon:"🎧", title:"24/7 Support",     sub:"Always here to help"},
        ].map(item => (
          <div key={item.title} className="flex items-center gap-3 bg-[#111118] border border-white/5 rounded-xl px-4 py-3">
            <span className="text-xl">{item.icon}</span>
            <div>
              <p className="text-xs font-semibold text-white">{item.title}</p>
              <p className="text-xs text-[#555]">{item.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setActiveCat(c)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                activeCat === c
                  ? "bg-violet-600 text-white border-violet-600"
                  : "bg-transparent border-white/10 text-[#666] hover:text-white hover:border-white/20"
              }`}>
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 shrink-0">
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products…"
            className="bg-[#111118] border border-white/10 rounded-xl px-4 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-violet-500 transition-colors w-48"
          />
          <select value={sort} onChange={e => setSort(e.target.value)}
            className="bg-[#111118] border border-white/10 rounded-xl px-3 py-2 text-sm text-[#888] focus:outline-none focus:border-violet-500 transition-colors cursor-pointer">
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>
      </div>

      <p className="text-xs text-[#555] mb-5">
        Showing <span className="text-white">{filtered.length}</span> of {products.length} products
        {activeCat !== "All" && <> in <span className="text-violet-400">{activeCat}</span></>}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map(p => <ProductCard key={p.id} product={p}/>)}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-4xl mb-4">🔍</p>
          <p className="text-white font-medium mb-2">No products found</p>
          <p className="text-sm text-[#555]">Try a different search or category</p>
        </div>
      )}
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: { products: PRODUCTS },
  revalidate: 3600,
});

export default Home;
