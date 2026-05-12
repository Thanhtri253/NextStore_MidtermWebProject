// components/Layout.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState, useRef, useEffect } from "react";
import { useCartStore }     from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore }     from "@/store/authStore";
import CartDrawer           from "@/components/CartDrawer";
import ToastContainer       from "@/components/ToastContainer";

const NO_LAYOUT = ["/auth/login", "/auth/register"];

function Navbar() {
  const router      = useRouter();
  const totalCount  = useCartStore((s) => s.totalCount());
  const toggleCart  = useCartStore((s) => s.toggleCart);
  const wishCount   = useWishlistStore((s) => s.count());
  const user        = useAuthStore((s) => s.user);
  const logout      = useAuthStore((s) => s.logout);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen,   setUserOpen]   = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserOpen(false);
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [router.pathname]);

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d12]/95 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-tight shrink-0">
          next<span className="text-violet-400">store</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {[{href:"/",label:"Store"},{href:"/dashboard",label:"Dashboard"}].map(l => (
            <Link key={l.href} href={l.href}
              className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                router.pathname === l.href ? "text-white bg-white/5" : "text-[#777] hover:text-white hover:bg-white/5"
              }`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Wishlist */}
          <Link href="/wishlist"
            className="relative hidden sm:flex items-center justify-center w-10 h-10 rounded-lg border border-white/10 hover:border-white/20 text-[#777] hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
            {wishCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {wishCount}
              </span>
            )}
          </Link>

          {/* Cart — opens drawer */}
          <button onClick={toggleCart}
            className="relative flex items-center gap-2 px-3 py-2 rounded-lg border border-white/10 hover:border-white/20 text-sm text-[#aaa] hover:text-white transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
            </svg>
            <span className="hidden sm:inline">Cart</span>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-violet-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1">
                {totalCount}
              </span>
            )}
          </button>

          {/* User */}
          {user ? (
            <div className="relative" ref={userRef}>
              <button onClick={() => setUserOpen(!userOpen)}
                className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                <img src={user.avatar} alt={user.name} className="w-7 h-7 rounded-full"/>
                <span className="hidden sm:inline text-sm text-[#ccc] max-w-[120px] truncate">{user.name}</span>
                <svg className="w-3 h-3 text-[#555]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
                </svg>
              </button>
              {userOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#111118] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-medium text-white truncate">{user.name}</p>
                    <p className="text-xs text-[#555] truncate">{user.email}</p>
                  </div>
                  <div className="py-1">
                    {[["My Orders","#"],["Wishlist","/wishlist"],["Settings","#"]].map(([l,h]) => (
                      <Link key={l} href={h} className="block px-4 py-2.5 text-sm text-[#888] hover:text-white hover:bg-white/5 transition-colors">{l}</Link>
                    ))}
                  </div>
                  <div className="border-t border-white/5 py-1">
                    <button onClick={() => { logout(); setUserOpen(false); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors">
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Link href="/auth/login" className="px-3 py-2 text-sm text-[#777] hover:text-white transition-colors">Sign in</Link>
              <Link href="/auth/register" className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors">Sign up</Link>
            </div>
          )}

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg hover:bg-white/5">
            <svg className="w-5 h-5 text-[#777]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0d0d12] px-4 py-3 flex flex-col gap-1">
          {[{href:"/",label:"Store"},{href:"/dashboard",label:"Dashboard"},{href:"/wishlist",label:"Wishlist"}].map(l => (
            <Link key={l.href} href={l.href} className="px-3 py-2.5 text-sm text-[#888] hover:text-white hover:bg-white/5 rounded-lg transition-colors">{l.label}</Link>
          ))}
          <button onClick={toggleCart} className="text-left px-3 py-2.5 text-sm text-[#888] hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            Cart {totalCount > 0 && `(${totalCount})`}
          </button>
          {!user ? (
            <>
              <Link href="/auth/login"    className="px-3 py-2.5 text-sm text-[#888] hover:text-white hover:bg-white/5 rounded-lg transition-colors">Sign in</Link>
              <Link href="/auth/register" className="px-3 py-2.5 text-sm text-violet-400 hover:bg-white/5 rounded-lg transition-colors">Create account</Link>
            </>
          ) : (
            <button onClick={logout} className="text-left px-3 py-2.5 text-sm text-red-400 hover:bg-white/5 rounded-lg transition-colors">Sign out</button>
          )}
        </div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-24 border-t border-white/5 bg-[#0d0d12]">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-10">
          {[
            {title:"Shop",    links:["Audio","Laptops","Phones","Wearables","Gaming"]},
            {title:"Support", links:["Help Center","Order Status","Returns","Shipping","Contact"]},
            {title:"Company", links:["About","Blog","Careers","Press","Partners"]},
            {title:"Legal",   links:["Privacy","Terms","Cookies","Licenses"]},
          ].map(col => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-white mb-4">{col.title}</h3>
              {col.links.map(l => (
                <a key={l} href="#" className="block text-sm text-[#444] hover:text-[#888] mb-2.5 transition-colors">{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#333]">© 2026 <span className="text-white font-semibold">nextstore</span>. All rights reserved.</p>
          <div className="flex gap-5">
            {["Twitter","Instagram","GitHub"].map(s => (
              <a key={s} href="#" className="text-xs text-[#444] hover:text-[#777] transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function Layout({ children, pathname }: { children: ReactNode; pathname?: string }) {
  if (pathname && NO_LAYOUT.some(p => pathname.startsWith(p))) {
    return <>{children}</>;
  }
  return (
    <div className="min-h-screen bg-[#0a0a0f] flex flex-col">
      <Navbar />
      <CartDrawer />
      <ToastContainer />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">{children}</main>
      <Footer />
    </div>
  );
}
