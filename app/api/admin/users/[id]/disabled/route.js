// /app/api/admin/users/[id]/disabled/route.js
import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export async function PUT(req, { params }) {
  await connectedDB();
  const admin = await getSessionUser();

  if (!admin || admin.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const { id } = params;
  const { disabled } = await req.json();

  try {
    await User.findByIdAndUpdate(id, { disabled });
    return NextResponse.json({ message: `User ${disabled ? 'deactivated' : 'activated'}` });
  } catch (err) {
    console.error('❌ Toggle disable failed:', err);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}
