// File: app/(app)/dashboard/snippets/new/page.tsx

"use client";

// Step 1: Import 'useActionState' from 'react' instead of 'useFormState' from 'react-dom'
import { useActionState } from "react";
import { createSnippet } from "@/actions/snippets.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SnippetFormState } from "@/actions/snippets.actions"; // Import the state type for clarity

export default function NewSnippetPage() {
  // The initial state for our form
  const initialState: SnippetFormState = { errors: {}, message: null };

  // Step 2: Use the 'useActionState' hook. It works exactly the same way.
  const [formState, formAction] = useActionState(createSnippet, initialState);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a New Snippet</h1>
      
      <form action={formAction} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="e.g., React Hook for Fetching Data" />
          {/* Display title-specific errors from the form state */}
          {formState.errors?.title && (
            <p className="text-sm text-red-500">{formState.errors.title.join(", ")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input id="language" name="language" placeholder="e.g., JavaScript" />
          {/* You can add language-specific errors here if you update the schema */}
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">Code</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="const [data, setData] = useState(null);"
            rows={15}
            className="font-mono"
          />
          {/* Display content-specific errors from the form state */}
          {formState.errors?.content && (
            <p className="text-sm text-red-500">{formState.errors.content.join(", ")}</p>
          )}
        </div>

        {/* Display a general form message (like 'Database Error' or 'Not Authenticated') */}
        {formState.message && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {formState.message}
          </div>
        )}

        <Button type="submit">Create Snippet</Button>
      </form>
    </div>
  );
}