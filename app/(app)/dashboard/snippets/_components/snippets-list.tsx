// File: app/(app)/dashboard/snippets/_components/snippets-list.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import type { Snippet } from "@prisma/client";
import { toast } from "sonner"; // Step 1: Import the toast function

/**
 * A helper function to read a cookie and then delete it.
 * This prevents the toast from showing up again on page refresh.
 * @param name The name of the cookie to read.
 * @returns The value of the cookie, or null if not found.
 */
function getCookieAndDelete(name: string): string | null {
  if (typeof document === 'undefined') return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    const result = parts.pop()?.split(';').shift();
    // Delete the cookie by setting its expiration date to the past
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
    return result ? decodeURIComponent(result) : null;
  }

  return null;
}


interface SnippetsListProps {
  initialSnippets: Snippet[];
}

export function SnippetsList({ initialSnippets }: SnippetsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSnippets, setFilteredSnippets] = useState(initialSnippets);

  // This effect runs only once when the component mounts.
  // It checks for a 'toast' cookie left by a server action.
  useEffect(() => {
    const toastMessage = getCookieAndDelete('toast');
    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // This effect handles the client-side search functionality.
  useEffect(() => {
    const results = initialSnippets.filter(snippet =>
      snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSnippets(results);
  }, [searchTerm, initialSnippets]);

  return (
    <>
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search snippets by title or language..."
          className="w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredSnippets.length > 0 ? (
        <div className="space-y-4">
          {filteredSnippets.map((snippet) => (
            <Link
              key={snippet.id}
              href={`/dashboard/snippets/${snippet.id}`}
              className="block p-4 border rounded-lg hover:bg-muted dark:hover:bg-gray-800 transition-colors"
            >
              <h2 className="text-xl font-semibold">{snippet.title}</h2>
              <p className="text-sm text-muted-foreground">{snippet.language}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
          <h2 className="text-xl font-semibold">No Matching Snippets Found</h2>
          <p className="text-muted-foreground mt-2">
            Try a different search term or create a new snippet.
          </p>
        </div>
      )}
    </>
  );
}