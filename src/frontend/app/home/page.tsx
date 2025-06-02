'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const res = await fetch('http://localhost:3000/auth/me', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) {
        router.replace('/');
        clearInterval(intervalId);
        return;
      }
      setLoading(false);
    }

    checkAuth().catch(() => {
      router.replace('/');
      clearInterval(intervalId);
    });

    const intervalId = setInterval(() => {
      checkAuth().catch(console.error);
    }, 30000);

    return () => clearInterval(intervalId);
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      {/* Add your home/dashboard content */}
    </div>
  );
}
