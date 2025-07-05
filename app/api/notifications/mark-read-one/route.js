import connectedDB from '@/config/database';
import Notification from '@/models/Notification';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';

export async function POST() {
  await connectedDB();
  const session = await getSessionUser();
  const user = session?.user;

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await Notification.updateMany(
    { user: user.id, read: false },
    { $set: { read: true } }
  );

  return NextResponse.json({ message: 'Marked as read' });
}


