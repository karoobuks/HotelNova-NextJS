
'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import EditProfilePage from '@/components/EditProfilePage';

export default function EditProfilePageWrapper() {
  const { data: session, status } = useSession();
 
  const router = useRouter();

  if (status === 'loading') return <p>Loading…</p>;
  if (!session?.user) {
    router.push('/login');
    return null;
  }

  return <EditProfilePage user={{ id: session.user.id, ...session.user }} />;
}

