/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { SnippetSchema } from "@/lib/schemas";

// This is a type for the form state, used with React's useFormState hook
export type SnippetFormState = {
  errors?: {
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

export async function createSnippet(
  prevState: SnippetFormState,
  formData: FormData
): Promise<SnippetFormState> {
  // 1. Authenticate the user
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Not authenticated." };
  }

  // 2. Validate the form data
  const validatedFields = SnippetSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
    language: formData.get("language"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid fields. Failed to create snippet.",
    };
  }

  // 3. Persist data to the database
  try {
    await prisma.snippet.create({
      data: {
        title: validatedFields.data.title,
        content: validatedFields.data.content,
        language: validatedFields.data.language,
        userId: session.user.id,
      },
    });
  } catch (error) {
    return { message: "Database Error: Failed to create snippet." };
  }

  // 4. Revalidate cache and redirect
  revalidatePath("/dashboard/snippets");
  redirect("/dashboard/snippets");
}
