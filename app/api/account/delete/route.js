import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import connectedDB from '@/config/database';
import User from '@/models/User';

export async function DELETE(req) {
  await connectedDB();

  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  try {
    const user = await User.findOneAndDelete({ email: session.user.email });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ message: 'Account deleted' }), { status: 200 });
  } catch (error) {
    console.error('Delete error:', error);
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 });
  }
}
