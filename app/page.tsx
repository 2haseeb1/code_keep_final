import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SignInButton } from "@/components/auth/sign-in-button";
import { Button } from "@/components/ui/button";
import { Code, Link as LinkIcon, Search } from "lucide-react";
import Link from "next/link";

/**
 * This is the main landing page for the application.
 * It's a Server Component, so we can perform server-side checks like authentication.
 */
export default async function LandingPage() {
  // Check if the user is already logged in.
  const session = await auth();

  // If a session exists, redirect them directly to their dashboard.
  // This provides a better user experience for returning users.
  if (session?.user) {
    redirect("/dashboard");
  }

  // If no session, render the public landing page.
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 text-center bg-background">
      <div className="max-w-2xl">
        <h1 className="text-5xl font-bold tracking-tight md:text-6xl">
          Never Lose a Snippet Again.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground">
          DevKeep is your personal, secure, and searchable vault for all the
          code snippets, commands, and links you want to remember.
        </p>
      </div>

      <div className="mt-10 flex gap-4">
        <SignInButton />
        <Button variant="outline" asChild>
          <Link href="https://github.com/your-repo-link" target="_blank">
            View on GitHub
          </Link>
        </Button>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl">
        <div className="flex flex-col items-center">
          <Code className="h-10 w-10 text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Store Snippets</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Save code in any language with syntax highlighting.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <LinkIcon className="h-10 w-10 text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Bookmark Links</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Keep track of useful articles, docs, and tutorials.
          </p>
        </div>
        <div className="flex flex-col items-center">
          <Search className="h-10 w-10 text-primary" />
          <h3 className="mt-4 text-lg font-semibold">Find Instantly</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Powerful search to find exactly what you need, when you need it.
          </p>
        </div>
      </div>
    </main>
  );
}