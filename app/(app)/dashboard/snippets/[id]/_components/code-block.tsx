/* app/(app)/dashboard/snippets/[id]/_components/code-block.tsx */

// File: app/(app)/dashboard/snippets/[id]/_components/code-block.tsx

"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

// Step 1: Update the props interface to accept the new props
interface CodeBlockProps {
  codeHtml: string; // This will receive the highlighted HTML
  rawCode: string;  // This will receive the plain text for the copy function
}

export function CodeBlock({ codeHtml, rawCode }: CodeBlockProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    // Step 2: Use the 'rawCode' prop for the copy functionality
    navigator.clipboard.writeText(rawCode).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    <div className="relative group">
      <Button
        size="icon"
        variant="ghost"
        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
        onClick={handleCopy}
      >
        {isCopied ? (
          <Check className="h-4 w-4 text-green-500" />
        ) : (
          <Copy className="h-4 w-4 text-gray-400" />
        )}
        <span className="sr-only">Copy code</span>
      </Button>
      
      {/* 
        Step 3: Use dangerouslySetInnerHTML to render the highlighted HTML.
        The 'hljs' class is important for the theme from globals.css to apply.
        The other classes handle padding, rounded corners, and font styling.
      */}
      <pre>
        <code
          className="hljs p-6 block rounded-lg font-mono text-sm overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: codeHtml }} 
        />
      </pre>
    </div>
  );
}