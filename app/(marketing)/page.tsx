import { SignInButton } from '@/components/auth/sign-in-button';

export default function LandingPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Welcome to DevKeep</h1>
      <p className="mt-4 text-lg text-muted-foreground">Your personal code snippet manager.</p>
      <div className="mt-8">
        <SignInButton />
      </div>
    </main>
  );
}