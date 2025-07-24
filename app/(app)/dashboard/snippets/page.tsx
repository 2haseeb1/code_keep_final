// File: app/(app)/dashboard/snippets/page.tsx

import Link from "next/link";
import { auth } from "@/lib/auth";
import { getUserSnippets } from "@/lib/data"; // You would need to create this function
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function SnippetsListPage() {
  const session = await auth();
  if (!session?.user?.id) {
    // This should be handled by your layout middleware, but it's a good safeguard
    return <p>Please sign in to view your snippets.</p>;
  }

  const snippets = await getUserSnippets(session.user.id);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <Button asChild>
          <Link href="/dashboard/snippets/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Snippet
          </Link>
        </Button>
      </div>

      {snippets.length > 0 ? (
        <div className="space-y-4">
          {snippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/dashboard/snippets/${snippet.id}`}
              className="block p-4 border rounded-lg hover:bg-muted transition-colors"
            >
              <h2 className="text-xl font-semibold">{snippet.title}</h2>
              <p className="text-sm text-muted-foreground">{snippet.language}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No Snippets Found</h2>
          <p className="text-muted-foreground mt-2">
            Click the button above to create your first code snippet.
          </p>
        </div>
      )}
    </div>
  );
}