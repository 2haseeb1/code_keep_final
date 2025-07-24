/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';
import { auth } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { Button } from '@/components/ui/button'; // Assume you have a button component
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from 'react';

export default async function SnippetsPage() {
  const session = await auth();
  const snippets = await prisma.snippet.findMany({
    where: { userId: session?.user?.id },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Snippets</h1>
        <Button asChild>
          <Link href="/snippets/new">Create Snippet</Link>
        </Button>
      </div>

      {snippets.length === 0 ? (
        <p>{`You haven't created any snippets yet.`}</p>
      ) : (
        <div className="space-y-4">
          {snippets.map((snippet: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; language: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <div key={snippet.id} className="p-4 border rounded-lg">
              <h2 className="font-semibold">{snippet.title}</h2>
              <p className="text-sm text-muted-foreground">{snippet.language}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}