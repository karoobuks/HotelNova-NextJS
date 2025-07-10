import connectedDB from '@/config/database';
import Notification from '@/models/Notification';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';

export async function POST(req, { params }) {
  await connectedDB();
  const user = await getSessionUser();
  

  if (!user?._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const notificationId = params._id;

  try {
    await Notification.findOneAndUpdate(
      { _id: notificationId, user: user._id },
      { read: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to mark notification as read' }, { status: 500 });
  }
}
