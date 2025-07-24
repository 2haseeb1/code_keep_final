import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

// This layout protects all child routes.
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect('/'); // Redirect to landing page if not logged in
  }

  return (
    <div className="flex">
    
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}