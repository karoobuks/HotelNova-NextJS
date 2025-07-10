import connectedDB from '@/config/database';
import Notification from '@/models/Notification';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';

export async function POST() {
  await connectedDB();
  const user = await getSessionUser();
  

  if (!user?._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  await Notification.updateMany(
    { user: user._id, read: false },
    { $set: { read: true } }
  );

  return NextResponse.json({ message: 'Marked as read' });
}


