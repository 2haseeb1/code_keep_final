// File: app/(app)/dashboard/snippets/[id]/page.tsx

import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { getSnippetById } from "@/lib/data";
import { CodeBlock } from "./_components/code-block";

// Import your custom configured highlight.js instance
import hljs from '@/lib/highlighter';

// Define the props type for the page and metadata function
type Props = {
  params: Promise<{ id: string }>;
};

// The generateMetadata function remains unchanged.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const snippet = await getSnippetById(id);

  if (!snippet) {
    return { title: "Snippet Not Found" };
  }

  return {
    title: `${snippet.title} | DevKeep`,
    description: `Code snippet for ${snippet.title}`,
  };
}

// This is the main server component for the page
export default async function SnippetDetailPage({ params }: Props) {
  // Await the params promise to get the id
  const { id } = await params;
  
  // Get the current user session
  const session = await auth();
  
  // Fetch the snippet data from the database
  const snippet = await getSnippetById(id);

  // Security check
  if (!snippet || snippet.userId !== session?.user?.id) {
    notFound();
  }

  // --- Start of the fix ---

  // Step 1: Sanitize the language name from the database.
  // We use 'let' because we might need to change its value.
  let language = snippet.language.toLowerCase().replace(/\s/g, '');

  // Step 2: Check if the sanitized language is registered in our hljs instance.
  // The getLanguage() method returns 'undefined' if the language is not found.
  if (!hljs.getLanguage(language)) {
    // Step 3: If the language is not found, fall back to a safe default.
    // 'typescript' is a good default for a modern web dev snippet app.
    language = 'typescript'; 
  }

  // Use the (now guaranteed to be valid) language to highlight the code.
  const highlightedCode = hljs.highlight(snippet.content, {
    language: language,
    ignoreIllegals: true,
  }).value;

  // --- End of the fix ---

  // This is the JSX that renders the page
  return (
    <div className="max-w-4xl mx-auto">
      
      {/* Header Section */}
      <div className="mb-6 pb-4 border-b border-red-200">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-red-800">{snippet.title}</h1>
        </div>
      </div>

      {/* Render the CodeBlock with the highlighted HTML */}
      <CodeBlock codeHtml={highlightedCode} rawCode={snippet.content} />

    </div>
  );
}