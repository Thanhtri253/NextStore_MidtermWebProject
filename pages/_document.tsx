// pages/_document.tsx
// Custom Document — runs on the SERVER only.
// Use for: <html> lang, global <link>, <meta> that can't go in _app.tsx

import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Theme color (browser UI on mobile) */}
        <meta name="theme-color" content="#0a0a0f" />

        {/* Google Fonts — preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap"
          rel="stylesheet"
        />

        {/* Verification tags (replace with real values) */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_VERIFICATION_TOKEN" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
