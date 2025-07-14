// /app/api/admin/rooms/route.js
import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { authorizeRole } from '@/utils/authorizeRole';
import Room from '@/models/Room';

export const dynamic = 'force-dynamic'; // Optional: ensure fresh data every call

export async function GET(req) {
  await connectedDB();

  const user = await getSessionUser();

  if (!user || !authorizeRole(user, ['admin', 'manager'])) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  try {
    const rooms = await Room.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ rooms });
  } catch (err) {
    console.error('❌ Failed to fetch rooms:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
