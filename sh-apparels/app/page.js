'use client'
import Image from 'next/image';
import { useSession, SessionProvider } from 'next-auth/react';

export function Home() {
  const { data: session } = useSession();

  if (session) {
    // User is signed in
    return (
      <main className='flex flex-col justify-center items-center'>
        <h1>shApparels</h1>
      </main>
    );
  }

  // User is not signed in
  return <div>Access denied</div>;
}

export default function HomeWithSession() {
  return (
    <SessionProvider>
      <Home />
    </SessionProvider>
  );
}
