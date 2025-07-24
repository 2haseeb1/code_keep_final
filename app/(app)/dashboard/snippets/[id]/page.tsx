// File: app/(app)/dashboard/snippets/[id]/page.tsx

import type { Metadata } from 'next';
import { notFound } from "next/navigation";
import Link from 'next/link'; // Step 1: Import the Link component
import { auth } from "@/lib/auth";
import { getSnippetById } from "@/lib/data";
import { CodeBlock } from "./_components/code-block";
import hljs from '@/lib/highlighter';
import { DeleteButton } from './_components/DeleteButton';
import { Button } from '@/components/ui/button'; // Step 2: Import the Button component

type Props = {
  params: Promise<{ id: string }>;
};

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

export default async function SnippetDetailPage({ params }: Props) {
  const { id } = await params;
  const session = await auth();
  const snippet = await getSnippetById(id);

  if (!snippet || snippet.userId !== session?.user?.id) {
    notFound();
  }

  let language = snippet.language.toLowerCase().replace(/\s/g, '');
  if (!hljs.getLanguage(language)) {
    language = 'typescript'; 
  }
  const highlightedCode = hljs.highlight(snippet.content, {
    language: language,
    ignoreIllegals: true,
  }).value;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6 pb-4 border-b">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">{snippet.title}</h1>
          
          {/* --- Start of the update --- */}
          <div className="flex items-center gap-4">
            {/* Step 3: Add the Edit button wrapped in a Link */}
            <Link href={`/dashboard/snippets/${snippet.id}/edit`}>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </Link>

            {/* The DeleteButton remains as it was */}
            <DeleteButton snippetId={snippet.id} />
          </div>
          {/* --- End of the update --- */}
        </div>
      </div>
      
      <CodeBlock codeHtml={highlightedCode} rawCode={snippet.content} />
    </div>
  );
}