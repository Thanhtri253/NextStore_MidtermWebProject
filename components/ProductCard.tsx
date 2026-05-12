// components/ProductCard.tsx
// Demonstrates global state: reads from 3 Zustand stores, dispatches to all 3
// — no props passed down for state management

import Link from "next/link";
import { Product } from "@/types";
import { useCartStore }     from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore }    from "@/store/toastStore";
import { formatPrice, formatNumber } from "@/utils/format";

const BADGE_STYLE: Record<string, string> = {
  "New":         "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "Best Seller": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Popular":     "bg-green-500/10 text-green-400 border-green-500/20",
  "Hot":         "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function ProductCard({ product }: { product: Product }) {
  // Subscribe only to slices we need — no unnecessary re-renders
  const addItem    = useCartStore((s) => s.addItem);
  const openCart   = useCartStore((s) => s.openCart);
  const inCart     = useCartStore((s) => s.items.some((i) => i.id === product.id));

  const toggle     = useWishlistStore((s) => s.toggle);
  const isWished   = useWishlistStore((s) => s.has(product.id));

  const toast      = useToastStore((s) => s.show);

  function handleAddToCart() {
    addItem(product);
    openCart();                                        // open drawer globally
    toast(`${product.name} added to cart`, "success");
  }

  function handleWishlist() {
    toggle(product);
    toast(
      isWished ? `Removed from wishlist` : `Added to wishlist`,
      isWished ? "info" : "success"
    );
  }

  return (
    <div className="group relative bg-[#111118] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 transition-all duration-200">
      {/* Image */}
      <Link href={`/products/${product.id}`} className="block relative overflow-hidden bg-[#16161e]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              `https://placehold.co/600x400/16161e/555?text=${encodeURIComponent(product.name)}`;
          }}
        />
        {product.badge && (
          <span className={`absolute top-3 left-3 text-[11px] font-semibold px-2.5 py-1 rounded-full border ${BADGE_STYLE[product.badge] ?? "bg-white/10 text-white border-white/10"}`}>
            {product.badge}
          </span>
        )}
        {product.stock <= 10 && (
          <span className="absolute top-3 right-3 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20">
            Only {product.stock} left
          </span>
        )}
      </Link>

      {/* Wishlist button */}
      <button onClick={handleWishlist}
        className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 ${
          product.stock <= 10 ? "top-10" : "top-3"
        } ${isWished
          ? "bg-red-500 text-white shadow-lg"
          : "bg-black/40 backdrop-blur text-white/60 hover:bg-black/60 hover:text-white opacity-0 group-hover:opacity-100"
        }`}>
        <svg className="w-4 h-4" fill={isWished ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
        </svg>
      </button>

      {/* Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs text-[#555]">{product.category}</p>
        <Link href={`/products/${product.id}`}
          className="text-sm font-medium text-[#ddd] hover:text-white transition-colors line-clamp-2 leading-snug">
          {product.name}
        </Link>

        <div className="flex items-center gap-1.5 text-xs text-[#666]">
          <div className="flex text-yellow-400 text-[11px]">
            {"★".repeat(Math.round(product.rating))}{"☆".repeat(5-Math.round(product.rating))}
          </div>
          <span>{product.rating}</span>
          <span>({formatNumber(product.reviews)})</span>
        </div>

        <p className="text-base font-bold text-white mt-auto">{formatPrice(product.price)}</p>

        <button onClick={handleAddToCart}
          className={`w-full py-2.5 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            inCart
              ? "bg-violet-900/30 border-violet-500/30 text-violet-300 cursor-default"
              : "border-white/10 text-[#888] hover:bg-violet-600 hover:text-white hover:border-transparent"
          }`}>
          {inCart ? "✓ Added to Cart" : "+ Add to Cart"}
        </button>
      </div>
    </div>
  );
}
