// File: app/(app)/dashboard/page.tsx

import { auth } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

export default async function DashboardPage() {
  const session = await auth();
  const userName = session?.user?.name || "User";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome, {userName}!</h1>
        <p className="text-muted-foreground">
          Manage your code snippets from here.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/dashboard/snippets">View My Snippets</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/dashboard/snippets/new">Create New Snippet</Link>
        </Button>
      </div>
    </div>
  );
}