// pages/auth/login.tsx
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("demo@nextstore.com");
  const [password, setPassword] = useState("demo1234");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600)); // simulate network
    const result = login(email, password);
    setLoading(false);
    if (!result.ok) { setError(result.error || "Login failed."); return; }
    router.push("/");
  }

  return (
    <>
      <Head><title>Sign In — NextStore</title></Head>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16 bg-gradient-to-br from-violet-950 via-[#0f0a1e] to-[#0a0a0f]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent" />
          <div className="relative z-10 text-center">
            <Link href="/" className="text-3xl font-bold text-white">
              next<span className="text-violet-400">store</span>
            </Link>
            <p className="mt-4 text-violet-200/60 text-lg max-w-xs mx-auto leading-relaxed">
              Your premium destination for the latest technology.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-4 text-left">
              {["Free shipping over $500","30-day returns","2-year warranty","24/7 support"].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-violet-200/50">
                  <span className="text-violet-400">✓</span> {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <Link href="/" className="lg:hidden block text-2xl font-bold text-white mb-8 text-center">
              next<span className="text-violet-400">store</span>
            </Link>

            <h1 className="text-2xl font-semibold text-white mb-2">Welcome back</h1>
            <p className="text-[#666] text-sm mb-8">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="text-violet-400 hover:text-violet-300 transition-colors">
                Create one
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm text-[#888] mb-2">Email address</label>
                <input
                  type="email" required
                  value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm text-[#888]">Password</label>
                  <a href="#" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</a>
                </div>
                <input
                  type="password" required
                  value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit" disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-1"
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>

              <div className="relative flex items-center gap-3 my-1">
                <div className="flex-1 border-t border-[#1e1e2e]" />
                <span className="text-xs text-[#444]">or continue with</span>
                <div className="flex-1 border-t border-[#1e1e2e]" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {["Google","GitHub"].map(p => (
                  <button key={p} type="button"
                    className="flex items-center justify-center gap-2 bg-[#111118] border border-[#2a2a3e] rounded-xl py-2.5 text-sm text-[#aaa] hover:border-[#3a3a4e] hover:text-white transition-all"
                  >
                    {p === "Google" ? "G" : "⌥"} {p}
                  </button>
                ))}
              </div>
            </form>

            <p className="text-xs text-[#444] text-center mt-8">
              Demo: demo@nextstore.com / demo1234
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
