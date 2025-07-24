// File: app/layout.tsx

// Step 1: Import 'Viewport' from 'next' alongside 'Metadata'
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

// The metadata object now only contains SEO-related information.
export const metadata: Metadata = {
  title: "DevKeep - Your Personal Code Snippet Manager",
  description: "Save, tag, and search your most-used code snippets and developer links.",
};

// Step 2: Create a new 'viewport' export for viewport-related settings.
// Move the themeColor property here.
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

// The RootLayout component itself remains unchanged.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}