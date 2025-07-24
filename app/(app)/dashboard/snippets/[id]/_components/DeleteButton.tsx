// File: app/(app)/dashboard/snippets/[id]/_components/DeleteButton.tsx

"use client";

import { useActionState, useEffect, useTransition } from "react";
import { deleteSnippet } from "@/actions/snippets.actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface DeleteButtonProps {
  snippetId: string;
}

export function DeleteButton({ snippetId }: DeleteButtonProps) {
  const [state, formAction] = useActionState(deleteSnippet, { message: null, success: false });
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
        
        // --- মূল সমাধান এখানে ---
        // ডিলিট হয়ে যাওয়া detail পেজের পরিবর্তে, snippet তালিকা পেজে পাঠান
        setTimeout(() => {
          window.location.href = "/dashboard/snippets";
        }, 1000); 
        // --- শেষ ---

      } else {
        toast.error("Action Failed", {
          description: state.message,
        });
      }
    }
  }, [state]);

  const handleDeleteClick = () => {
    toast("Are you sure?", {
      description: "This will permanently delete your snippet.",
      action: {
        label: "Delete",
        onClick: () => {
          startTransition(() => {
            const formData = new FormData();
            formData.append("snippetId", snippetId);
            formAction(formData);
          });
        },
      },
      cancel: { label: "Cancel", onClick: () => toast.dismiss() },
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDeleteClick}
      disabled={isPending}
    >
      {isPending ? "Deleting..." : "Delete"}
    </Button>
  );
}