"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Code, Link as LinkIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/snippets", label: "Snippets", icon: Code },
  { href: "/links", label: "Links", icon: LinkIcon },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 p-4 border-r bg-muted/40 h-screen">
      <div className="flex items-center mb-8">
        <Code className="h-6 w-6 mr-2" />
        <h2 className="text-xl font-bold">DevKeep</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname.startsWith(item.href) && "bg-muted text-primary"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}