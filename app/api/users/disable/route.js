// app/api/users/disable/route.js

import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import User from '@/models/User';

export async function DELETE(req) {
  await connectedDB();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    await User.findByIdAndUpdate(token.id, { disabled: true });
    return NextResponse.json({ message: 'Account disabled' });
  } catch (error) {
    console.error('❌ Disable error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
