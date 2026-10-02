import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
});

export const metadata: Metadata = {
  title: "Aurora | Discover Smarter. Shop Better.",
  description:
    "Premium Affiliate Shopping Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* Synchronous blocking script: Runs before paint to eliminate mobile flicker */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  // 1. Critical Theme Detection (synchronous, before first paint)
                  var t = localStorage.getItem('aurora-theme');
                  if (t === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                    document.documentElement.classList.add('light');
                    document.documentElement.style.backgroundColor = '#FAF7F2';
                    document.documentElement.style.color = '#2C2621';
                  } else {
                    document.documentElement.setAttribute('data-theme', 'dark');
                    document.documentElement.classList.remove('light');
                    document.documentElement.style.backgroundColor = '#030303';
                    document.documentElement.style.color = '#e0e0e0';
                  }

                  // 2. Critical Intro Check (instant skip for returning mobile visitors)
                  var isIntroDone = sessionStorage.getItem('aurora_intro_completed') === 'true' ||
                    sessionStorage.getItem('aurora_return_to_vault') === 'true' ||
                    window.location.hash === '#vault' ||
                    window.location.search.indexOf('category=') !== -1 ||
                    window.location.search.indexOf('q=') !== -1;
                  if (isIntroDone) {
                    document.documentElement.classList.add('aurora-skip-intro');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        {/* Critical inline CSS for instantaneous first paint */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              html {
                background-color: #030303;
                color: #e0e0e0;
              }
              html.light {
                background-color: #FAF7F2 !important;
                color: #2C2621 !important;
              }
              html.aurora-skip-intro #aurora-intro-overlay {
                display: none !important;
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}