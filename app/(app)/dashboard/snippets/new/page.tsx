// File: app/(app)/dashboard/snippets/new/page.tsx

"use client";

import { useFormState } from "react-dom";
import { createSnippet } from "@/actions/snippets.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function NewSnippetPage() {
  // আপনার SnippetFormState-এর সাথে সামঞ্জস্যপূর্ণ initialState
  const initialState = { errors: {}, message: null };
  const [formState, formAction] = useFormState(createSnippet, initialState);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Create a New Snippet</h1>
      
      <form action={formAction} className="space-y-6 max-w-2xl">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" placeholder="e.g., React Hook for Fetching Data" />
          {/* Display title-specific errors */}
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
          {/* Display content-specific errors */}
          {formState.errors?.content && (
            <p className="text-sm text-red-500">{formState.errors.content.join(", ")}</p>
          )}
        </div>

        {/* Display a general form message (like 'Database Error') */}
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