// pages/sitemap.xml.tsx
// Dynamic sitemap — generated at build time via getServerSideProps.
// Accessible at /sitemap.xml. Submit to Google Search Console.

import { GetServerSideProps } from "next";
import { PRODUCTS } from "@/data/products";

const BASE_URL = "https://nextstore.vercel.app";

function generateSitemap(products: typeof PRODUCTS): string {
  const staticPages = [
    { url: BASE_URL, priority: "1.0", changefreq: "daily" },
    { url: `${BASE_URL}/cart`, priority: "0.5", changefreq: "never" },
    { url: `${BASE_URL}/dashboard`, priority: "0.6", changefreq: "hourly" },
  ];

  const productPages = products.map((p) => ({
    url: `${BASE_URL}/products/${p.id}`,
    priority: "0.8",
    changefreq: "weekly",
  }));

  const allPages = [...staticPages, ...productPages];
  const today = new Date().toISOString().split("T")[0];

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (p) => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

function SitemapPage() {
  return null; // no UI — response is pure XML
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate");
  res.write(generateSitemap(PRODUCTS));
  res.end();
  return { props: {} };
};

export default SitemapPage;
