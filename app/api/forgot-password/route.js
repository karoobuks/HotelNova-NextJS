// app/api/forgot-password/route.js
import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import User from '@/models/User';
import crypto from 'crypto';
import { send } from '@emailjs/nodejs';

export async function POST(req) {
  const { email } = await req.json();
  await connectedDB();

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: 'Email not found' }, { status: 404 });
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + 15 * 60 * 1000; // 15 mins

  user.resetToken = token;
  user.resetTokenExpiry = expires;
  await user.save();

  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

  console.log('Reset Link:', resetLink);


  try {
    await send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
      process.env.NEXT_PUBLIC_EMAILJS_PASSWORD_RESET_TEMPLATE_ID,
      {
        email: email,
        reset_link: resetLink,
        company: 'HotelNova',
      },
      {
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
        privateKey: process.env.NEXT_PUBLIC_EMAILJS_PRIVATE_KEY,
      }
    );

    return NextResponse.json({ message: 'Reset link sent to your email' });
  } catch (err) {
     console.error('Email sending failed:', err);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
