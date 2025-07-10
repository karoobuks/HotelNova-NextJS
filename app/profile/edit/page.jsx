
// 'use client';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import EditProfilePage from '@/components/EditProfilePage';

// export default function EditProfilePageWrapper() {
//   const { data: session, status } = useSession();
 
//   const router = useRouter();

//   if (status === 'loading') return <p>Loading…</p>;
//   if (!session?.user) {
//     router.push('/login');
//     return null;
//   }

//   return <EditProfilePage user={{ id: session.user.id, ...session.user }} />;
// }

// 'use client';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';
// import EditProfilePage from '@/components/EditProfilePage';

// export default function EditProfilePageWrapper() {
//   const { data: session, status } = useSession();
//   const router = useRouter();

//   // Redirect to login on unauthenticated
//   useEffect(() => {
//     if (status === 'unauthenticated') {
//       router.push('/login');
//     }
//   }, [status, router]);

//   if (status === 'loading') return <p>Loading…</p>;
//   if (!session?.user) return null; // Avoid rendering before session is ready

//   return <EditProfilePage user={{ id: session.user.id, ...session.user }} />;
// }


'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import EditProfilePage from '@/components/EditProfilePage';

export default function EditProfilePageWrapper() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch('/api/me');
        if (!res.ok) throw new Error('Not authenticated');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        router.push('/login'); // redirect if not logged in manually or via google
      } finally {
        setLoading(false);
      }
    }

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading…</p>;
  if (!user) return null;

  return <EditProfilePage user={user} />;
}

