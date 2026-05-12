// pages/products/[id].tsx — SSR
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { getProductById, PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { useCartStore }     from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore }    from "@/store/toastStore";
import { useRecentStore }   from "@/store/recentStore";
import { formatPrice, formatNumber } from "@/utils/format";
import SEO from "@/components/SEO";

const BASE_URL = "https://nextstore.vercel.app";
interface Props { product: Product }

const ProductDetail: NextPage<Props> = ({ product }) => {
  const addItem  = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const inCart   = useCartStore((s) => s.items.some((i) => i.id === product.id));
  const toggle   = useWishlistStore((s) => s.toggle);
  const isWished = useWishlistStore((s) => s.has(product.id));
  const toast    = useToastStore((s) => s.show);
  const addRecent = useRecentStore((s) => s.add);
  const recent   = useRecentStore((s) => s.items.filter((i) => i.id !== product.id));

  // Track recently viewed
  useEffect(() => { addRecent(product); }, [product.id]);

  function handleAddToCart() {
    addItem(product);
    openCart();
    toast(`${product.name} added to cart`, "success");
  }

  function handleWishlist() {
    toggle(product);
    toast(isWished ? "Removed from wishlist" : "Saved to wishlist", isWished ? "info" : "success");
  }

  const productJsonLd = {
    "@context": "https://schema.org", "@type": "Product",
    name: product.name, image: product.image, description: product.description,
    sku: `NST-${product.id}`,
    brand: { "@type": "Brand", name: "NextStore" },
    offers: { "@type": "Offer", url: `${BASE_URL}/products/${product.id}`, priceCurrency: "USD",
      price: product.price, availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    aggregateRating: { "@type": "AggregateRating", ratingValue: product.rating, reviewCount: product.reviews, bestRating: 5 },
  };

  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <SEO title={product.name} description={product.description} image={product.image}
        url={`${BASE_URL}/products/${product.id}`} type="product" jsonLd={productJsonLd}/>

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-[#555] mb-8">
        <Link href="/" className="hover:text-[#aaa] transition-colors">Store</Link>
        <span>/</span>
        <Link href={`/?cat=${product.category}`} className="hover:text-[#aaa] transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-[#888] truncate">{product.name}</span>
      </nav>

      {/* Main */}
      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="rounded-2xl overflow-hidden bg-[#111118] border border-white/5">
          <img src={product.image} alt={product.name} className="w-full h-80 md:h-[420px] object-cover"/>
        </div>

        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-medium text-violet-400 mb-2">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 text-sm">
              <div className="flex text-yellow-400">{"★".repeat(Math.round(product.rating))}{"☆".repeat(5-Math.round(product.rating))}</div>
              <span className="text-[#888]">{product.rating} · {formatNumber(product.reviews)} reviews</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-white">{formatPrice(product.price)}</div>
          <p className="text-sm text-[#777] leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-2 text-sm">
            <span className={`w-2 h-2 rounded-full ${product.stock > 15 ? "bg-green-400" : "bg-orange-400"}`}/>
            <span className="text-[#666]">
              {product.stock > 15 ? `In stock (${product.stock} available)` : `Only ${product.stock} left — order soon`}
            </span>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button onClick={handleAddToCart}
              className={`flex-1 py-3.5 rounded-xl font-semibold text-sm transition-all ${
                inCart ? "bg-violet-900/30 border border-violet-500/30 text-violet-300" : "bg-violet-600 hover:bg-violet-500 text-white"
              }`}>
              {inCart ? "✓ Added to Cart" : "Add to Cart"}
            </button>
            <button onClick={handleWishlist}
              className={`w-12 flex items-center justify-center rounded-xl border transition-all ${
                isWished ? "bg-red-500/10 border-red-500/30 text-red-400" : "border-white/10 text-[#666] hover:border-red-500/30 hover:text-red-400"
              }`}>
              <svg className="w-5 h-5" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {[["🚚","Free shipping over $500"],["🔄","30-day returns"],["🔒","Secure checkout"],["🛡️","2-year warranty"]].map(([icon,text])=>(
              <div key={text} className="flex items-center gap-2 text-xs text-[#555]"><span>{icon}</span>{text}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-5">More in {product.category}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {related.map(p => (
              <Link key={p.id} href={`/products/${p.id}`}
                className="group bg-[#111118] border border-white/5 rounded-xl overflow-hidden hover:border-violet-500/30 transition-all">
                <img src={p.image} alt={p.name} className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"/>
                <div className="p-3">
                  <p className="text-xs text-white font-medium truncate">{p.name}</p>
                  <p className="text-sm text-violet-400 font-bold mt-1">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed */}
      {recent.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold text-white mb-5">Recently Viewed</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {recent.map(p => (
              <Link key={p.id} href={`/products/${p.id}`}
                className="group bg-[#111118] border border-white/5 rounded-xl overflow-hidden hover:border-violet-500/30 transition-all">
                <img src={p.image} alt={p.name} className="w-full h-24 object-cover group-hover:scale-105 transition-transform duration-300"/>
                <div className="p-2.5">
                  <p className="text-[11px] text-white font-medium truncate">{p.name}</p>
                  <p className="text-xs text-violet-400 font-bold mt-0.5">{formatPrice(p.price)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const product = getProductById(Number(ctx.params?.id));
  if (!product) return { notFound: true };
  return { props: { product } };
};

export default ProductDetail;
