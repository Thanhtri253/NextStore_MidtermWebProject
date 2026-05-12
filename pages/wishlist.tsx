// pages/wishlist.tsx — CSR (Zustand wishlist store)
import type { NextPage } from "next";
import Link from "next/link";
import SEO from "@/components/SEO";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore }     from "@/store/cartStore";
import { useToastStore }    from "@/store/toastStore";
import { formatPrice }      from "@/utils/format";

const WishlistPage: NextPage = () => {
  const items    = useWishlistStore((s) => s.items);
  const toggle   = useWishlistStore((s) => s.toggle);
  const addItem  = useCartStore((s) => s.addItem);
  const openCart = useCartStore((s) => s.openCart);
  const toast    = useToastStore((s) => s.show);

  function handleAddToCart(product: typeof items[0]) {
    addItem(product);
    openCart();
    toast(`${product.name} added to cart`, "success");
  }

  return (
    <>
      <SEO title="Wishlist" description="Your saved products." url="https://nextstore.vercel.app/wishlist"/>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Wishlist</h1>
          <p className="text-sm text-[#555] mt-1">{items.length} saved {items.length === 1 ? "item" : "items"}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-[#444]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </div>
          <h2 className="text-lg font-semibold text-white mb-2">Your wishlist is empty</h2>
          <p className="text-sm text-[#555] mb-8">Save products you love by clicking the heart icon.</p>
          <Link href="/" className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-colors">
            Browse Store
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map(product => (
            <div key={product.id} className="group bg-[#111118] border border-white/5 rounded-2xl overflow-hidden flex flex-col hover:border-violet-500/30 transition-all duration-200">
              <Link href={`/products/${product.id}`} className="relative overflow-hidden bg-[#16161e] block">
                <img src={product.image} alt={product.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"/>
              </Link>
              <div className="p-4 flex flex-col gap-2 flex-1">
                <p className="text-xs text-[#555]">{product.category}</p>
                <Link href={`/products/${product.id}`}
                  className="text-sm font-medium text-[#ddd] hover:text-white transition-colors line-clamp-2">
                  {product.name}
                </Link>
                <p className="text-base font-bold text-white mt-auto">{formatPrice(product.price)}</p>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => handleAddToCart(product)}
                    className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-500 text-white transition-colors">
                    Add to Cart
                  </button>
                  <button onClick={() => { toggle(product); toast("Removed from wishlist","info"); }}
                    className="w-10 flex items-center justify-center rounded-xl border border-white/10 hover:border-red-500/40 hover:bg-red-500/10 text-[#666] hover:text-red-400 transition-all">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default WishlistPage;
