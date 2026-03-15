import type { Metadata } from "next";
import { IBM_Plex_Sans, Manrope } from "next/font/google";

import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";

const display = Manrope({ subsets: ["latin"], variable: "--font-display" });
const body = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  title: "Clariy Insights AI",
  description: "AI-powered strategy consulting platform for serious decision-makers."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} ${body.variable} bg-background font-sans text-foreground antialiased`}>
        <ThemeProvider>
          <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(101,163,255,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(94,234,212,0.12),transparent_24%),linear-gradient(180deg,rgba(15,23,42,0.06),transparent_50%)]">
            <SiteHeader />
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
