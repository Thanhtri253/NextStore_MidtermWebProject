// components/SEO.tsx
// Reusable SEO head component.
// Handles: title, description, Open Graph, Twitter Cards, canonical URL, JSON-LD.

import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: "website" | "product";
  price?: number;
  jsonLd?: object;
}

const SITE_NAME  = "NextStore";
const BASE_URL   = "https://nextstore.vercel.app"; // change to your domain
const DEFAULT_OG = `${BASE_URL}/og-default.png`;

export default function SEO({
  title,
  description = "Shop the latest tech: laptops, phones, audio and more. Free shipping on orders over $500.",
  image = DEFAULT_OG,
  url = BASE_URL,
  type = "website",
  jsonLd,
}: Props) {
  const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Premium Tech Store`;

  return (
    <Head>
      {/* ── Primary ──────────────────────────────── */}
      <title>{fullTitle}</title>
      <meta name="description"        content={description} />
      <meta name="robots"             content="index, follow" />
      <link rel="canonical"           href={url} />
      <meta name="viewport"           content="width=device-width, initial-scale=1" />

      {/* ── Open Graph ───────────────────────────── */}
      <meta property="og:type"        content={type} />
      <meta property="og:site_name"   content={SITE_NAME} />
      <meta property="og:title"       content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={image} />
      <meta property="og:url"         content={url} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale"       content="en_US" />

      {/* ── Twitter Card ─────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@nextstore" />
      <meta name="twitter:title"       content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={image} />

      {/* ── JSON-LD Structured Data ───────────────── */}
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </Head>
  );
}
