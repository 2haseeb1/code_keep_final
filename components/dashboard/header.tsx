import { UserAvatar } from "@/components/auth/user-avatar";

export function Header() {
  return (
    <header className="flex items-center justify-end w-full h-16 px-6 border-b">
      <UserAvatar />
    </header>
  );
}