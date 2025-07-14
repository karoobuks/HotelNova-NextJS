// /app/api/profile/change-password/route.js
import connectedDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';
import Notification from '@/models/Notification';

export async function POST(req) {
  await connectedDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if(newPassword === currentPassword) {
    return NextResponse.json({error:'New Passwprd can not be same with Current Password'})
  }

  const user = await User.findById(sessionUser._id).select('+password');

  if (!user || !user.password) {
    return NextResponse.json({ error: 'This account has no password set (Google login?)' }, { status: 400 });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);
  if (!isMatch) {
    return NextResponse.json({ error: 'Current password is incorrect' }, { status: 401 });
  }

  const hashedNewPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedNewPassword;
  await user.save();

  await Notification.create({
    user: user._id,
    type: 'security',
    message: 'Your password was changed successfully.',
  });

  return NextResponse.json({ message: 'Password changed successfully' }, { status: 200 });
}
