// components/CartDrawer.tsx
// Slide-in cart sidebar — powered entirely by Zustand global state
// Openable from ANY component without prop drilling

import Link from "next/link";
import { useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/utils/format";

export default function CartDrawer() {
  const items      = useCartStore((s) => s.items);
  const isOpen     = useCartStore((s) => s.isOpen);
  const closeCart  = useCartStore((s) => s.closeCart);
  const changeQty  = useCartStore((s) => s.changeQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const totalCount = useCartStore((s) => s.totalCount());
  const totalPrice = useCartStore((s) => s.totalPrice());

  const shipping = totalPrice >= 500 || totalPrice === 0 ? 0 : 15;
  const grand    = totalPrice + shipping;

  // Close on Escape key
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === "Escape") closeCart(); };
    document.addEventListener("keydown", handle);
    return () => document.removeEventListener("keydown", handle);
  }, [closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer panel */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#0d0d12] border-l border-white/10 z-50 flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <div className="flex items-center gap-3">
            <h2 className="text-base font-semibold text-white">Shopping Cart</h2>
            {totalCount > 0 && (
              <span className="bg-violet-600 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 rounded-lg hover:bg-white/5 text-[#666] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center pb-16">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#444]" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
                </svg>
              </div>
              <p className="text-white font-medium mb-2">Your cart is empty</p>
              <p className="text-sm text-[#555] mb-6">Add some products to get started</p>
              <button onClick={closeCart} className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 bg-[#111118] border border-white/5 rounded-xl p-3">
                  <Link href={`/products/${item.id}`} onClick={closeCart} className="shrink-0">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-[#16161e]"/>
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col gap-1">
                    <Link href={`/products/${item.id}`} onClick={closeCart}
                      className="text-sm font-medium text-white hover:text-violet-300 transition-colors truncate">
                      {item.name}
                    </Link>
                    <p className="text-xs text-[#555]">{item.category}</p>
                    <div className="flex items-center justify-between mt-1">
                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <button onClick={() => changeQty(item.id, -1)}
                          className="w-6 h-6 rounded-md border border-white/10 text-[#888] hover:text-white hover:bg-white/5 transition-all flex items-center justify-center text-sm">
                          −
                        </button>
                        <span className="text-sm font-medium text-white w-4 text-center">{item.qty}</span>
                        <button onClick={() => changeQty(item.id, 1)}
                          className="w-6 h-6 rounded-md border border-white/10 text-[#888] hover:text-white hover:bg-white/5 transition-all flex items-center justify-center text-sm">
                          +
                        </button>
                      </div>
                      {/* Price + remove */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-white">{formatPrice(item.price * item.qty)}</span>
                        <button onClick={() => removeItem(item.id)} className="text-[#333] hover:text-red-400 transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/5 px-6 py-5 flex flex-col gap-3">
            {/* Free shipping progress */}
            {totalPrice < 500 && (
              <div className="bg-white/3 rounded-xl p-3 border border-white/5">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#666]">Add {formatPrice(500 - totalPrice)} for free shipping</span>
                  <span className="text-violet-400">{Math.round((totalPrice/500)*100)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-violet-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalPrice/500)*100, 100)}%` }}/>
                </div>
              </div>
            )}
            {totalPrice >= 500 && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 text-xs text-green-400 text-center">
                🎉 You qualify for free shipping!
              </div>
            )}

            {/* Totals */}
            <div className="flex flex-col gap-1.5 text-sm">
              <div className="flex justify-between text-[#666]">
                <span>Subtotal</span>
                <span className="text-white">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-[#666]">
                <span>Shipping</span>
                <span className={shipping === 0 ? "text-green-400" : "text-white"}>
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-1 border-t border-white/5 mt-1">
                <span className="text-white">Total</span>
                <span className="text-violet-400">{formatPrice(grand)}</span>
              </div>
            </div>

            <button className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-colors">
              Checkout — {formatPrice(grand)}
            </button>
            <Link href="/cart" onClick={closeCart}
              className="block text-center text-xs text-[#555] hover:text-[#888] transition-colors py-1">
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
