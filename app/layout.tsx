import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import AuthProvider from "@/components/providers";
import clsx from "clsx";
import { SiteFooter } from "@/components/site-footer";
import { Analytics } from "@vercel/analytics/react";
import { ToasterProvider } from "@/components/toaster-provider";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CSPostHogProvider } from "@/components/ph-providers";
import ProgressBarProviders from "@/components/ProgressBarProvider";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://kyza.ai/"),
  twitter: {
    card: "summary_large_image",
  },
};

export type vidType = {
  id: string;
  key: string;
  name: string;
  customId: any;
  status: string;
  url: string;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <ToasterProvider />
          <div className="flex flex-col h-screen">
            <CSPostHogProvider>
              <main className="w-full mx-auto">
                {/* <AuthProvider> */}
                <ProgressBarProviders>{children}</ProgressBarProviders>
                {/* </AuthProvider> */}
              </main>
            </CSPostHogProvider>
          </div>
        </Providers>
        <Analytics />
        <GoogleAnalytics gaId="G-7B3NSEDZTK" />
      </body>
    </html>
  );
}
