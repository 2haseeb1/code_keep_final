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
      <aside className="w-64 p-4 border-r">
        {/* Your Sidebar content here */}
        <h2 className="font-bold">DevKeep</h2>
        <nav className="mt-8">
          <a href="/dashboard">Dashboard</a>
          <br />
          <a href="/dashboard/snippets">Snippets</a>
        </nav>
      </aside>
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}