// pages/dashboard.tsx — SSR
import type { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import { PRODUCTS } from "@/data/products";
import { Product } from "@/types";
import { formatPrice, formatNumber } from "@/utils/format";
import SEO from "@/components/SEO";

interface Order {
  id: string; customer: string; avatar: string;
  product: string; amount: number; status: "completed"|"pending"|"cancelled"|"processing";
  date: string;
}
interface Metrics {
  revenue: number; orders: number; customers: number; avgOrder: number;
  revenueChange: number; ordersChange: number; customersChange: number; avgChange: number;
}
interface Props {
  metrics: Metrics;
  topProducts: (Product & { sold: number; share: number; revenue: number })[];
  recentOrders: Order[];
  monthlySales: { month: string; revenue: number; orders: number }[];
}

const STATUS_STYLE = {
  completed:  "bg-green-500/10 text-green-400 border-green-500/20",
  pending:    "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  processing: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  cancelled:  "bg-red-500/10 text-red-400 border-red-500/20",
};

const Dashboard: NextPage<Props> = ({ metrics, topProducts, recentOrders, monthlySales }) => {
  const [activeTab, setActiveTab] = useState<"overview"|"orders"|"products">("overview");

  const maxRevenue = Math.max(...monthlySales.map(m => m.revenue));

  return (
    <>
      <SEO title="Dashboard" description="NextStore admin dashboard." url="https://nextstore.vercel.app/dashboard"/>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white mb-1">Dashboard</h1>
          <p className="text-sm text-[#555]">Welcome back — here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2">
          <select className="bg-[#111118] border border-white/10 rounded-xl px-3 py-2 text-sm text-[#888] focus:outline-none focus:border-violet-500 cursor-pointer">
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-xl transition-colors">
            Export
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label:"Total Revenue",  value:formatPrice(metrics.revenue),    change:metrics.revenueChange,   color:"text-violet-400", icon:(
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33"/></svg>
          )},
          { label:"Total Orders",   value:formatNumber(metrics.orders),    change:metrics.ordersChange,    color:"text-blue-400",   icon:(
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z"/></svg>
          )},
          { label:"Avg. Order",     value:formatPrice(metrics.avgOrder),   change:metrics.avgChange,       color:"text-green-400",  icon:(
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"/></svg>
          )},
          { label:"Customers",      value:formatNumber(metrics.customers), change:metrics.customersChange, color:"text-yellow-400", icon:(
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/></svg>
          )},
        ].map(k => (
          <div key={k.label} className="bg-[#111118] border border-white/5 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs text-[#444] uppercase tracking-wider">{k.label}</p>
              <div className={`p-2 rounded-lg bg-white/5 ${k.color}`}>{k.icon}</div>
            </div>
            <p className={`text-2xl font-bold ${k.color} mb-1`}>{k.value}</p>
            <p className={`text-xs flex items-center gap-1 ${k.change >= 0 ? "text-green-400" : "text-red-400"}`}>
              <span>{k.change >= 0 ? "↑" : "↓"}</span>
              <span>{Math.abs(k.change)}% vs last month</span>
            </p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#111118] border border-white/5 rounded-xl p-1 w-fit">
        {(["overview","orders","products"] as const).map(t => (
          <button key={t} onClick={() => setActiveTab(t)}
            className={`px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
              activeTab === t ? "bg-violet-600 text-white" : "text-[#666] hover:text-white"
            }`}>
            {t}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === "overview" && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-white">Revenue Overview</h2>
                <p className="text-xs text-[#444] mt-0.5">Monthly revenue for 2025–2026</p>
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">↑ +18.2% YoY</span>
            </div>
            {/* Bar chart */}
            <div className="flex items-end gap-2 h-40">
              {monthlySales.map((m, i) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-1 group">
                  <div className="relative w-full flex justify-center">
                    <div
                      className="w-full max-w-[32px] rounded-t-md transition-all duration-300 group-hover:opacity-100"
                      style={{
                        height: `${(m.revenue / maxRevenue) * 128}px`,
                        background: i === monthlySales.length - 1
                          ? "linear-gradient(to top, #7c3aed, #a78bfa)"
                          : "rgba(124,58,237,0.3)",
                      }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-[#1e1e2e] border border-white/10 rounded-lg px-2 py-1 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      {formatPrice(m.revenue)}
                    </div>
                  </div>
                  <span className="text-[10px] text-[#444]">{m.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-1">Sales by Category</h2>
            <p className="text-xs text-[#444] mb-6">This month's distribution</p>
            <div className="flex flex-col gap-4">
              {[
                {cat:"Laptops",  pct:34, color:"bg-violet-500"},
                {cat:"Phones",   pct:28, color:"bg-blue-500"},
                {cat:"Audio",    pct:16, color:"bg-green-500"},
                {cat:"Gaming",   pct:12, color:"bg-yellow-500"},
                {cat:"Others",   pct:10, color:"bg-[#444]"},
              ].map(c => (
                <div key={c.cat}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#888]">{c.cat}</span>
                    <span className="text-white font-medium">{c.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${c.color} rounded-full transition-all duration-700`} style={{width:`${c.pct}%`}}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders preview */}
          <div className="lg:col-span-2 bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center">
              <h2 className="text-base font-semibold text-white">Recent Orders</h2>
              <button onClick={() => setActiveTab("orders")} className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View all →</button>
            </div>
            <div className="divide-y divide-white/5">
              {recentOrders.slice(0, 4).map(o => (
                <div key={o.id} className="px-6 py-3.5 flex items-center gap-4">
                  <img src={o.avatar} alt={o.customer} className="w-8 h-8 rounded-full shrink-0"/>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{o.customer}</p>
                    <p className="text-xs text-[#444] truncate">{o.product}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-white">{formatPrice(o.amount)}</p>
                    <p className="text-xs text-[#444]">{o.date}</p>
                  </div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border shrink-0 ${STATUS_STYLE[o.status]}`}>
                    {o.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-[#111118] border border-white/5 rounded-2xl p-6">
            <h2 className="text-base font-semibold text-white mb-6">Quick Stats</h2>
            <div className="flex flex-col gap-5">
              {[
                {label:"Conversion Rate", value:"3.24%",  trend:"+0.4%",  up:true},
                {label:"Return Rate",     value:"2.1%",   trend:"-0.3%",  up:true},
                {label:"Repeat Buyers",  value:"41%",    trend:"+5%",    up:true},
                {label:"Cart Abandonment",value:"68%",   trend:"-2.1%",  up:true},
                {label:"Avg. Session",   value:"4m 32s", trend:"+18s",   up:true},
              ].map(s => (
                <div key={s.label} className="flex items-center justify-between">
                  <span className="text-sm text-[#666]">{s.label}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">{s.value}</span>
                    <span className={`text-xs ml-2 ${s.up ? "text-green-400" : "text-red-400"}`}>{s.trend}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── ORDERS TAB ── */}
      {activeTab === "orders" && (
        <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-white">All Orders</h2>
            <div className="flex gap-2">
              <input placeholder="Search orders…"
                className="bg-[#16161e] border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-[#444] focus:outline-none focus:border-violet-500 w-44"/>
              <select className="bg-[#16161e] border border-white/10 rounded-xl px-3 py-2 text-sm text-[#888] focus:outline-none focus:border-violet-500 cursor-pointer">
                <option>All Status</option>
                <option>Completed</option>
                <option>Pending</option>
                <option>Processing</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-5 px-6 py-3 border-b border-white/5 text-xs text-[#444] uppercase tracking-wider">
            <span className="col-span-2">Customer / Product</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
          </div>
          <div className="divide-y divide-white/5">
            {recentOrders.map(o => (
              <div key={o.id} className="grid grid-cols-1 sm:grid-cols-5 px-6 py-4 items-center gap-3 hover:bg-white/2 transition-colors">
                <div className="sm:col-span-2 flex items-center gap-3">
                  <img src={o.avatar} alt={o.customer} className="w-9 h-9 rounded-full shrink-0"/>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{o.customer}</p>
                    <p className="text-xs text-[#444] truncate">{o.product}</p>
                    <p className="text-xs text-[#333] font-mono">{o.id}</p>
                  </div>
                </div>
                <p className="text-sm text-[#666]">{o.date}</p>
                <p className="text-sm font-semibold text-white">{formatPrice(o.amount)}</p>
                <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border w-fit ${STATUS_STYLE[o.status]}`}>
                  {o.status}
                </span>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between">
            <p className="text-xs text-[#444]">Showing 1–{recentOrders.length} of {recentOrders.length} orders</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-xs border border-white/10 rounded-lg text-[#666] hover:text-white hover:bg-white/5 transition-colors">← Prev</button>
              <button className="px-3 py-1.5 text-xs bg-violet-600 text-white rounded-lg">1</button>
              <button className="px-3 py-1.5 text-xs border border-white/10 rounded-lg text-[#666] hover:text-white hover:bg-white/5 transition-colors">Next →</button>
            </div>
          </div>
        </div>
      )}

      {/* ── PRODUCTS TAB ── */}
      {activeTab === "products" && (
        <div className="bg-[#111118] border border-white/5 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Product Performance</h2>
            <Link href="/" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">View store →</Link>
          </div>
          {/* Table header */}
          <div className="hidden sm:grid grid-cols-6 px-6 py-3 border-b border-white/5 text-xs text-[#444] uppercase tracking-wider">
            <span className="col-span-2">Product</span>
            <span>Price</span>
            <span>Sold</span>
            <span>Revenue</span>
            <span>Stock</span>
          </div>
          <div className="divide-y divide-white/5">
            {topProducts.map((p, i) => (
              <div key={p.id} className="grid grid-cols-1 sm:grid-cols-6 px-6 py-4 items-center gap-3 hover:bg-white/2 transition-colors">
                <div className="sm:col-span-2 flex items-center gap-3">
                  <span className="text-xs text-[#333] w-4 font-mono shrink-0">{i+1}</span>
                  <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover bg-[#16161e] shrink-0"/>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-white truncate">{p.name}</p>
                    <p className="text-xs text-[#444]">{p.category}</p>
                  </div>
                </div>
                <p className="text-sm text-white">{formatPrice(p.price)}</p>
                <p className="text-sm text-[#888]">{p.sold} units</p>
                <p className="text-sm font-semibold text-violet-400">{formatPrice(p.revenue)}</p>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${p.stock < 15 ? "bg-orange-500" : "bg-green-500"}`}
                        style={{width:`${Math.min((p.stock/70)*100,100)}%`}}/>
                    </div>
                    <span className={`text-xs ${p.stock < 15 ? "text-orange-400" : "text-green-400"}`}>{p.stock}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

// ── Data Fetching ──────────────────────────────────────────────────────────────
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const revenue  = 48620 + Math.floor(Math.random() * 2000);
  const orders   = 318 + Math.floor(Math.random() * 20);
  const metrics: Metrics = {
    revenue, orders,
    customers:    4247 + Math.floor(Math.random()*50),
    avgOrder:     Math.round(revenue / orders),
    revenueChange: 12.4, ordersChange: 8.2,
    customersChange: 5.7, avgChange: 3.1,
  };

  const topProducts = PRODUCTS.slice(0, 8).map((p, i) => {
    const sold = [142,98,76,61,44,38,27,19][i];
    return { ...p, sold, share: [22,18,14,12,9,8,5,4][i], revenue: p.price * sold };
  });

  const names = ["Alice Nguyen","Bob Tran","Charlie Le","Diana Pham","Eric Vo","Fiona Dang","George Bui","Hannah Ngo","Ivan Hoang","Julia Mai"];
  const products = ["MacBook Pro M3","iPhone 16 Pro","AirPods Pro","iPad Pro M4","Galaxy S24","MacBook Air M2","PS5 Slim","HomePod 2nd Gen","Switch OLED","Galaxy Watch 7"];
  const statuses: Order["status"][] = ["completed","pending","processing","cancelled","completed","completed","processing","pending","completed","completed"];
  const dates = ["May 7","May 7","May 6","May 6","May 5","May 5","May 4","May 4","May 3","May 3"];
  const amounts = [1999,999,249,799,1299,1099,499,299,349,299];

  const recentOrders: Order[] = names.map((name, i) => ({
    id: `#NS-${(1000+i).toString()}`,
    customer: name,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=1e1e2e&color=888&size=64`,
    product: products[i], amount: amounts[i],
    status: statuses[i], date: dates[i],
  }));

  const months = ["Jul","Aug","Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May"];
  const monthlySales = months.map((month, i) => ({
    month,
    revenue: 28000 + i * 2000 + Math.floor(Math.random() * 3000),
    orders:  180 + i * 15 + Math.floor(Math.random() * 30),
  }));

  return { props: { metrics, topProducts, recentOrders, monthlySales } };
};

export default Dashboard;
