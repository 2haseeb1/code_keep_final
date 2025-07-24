// File: app/(app)/dashboard/_components/sidebar-nav.tsx

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; // shadcn/ui-এর ক্লাস মার্জ করার ইউটিলিটি
import { Code, LayoutDashboard } from "lucide-react";

// আমাদের নেভিগেশন লিংকগুলোর একটি তালিকা
const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/snippets", label: "Snippets", icon: Code },
  // ভবিষ্যতে এখানে আরও লিংক যোগ করতে পারেন
  // { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <Link href="/dashboard" className="text-2xl font-bold text-primary mb-6">
        DevKeep
      </Link>
      <nav className="flex flex-col gap-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                isActive && "bg-muted text-primary" // <-- অ্যাক্টিভ লিংকের জন্য বিশেষ স্টাইল
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}