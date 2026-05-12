// pages/_app.tsx
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  return (
    <Layout pathname={router.pathname}>
      <Component {...pageProps} />
    </Layout>
  );
}
