import {
  MediaQueryProvider,
  SidebarWidthProvider,
  ThemeProvider,
} from "@/contexts";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Header, LeftSideBar, RightSideBar } from "@/components/layout";

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
        <MediaQueryProvider>
          <ThemeProvider>
            <div className="flex flex-col h-screen">
              <SidebarWidthProvider>
                <Header />
                <main className="relative flex-1 overflow-hidden flex">
                  <LeftSideBar />
                  {children}
                  <RightSideBar />
                </main>
              </SidebarWidthProvider>
            </div>
          </ThemeProvider>
        </MediaQueryProvider>
      </body>
    </html>
  );
}
