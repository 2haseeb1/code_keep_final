/* eslint-disable @typescript-eslint/no-unused-vars */
// File: actions/snippets.actions.ts

"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { cookies } from "next/headers";

// Define the shape of the state object for our forms, including tags
export interface SnippetFormState {
  errors?: {
    title?: string[];
    content?: string[];
    language?: string[];
    tags?: string[]; // Added tags to errors
  };
  message?: string | null;
  success?: boolean;
}

// Define a schema for validation, now including the 'tags' field
const snippetSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." }),
  language: z.string().min(1, { message: "Language cannot be empty." }),
  content: z
    .string()
    .min(10, { message: "Code snippet must be at least 10 characters long." }),
  // Add tags to the schema. It transforms a comma-separated string into a string array.
  tags: z.string().transform((val) =>
    val
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
  ),
});

/**
 * Server action to CREATE a new snippet.
 */
export async function createSnippet(
  prevState: SnippetFormState,
  formData: FormData
): Promise<SnippetFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "You must be signed in to create a snippet.",
      success: false,
    };
  }

  // Validate all fields, including the new 'tags' field
  const result = snippetSchema.safeParse({
    title: formData.get("title"),
    language: formData.get("language"),
    content: formData.get("content"),
    tags: formData.get("tags"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Invalid fields. Please correct the errors and try again.",
      success: false,
    };
  }

  try {
    await prisma.snippet.create({
      data: {
        title: result.data.title,
        language: result.data.language,
        content: result.data.content,
        tags: result.data.tags, // Save the tags array to the database
        userId: session.user.id,
      },
    });
  } catch (error) {
    return {
      message: "Database error: Failed to create snippet.",
      success: false,
    };
  }

  revalidatePath("/dashboard/snippets");
  (await cookies()).set("toast", "Snippet created successfully!");
  redirect("/dashboard/snippets");
}

/**
 * Server action to UPDATE an existing snippet.
 */
export async function updateSnippet(
  snippetId: string,
  prevState: SnippetFormState,
  formData: FormData
): Promise<SnippetFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return {
      message: "You must be signed in to update a snippet.",
      success: false,
    };
  }

  const result = snippetSchema.safeParse({
    title: formData.get("title"),
    language: formData.get("language"),
    content: formData.get("content"),
    tags: formData.get("tags"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      message: "Invalid fields. Please correct the errors and try again.",
      success: false,
    };
  }

  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id: snippetId },
    });
    if (snippet?.userId !== session.user.id) {
      return {
        message: "Unauthorized: You do not own this snippet.",
        success: false,
      };
    }
    await prisma.snippet.update({
      where: { id: snippetId },
      data: {
        title: result.data.title,
        language: result.data.language,
        content: result.data.content,
        tags: result.data.tags, // Update the tags array in the database
      },
    });
  } catch (error) {
    return {
      message: "Database error: Failed to update snippet.",
      success: false,
    };
  }

  revalidatePath(`/dashboard/snippets/${snippetId}`);
  revalidatePath("/dashboard/snippets");

  (await cookies()).set("toast", "Snippet updated successfully!");
  redirect(`/dashboard/snippets/${snippetId}`);
}

/**
 * Server action to DELETE a snippet.
 */
export async function deleteSnippet(
  prevState: { message?: string | null; success?: boolean },
  formData: FormData
): Promise<{ message: string | null; success: boolean }> {
  const snippetId = formData.get("snippetId") as string;
  if (!snippetId) {
    return { message: "Error: Snippet ID not found.", success: false };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { message: "Error: Not authenticated.", success: false };
  }

  try {
    const snippet = await prisma.snippet.findUnique({
      where: { id: snippetId },
    });
    if (snippet?.userId !== session.user.id) {
      return { message: "Error: Unauthorized action.", success: false };
    }
    await prisma.snippet.delete({ where: { id: snippetId } });
  } catch (error) {
    return {
      message: "Database Error: Failed to delete snippet.",
      success: false,
    };
  }

  revalidatePath("/dashboard/snippets");
  (await cookies()).set("toast", "Snippet deleted successfully!");
  redirect("/dashboard/snippets");
}
