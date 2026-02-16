import {
  MediaQueryProvider,
  NavigationContextProvider,
  SidebarWidthProvider,
  ThemeProvider,
} from "@/contexts";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, LeftSideBar, RightSideBar } from "@/components/layout";

// for vercel data visualization
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Layers",
  description:
    "Discover and share UI components that solve real frontend problems",
  icons: "/icon.svg",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body>
        <SpeedInsights />
        <Analytics />
        <SessionProvider>
          <MediaQueryProvider>
            <ThemeProvider>
              <div className="flex flex-col h-screen">
                <SidebarWidthProvider>
                  <Header />
                  <main className="relative flex-1 overflow-hidden flex">
                    <NavigationContextProvider>
                      <LeftSideBar />
                      {children}
                    </NavigationContextProvider>
                    <RightSideBar />
                  </main>
                </SidebarWidthProvider>
              </div>
            </ThemeProvider>
          </MediaQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
