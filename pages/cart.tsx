// pages/cart.tsx — CSR
import type { NextPage } from "next";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";
import SEO from "@/components/SEO";

const CartPage: NextPage = () => {
  const items      = useCartStore((s) => s.items);
  const changeQty  = useCartStore((s) => s.changeQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const clearCart  = useCartStore((s) => s.clearCart);
  const totalCount = useCartStore((s) => s.totalCount());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const shipping = totalPrice === 0 ? 0 : totalPrice >= 500 ? 0 : 15;
  const tax      = Math.round(totalPrice * 0.1);
  const grand    = totalPrice + shipping + tax;

  return (
    <>
      <SEO
        title={totalCount > 0 ? `Cart (${totalCount})` : "Cart"}
        description="Review your cart and proceed to checkout."
        url="https://nextstore.vercel.app/cart"
      />

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-white">Shopping Cart</h1>
        {items.length > 0 && (
          <button onClick={clearCart} className="text-xs text-[#555] hover:text-red-400 transition-colors">Clear all</button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-28 text-center">
          <div className="text-6xl mb-5">🛒</div>
          <h2 className="text-lg font-semibold text-white mb-2">Your cart is empty</h2>
          <p className="text-sm text-[#555] mb-8">Add products from the store to get started.</p>
          <Link href="/" className="px-8 py-3 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-colors">
            Browse Store
          </Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-3">
            {items.map(item => (
              <div key={item.id} className="flex gap-4 bg-[#111118] border border-white/5 rounded-2xl p-4 items-center">
                <Link href={`/products/${item.id}`} className="shrink-0">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl bg-[#16161e]"/>
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/products/${item.id}`} className="text-sm font-medium text-white hover:text-violet-300 transition-colors truncate block">{item.name}</Link>
                  <p className="text-xs text-[#555] mt-0.5">{item.category}</p>
                  <p className="text-sm font-bold text-white mt-1.5">{formatPrice(item.price)}</p>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <button onClick={() => changeQty(item.id,-1)} className="w-8 h-8 rounded-lg border border-white/10 text-[#888] hover:text-white hover:bg-white/5 transition-all flex items-center justify-center font-medium">−</button>
                    <span className="w-6 text-center text-sm font-semibold text-white">{item.qty}</span>
                    <button onClick={() => changeQty(item.id,1)} className="w-8 h-8 rounded-lg border border-white/10 text-[#888] hover:text-white hover:bg-white/5 transition-all flex items-center justify-center font-medium">+</button>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-violet-400">{formatPrice(item.price * item.qty)}</p>
                    <button onClick={() => removeItem(item.id)} className="text-xs text-[#444] hover:text-red-400 transition-colors mt-0.5">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-[#111118] border border-white/5 rounded-2xl p-5 sticky top-20">
              <h2 className="text-base font-semibold text-white mb-5">Order Summary</h2>
              <div className="flex flex-col gap-3 text-sm">
                <div className="flex justify-between text-[#666]">
                  <span>Subtotal ({totalCount} items)</span>
                  <span className="text-white">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-[#666]">
                  <span>Shipping</span>
                  <span className={shipping===0?"text-green-400":"text-white"}>{shipping===0?"Free":formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-[#666]">
                  <span>Estimated Tax</span>
                  <span className="text-white">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-base">
                  <span className="text-white">Total</span>
                  <span className="text-violet-400">{formatPrice(grand)}</span>
                </div>
              </div>
              {totalPrice < 500 && totalPrice > 0 && (
                <p className="text-xs text-[#555] mt-4 bg-white/3 rounded-lg p-3 border border-white/5">
                  Add <span className="text-white font-medium">{formatPrice(500-totalPrice)}</span> more for free shipping.
                </p>
              )}
              <button className="w-full mt-5 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-colors">
                Proceed to Checkout
              </button>
              <Link href="/" className="block text-center text-xs text-[#444] hover:text-[#777] mt-4 transition-colors">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartPage;
