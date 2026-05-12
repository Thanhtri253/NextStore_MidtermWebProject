// pages/auth/register.tsx
import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { useAuthStore } from "@/store/authStore";

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    const result = register(name, email, password);
    setLoading(false);
    if (!result.ok) { setError(result.error || "Registration failed."); return; }
    router.push("/");
  }

  return (
    <>
      <Head><title>Create Account — NextStore</title></Head>
      <div className="min-h-screen bg-[#0a0a0f] flex">
        {/* Left panel */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col items-center justify-center p-16 bg-gradient-to-br from-violet-950 via-[#0f0a1e] to-[#0a0a0f]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-600/20 via-transparent to-transparent" />
          <div className="relative z-10 text-center">
            <Link href="/" className="text-3xl font-bold text-white">
              next<span className="text-violet-400">store</span>
            </Link>
            <p className="mt-4 text-violet-200/60 text-lg max-w-xs mx-auto leading-relaxed">
              Join thousands of tech enthusiasts shopping smarter.
            </p>
            <div className="mt-12 space-y-3">
              {[
                ["🎁","Exclusive member discounts up to 20%"],
                ["🚚","Free express shipping on all orders"],
                ["🔄","Hassle-free 30-day returns"],
                ["🔒","Secure payments & data protection"],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3 text-sm text-violet-200/50 text-left">
                  <span>{icon}</span> {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            <Link href="/" className="lg:hidden block text-2xl font-bold text-white mb-8 text-center">
              next<span className="text-violet-400">store</span>
            </Link>

            <h1 className="text-2xl font-semibold text-white mb-2">Create your account</h1>
            <p className="text-[#666] text-sm mb-8">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-violet-400 hover:text-violet-300 transition-colors">
                Sign in
              </Link>
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm text-[#888] mb-2">Full name</label>
                <input type="text" required value={name} onChange={e => setName(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Email address</label>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Password</label>
                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="Min. 8 characters"
                />
              </div>
              <div>
                <label className="block text-sm text-[#888] mb-2">Confirm password</label>
                <input type="password" required value={confirm} onChange={e => setConfirm(e.target.value)}
                  className="w-full bg-[#111118] border border-[#2a2a3e] rounded-xl px-4 py-3 text-white text-sm placeholder-[#444] focus:outline-none focus:border-violet-500 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-900/20 border border-red-700/40 rounded-xl px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <label className="flex items-start gap-3 text-sm text-[#666] cursor-pointer mt-1">
                <input type="checkbox" required className="mt-0.5 accent-violet-500" />
                <span>I agree to the <a href="#" className="text-violet-400">Terms of Service</a> and <a href="#" className="text-violet-400">Privacy Policy</a></span>
              </label>

              <button type="submit" disabled={loading}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:opacity-60 text-white font-semibold py-3 rounded-xl transition-colors text-sm mt-1"
              >
                {loading ? "Creating account…" : "Create Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
