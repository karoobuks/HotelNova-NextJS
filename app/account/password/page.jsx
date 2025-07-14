// app/account/password/page.jsx


import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import ChangePasswordForm from '@/components/ChangePasswordForm';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import connectedDB from '@/config/database';
import User from '@/models/User';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export default async function ChangePasswordPage() {
  await connectedDB();

  let user = null;

  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    user = await User.findOne({ email: session.user.email }).lean();
  }

  // If not NextAuth, try JWT manually
  if (!user) {
    const token = cookies().get('token')?.value;
    if (!token) return redirect('/login');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id).lean();
    } catch (err) {
      console.error('Invalid JWT:', err);
      return redirect('/login');
    }
  }

  if (!user || !user.password) {
    // If user signed in with Google and has no password
    return (
      <section className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
        <div className="bg-white p-8 rounded-lg shadow max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-blue-700">Change Password</h2>
          <p className="text-gray-600">
            You signed up with Google. Password change is not available.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-blue-50 flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-lg shadow max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Change Password</h2>
        <ChangePasswordForm userId={user._id.toString()} />
      </div>
    </section>
  );
}
