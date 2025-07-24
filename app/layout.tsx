// File: app/layout.tsx

import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

// Step 1: Import the Toaster component from sonner (or your UI component)
import { Toaster } from "sonner"; 
// Note: If you have a custom styled sonner component from shadcn/ui, the path might be "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevKeep - Your Personal Code Snippet Manager",
  description: "Save, tag, and search your most-used code snippets and developer links.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

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

          {/* 
            Step 2: Add the Toaster component here, inside the ThemeProvider.
            This makes it available globally across your entire application.
            - `richColors` enables pre-styled success, error, warning, and info toasts.
            - `position` sets where the toasts will appear on the screen.
          */}
          <Toaster richColors position="bottom-right" />
          
        </ThemeProvider>
      </body>
    </html>
  );
}