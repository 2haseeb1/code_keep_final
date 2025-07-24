"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { createSnippet, type SnippetFormState } from '@/actions/snippets.actions';
import { Button } from '@/components/ui/button'; // Assume these components exist
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" aria-disabled={pending}>
      {pending ? 'Creating...' : 'Create Snippet'}
    </Button>
  );
}

export default function NewSnippetPage() {
  const initialState: SnippetFormState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createSnippet, initialState);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Create New Snippet</h1>
      <form action={dispatch} className="space-y-6">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input id="title" name="title" required />
          {state.errors?.title && (
            <p className="text-sm text-red-500 mt-1">{state.errors.title[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="content">Code</Label>
          <Textarea id="content" name="content" rows={10} required />
          {state.errors?.content && (
            <p className="text-sm text-red-500 mt-1">{state.errors.content[0]}</p>
          )}
        </div>
        <div>
          <Label htmlFor="language">Language</Label>
          <Input id="language" name="language" defaultValue="javascript" />
        </div>

        {state.message && (
          <p className="text-sm text-red-500">{state.message}</p>
        )}

        <SubmitButton />
      </form>
    </div>
  );
}