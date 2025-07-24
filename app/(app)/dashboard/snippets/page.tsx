// File: app/(app)/dashboard/snippets/page.tsx

import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUserSnippets } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

// Step 1: Import the new client component you just created
import { SnippetsList } from "./_components/snippets-list"; 

export default async function SnippetsListPage() {
  const session = await auth();
  if (!session?.user?.id) {
    // This check remains for non-logged-in users
    return <p>Please sign in to view your snippets.</p>;
  }

  // Step 2: Fetch the initial data on the server, just as before.
  const snippets = await getUserSnippets(session.user.id);

  return (
    <div>
      {/* The header section remains here */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <Button asChild>
          <Link href="/dashboard/snippets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Snippet
          </Link>
        </Button>
      </div>

      {/* 
        Step 3: Render your new component.
        - If snippets exist, pass the server-fetched data as a prop.
        - If no snippets exist at all, show the "No Snippets Found" message.
      */}
      {snippets.length > 0 ? (
        <SnippetsList initialSnippets={snippets} />
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No Snippets Found</h2>
          <p className="text-muted-foreground mt-2">
            {`Click the "Create Snippet" button to get started.`}
          </p>
        </div>
      )}
    </div>
  );
}