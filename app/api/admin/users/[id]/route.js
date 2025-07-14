// /app/api/admin/users/[id]/route.js

import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export async function PUT(req, { params }) {
  await connectedDB();
  const currentUser = await getSessionUser();

  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { role } = await req.json();

  if (!['admin', 'manager', 'user'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const updatedUser = await User.findByIdAndUpdate(
    params.id,
    { role },
    { new: true }
  );

  return NextResponse.json({ success: true, updatedUser });
}


// ✅ GET /api/admin/users/:id - Fetch single user
export async function GET(req, { params }) {
  await connectedDB();

  const { id } = params;

  try {
    const user = await User.findById(id).select('-password'); // exclude password
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (err) {
    return NextResponse.json({ message: 'Invalid user ID' }, { status: 400 });
  }
}

