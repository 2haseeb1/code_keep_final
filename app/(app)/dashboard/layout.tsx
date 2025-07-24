// File: app/(app)/dashboard/layout.tsx

import { ThemeToggle } from "@/components/theme-toggle";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
    
      <main className="flex-1 p-6">
        <header className="flex justify-end mb-6">
          <ThemeToggle />
        </header>
        {children}
      </main>
    </div>
  );
}