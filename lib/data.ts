// File: lib/data.ts

import { prisma } from "./prisma";

/**
 * Fetches a single snippet by its ID.
 * This function is used on the snippet detail page.
 * @param snippetId The ID of the snippet to fetch.
 * @returns The snippet object or null if not found.
 */
export async function getSnippetById(snippetId: string) {
  try {
    const snippet = await prisma.snippet.findUnique({
      where: {
        id: snippetId,
      },
    });
    return snippet;
  } catch (error) {
    console.error("Database Error:", error);
    return null;
  }
}

/**
 * --- THIS IS THE NEW FUNCTION ---
 * Fetches all snippets created by a specific user.
 * This function is used on the main snippets list page.
 * @param userId The ID of the user whose snippets to fetch.
 * @returns An array of snippet objects, ordered by creation date.
 */
export async function getUserSnippets(userId: string) {
  try {
    const snippets = await prisma.snippet.findMany({
      where: {
        userId: userId, // Find snippets that match the user's ID
      },
      orderBy: {
        createdAt: "desc", // Show the newest snippets first
      },
    });
    return snippets;
  } catch (error) {
    console.error("Database Error:", error);
    // Return an empty array on error to prevent the page from crashing
    return [];
  }
}
