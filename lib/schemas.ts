import { z } from "zod";

export const SnippetSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long." }),
  content: z
    .string()
    .min(10, {
      message: "Snippet content must be at least 10 characters long.",
    }),
  language: z.string().default("plaintext"),
});
