// File: app/(app)/dashboard/snippets/_components/snippets-list.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Snippet } from "@prisma/client";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge"; // Step 1: Import the Badge component

/**
 * A helper function to read a cookie and then delete it.
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

  // Effect to show toast notifications from server actions
  useEffect(() => {
    const toastMessage = getCookieAndDelete('toast');
    if (toastMessage) {
      toast.success(toastMessage);
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to handle client-side search, now including tags
  useEffect(() => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const results = initialSnippets.filter(snippet =>
      snippet.title.toLowerCase().includes(lowercasedTerm) ||
      snippet.language.toLowerCase().includes(lowercasedTerm) ||
      // Step 2: Add logic to search within the tags array
      snippet.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm))
    );
    setFilteredSnippets(results);
  }, [searchTerm, initialSnippets]);

  return (
    <>
      <div className="mb-6">
        <Input
          type="search"
          // Step 3: Update the placeholder text
          placeholder="Search snippets by title, language, or tag..."
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
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{snippet.title}</h2>
                <p className="text-sm text-muted-foreground flex-shrink-0 ml-4">{snippet.language}</p>
              </div>
              
              {/* Step 4: Display the tags as badges */}
              {snippet.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {snippet.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}
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