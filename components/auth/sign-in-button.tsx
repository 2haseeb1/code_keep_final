import { signIn } from '@/lib/auth';
import { Button } from '@/components/ui/button';

export function SignInButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn('github', { redirectTo: '/dashboard' });
      }}
    >
      <Button type="submit">Sign in with GitHub</Button>
    </form>
  );
}