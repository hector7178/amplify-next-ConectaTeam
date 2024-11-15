// app/layout.tsx
import "@aws-amplify/ui-react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ConfigureAmplify from "../components/ConfigureAmplify";
import { TooltipProvider } from "../components/ui/tooltip";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "ConectaTeam",
  description: "La mejor CRM Para tu negocio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <TooltipProvider>
        <ConfigureAmplify/>
        {children}
      </TooltipProvider>
      <Script async defer strategy="lazyOnload" src="https://connect.facebook.net/en_US/sdk.js"></Script>
      </body>
    </html>
  );
}