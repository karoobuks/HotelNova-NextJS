// /api/admin/users/[id]/status.js
import connectedDB from '@/config/database';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
  await connectedDB();
  const { id } = params;
  const { status } = await req.json();

  const validStatuses = ['verified', 'banned', 'regular'];
  if (!validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
  }

  const user = await User.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json(user);
}
