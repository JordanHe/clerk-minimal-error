// src/pages/_app.tsx
import "../styles/globals.css";
import { dark } from "@clerk/themes";
import type { AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { trpc } from "../utils/trpc";
import Script from "next/script";

export const metadata = {
  title: "x",
  description: "xx",
};

import { Montserrat } from "next/font/google";
const montserrat = Montserrat({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={"x"}
      {...pageProps}
    >
      <main className={montserrat.className}>
        <Component {...pageProps} />
      </main>
    </ClerkProvider>
  );
};

export default trpc.withTRPC(MyApp);
