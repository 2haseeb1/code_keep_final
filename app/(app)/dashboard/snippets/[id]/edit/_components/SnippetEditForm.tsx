// File: app/(app)/dashboard/snippets/[id]/edit/_components/SnippetEditForm.tsx

"use client";

import { useActionState, useEffect } from "react";
import type { Snippet } from "@prisma/client";
import { toast } from "sonner";

import { updateSnippet, SnippetFormState } from "@/actions/snippets.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  // Bind the snippet ID to the updateSnippet action
  const updateSnippetAction = updateSnippet.bind(null, snippet.id);

  // Set up the form state management with useActionState
  const initialState: SnippetFormState = { errors: {}, message: null, success: false };
  const [formState, formAction] = useActionState(updateSnippetAction, initialState);

  // useEffect to show toasts for success or general error messages
  useEffect(() => {
    if (formState?.message) {
      if (formState.success) {
        toast.success(formState.message);
        // We will no longer redirect from here since the action does it
      } else if (!formState.errors) {
        toast.error("Update Failed", {
          description: formState.message,
        });
      }
    }
  }, [formState]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Edit Snippet</h1>
      
      <form action={formAction} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input 
            id="title" 
            name="title" 
            defaultValue={snippet.title} 
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
            defaultValue={snippet.language} 
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
            // Convert the array of tags into a comma-separated string for the input
            defaultValue={snippet.tags.join(', ')}
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
            defaultValue={snippet.content}
            rows={15}
            className="font-mono"
          />
          {formState.errors?.content && (
            <p className="text-sm text-red-500">{formState.errors.content.join(", ")}</p>
          )}
        </div>
        
        {/* General error messages handled by toast, so this is optional */}
        {formState.message && !formState.errors && !formState.success && (
          <p className="text-sm text-red-500">{formState.message}</p>
        )}

        <Button type="submit">Update Snippet</Button>
      </form>
    </div>
  );
}