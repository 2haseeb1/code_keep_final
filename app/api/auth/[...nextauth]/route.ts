// app/api/auth/[...nextauth]/route.ts

// 1. Import the handlers directly from your auth config file
import { handlers } from "@/lib/auth";

// 2. Export the handlers for the GET and POST methods
export const { GET, POST } = handlers;

// You can now delete the old code that imported NextAuth and authOptions.
