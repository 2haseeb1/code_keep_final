import { auth, signOut } from "@/lib/auth";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { SignInButton } from "./sign-in-button";

export async function UserAvatar() {
  const session = await auth();

  if (!session?.user) {
    // Optionally return a sign-in button if no user is found
    return <SignInButton />;
  }

  const { name, image } = session.user;

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        {image && (
          <Image
            src={image}
            alt={name || "User avatar"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium">{name}</span>
      </div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" variant="ghost" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </form>
    </div>
  );
}