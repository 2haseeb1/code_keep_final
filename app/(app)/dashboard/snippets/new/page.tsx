// File: app/(app)/dashboard/snippets/new/page.tsx

"use client";

import { useActionState } from "react";
import { createSnippet, SnippetFormState } from "@/actions/snippets.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSnippetPage() {
  // The initial state for our form, matching the SnippetFormState interface
  const initialState: SnippetFormState = { errors: {}, message: null, success: false };
  const [formState, formAction] = useActionState(createSnippet, initialState);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a New Snippet</h1>
      
      <form action={formAction} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            placeholder="e.g., React Hook for Fetching Data" 
          />
          {formState.errors?.title && (
            <p className="text-sm text-red-500">{formState.errors.title.join(", ")}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Language</Label>
          <Input 
            id="language" 
            name="language" 
            placeholder="e.g., JavaScript" 
          />
          {formState.errors?.language && (
            <p className="text-sm text-red-500">{formState.errors.language.join(", ")}</p>
          )}
        </div>

        {/* --- Start of New Tags Field --- */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input 
            id="tags" 
            name="tags"
            placeholder="e.g., react, javascript, hook"
          />
          <p className="text-sm text-muted-foreground">
            Enter tags separated by commas.
          </p>
          {formState.errors?.tags && (
            <p className="text-sm text-red-500">{formState.errors.tags.join(", ")}</p>
          )}
        </div>
        {/* --- End of New Tags Field --- */}

        <div className="space-y-2">
          <Label htmlFor="content">Code</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="const [data, setData] = useState(null);"
            rows={15}
            className="font-mono"
          />
          {formState.errors?.content && (
            <p className="text-sm text-red-500">{formState.errors.content.join(", ")}</p>
          )}
        </div>
        
        {/* Display general form messages (like 'Not Authenticated' or 'Database Error') */}
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