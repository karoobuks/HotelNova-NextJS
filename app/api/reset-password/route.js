// app/api/reset-password/route.js
import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';

export async function POST(req) {
  const { token, password } = await req.json();
  await connectedDB();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 12);
  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  return NextResponse.json({ message: 'Password reset successful' });
}
