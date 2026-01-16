import { MediaQueryProvider, ThemeProvider } from "@/contexts";
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
        <script src="http://localhost:8097"></script>
        <MediaQueryProvider>
          <ThemeProvider>
            <div className="flex flex-col h-screen">
              <Header />
              <main className="relative flex-1 overflow-hidden flex">
                <LeftSideBar />
                {children}
                <RightSideBar />
              </main>
            </div>
          </ThemeProvider>
        </MediaQueryProvider>
      </body>
    </html>
  );
}
