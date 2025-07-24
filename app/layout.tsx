import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css"; // --- Importing global styles for Tailwind CSS

// It's good practice to import the font here to apply it globally.
const inter = Inter({ subsets: ["latin"] });

// Metadata for SEO. This can be overridden by child pages.
export const metadata: Metadata = {
  title: "DevKeep - Your Personal Code Snippet Manager",
  description: "Save, tag, and search your most-used code snippets and developer links.",
};

/**
 * This is the ROOT layout.
 * Every page in your application will be rendered within this component.
 * It's the perfect place for global context providers, fonts, and base HTML structure.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - This will be the content of your pages.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/*
          The `children` prop here will be replaced by the content of your page.tsx files.
          For example, when you visit the home page, `children` will be the <LandingPage /> component.
          When you visit `/dashboard`, `children` will be the <DashboardPage />, wrapped in its own layout.
        */}
        {children}
      </body>
    </html>
  );
}