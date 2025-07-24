// File: app/(app)/dashboard/layout.tsx

import { auth } from "@/lib/auth";
import { UserAvatar } from "@/components/auth/user-avatar";
import { ThemeToggle } from "@/components/theme-toggle";

// Step 1: Import the new SidebarNav component we will create
import { SidebarNav } from "./_components/sidebar-nav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // We can fetch the session here to pass user info to the header
  const session = await auth();

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      
      {/* --- Start of Sidebar --- */}
      {/* This sidebar is visible on medium screens and larger (md:flex) */}
      <aside className="w-64 border-r p-6 pt-8 flex-col gap-6 hidden md:flex">
        {/* The navigation links are now managed by a dedicated client component */}
        <SidebarNav />
      </aside>
      {/* --- End of Sidebar --- */}

      {/* --- Start of Main Content Area --- */}
      <div className="flex-1 flex flex-col">
        
        {/* --- Start of Header --- */}
        {/* This header contains user info and the theme toggle */}
        <header className="flex h-16 items-center justify-end border-b px-6">
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* Display the user's avatar if they are logged in */}
            {session?.user && <UserAvatar user={session.user} />}
          </div>
        </header>
        {/* --- End of Header --- */}
        
        {/* --- Start of Page Content --- */}
        {/* Your actual page content (e.g., snippets list) will be rendered here */}
        <main className="flex-1 p-6">
          {children}
        </main>
        {/* --- End of Page Content --- */}

      </div>
      {/* --- End of Main Content Area --- */}

    </div>
  );
}