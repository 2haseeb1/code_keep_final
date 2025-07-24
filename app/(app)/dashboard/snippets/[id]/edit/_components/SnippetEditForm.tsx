// File: app/(app)/dashboard/snippets/[id]/edit/_components/SnippetEditForm.tsx

"use client";

import { useActionState, useEffect } from "react";
import type { Snippet } from "@prisma/client";
import { toast } from "sonner"; // Step 1: Import the toast function

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
  const initialState: SnippetFormState = { errors: {}, message: null };
  const [formState, formAction] = useActionState(updateSnippetAction, initialState);

  // Step 2: Add a useEffect to show toasts when a general error message is returned
  useEffect(() => {
    // Show a toast only for general form messages, not for field-specific errors
    if (formState?.message && !formState.errors) {
      toast.error("Update Failed", {
        description: formState.message,
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });
    }
  }, [formState]);

  // The complete JSX for the form
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

        {/* This block will no longer be shown, as the message is handled by the toast.
            You can keep it as a fallback or remove it. */}
        {/* {formState.message && !formState.errors && (
          <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
            {formState.message}
          </div>
        )} */}

        <Button type="submit">Update Snippet</Button>
      </form>
    </div>
  );
}