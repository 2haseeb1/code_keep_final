// FINAL File: app/(app)/dashboard/snippets/[id]/edit/page.tsx

import { notFound } from "next/navigation";
import { getSnippetById } from "@/lib/data";
import { auth } from "@/lib/auth";
import SnippetEditForm from "./_components/SnippetEditForm";

interface SnippetEditPageProps {
  // Step 1: Update the type of params to be a Promise
  params: Promise<{ id: string }>;
}

export default async function SnippetEditPage({ params }: SnippetEditPageProps) {
  // Step 2: Await the params promise to get the id
  const { id } = await params;

  const session = await auth();
  
  // Step 3: Use the resolved 'id' to fetch the snippet
  const snippet = await getSnippetById(id);

  // নিরাপত্তা যাচাই
  if (!snippet || snippet.userId !== session?.user?.id) {
    notFound();
  }

  // সার্ভার কম্পোনেন্ট ডেটা ফেচ করে ক্লায়েন্ট কম্পোনেন্টকে পাস করে দিচ্ছে
  return <SnippetEditForm snippet={snippet} />;
}