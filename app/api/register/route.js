import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectedDB from '@/config/database';
import User from '@/models/User';
import Notification from '@/models/Notification';

export async function POST(req) {
  try {
    await connectedDB();

    const { firstname, lastname, email, password, phone, address } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    // // 🔐 Check if trying to create elevated user
    // if (['admin', 'manager'].includes(role)) {
    //   const currentUser = await getSessionUser();

    //   if (!currentUser || currentUser.role !== 'admin') {
    //     return NextResponse.json({ message: 'Only admins can create admin/manager accounts' }, { status: 403 });
    //   }
    // }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phone,
      address,
      // role,
    });

    // Create welcome notification
    await Notification.create({
      user: newUser._id,
      message: `🎉 Welcome to HotelNova, ${newUser.firstname || 'Guest'}!`,
      type: 'welcome',
      isRead: false,
      createdAt: new Date(),
    });

    await newUser.save();

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (err) {
    console.error('Register error:', err);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
