// File: app/(app)/dashboard/snippets/_components/snippets-list.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import type { Snippet } from "@prisma/client"; // Import the Snippet type from Prisma

interface SnippetsListProps {
  initialSnippets: Snippet[];
}

export function SnippetsList({ initialSnippets }: SnippetsListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredSnippets, setFilteredSnippets] = useState(initialSnippets);

  // This effect runs whenever the search term changes
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