import connectedDB from '@/config/database';
import Notification from '@/models/Notification';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectedDB();
  const session = await getSessionUser();
  const user = session?.user;

  if (!user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const notifications = await Notification.find({ user: user.id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ notifications });
}

