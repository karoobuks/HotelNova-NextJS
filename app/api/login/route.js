// import connectedDB from '@/config/database';
// import User from '@/models/User';
// import bcrypt from 'bcryptjs';
// import { NextResponse } from 'next/server';
// import { serialize } from 'cookie';
// import jwt from 'jsonwebtoken';

// export async function POST(req) {
//   await connectedDB();
//   const { email, password } = await req.json();

//   const user = await User.findOne({ email });
//   if (!user || !user.password) {
//     return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
//   }

//   user.lastLogin = new Date();
// await user.save();


//   const token = jwt.sign(
//     { id: user._id, email: user.email, role: user.role },
//     process.env.JWT_SECRET,
//     { expiresIn: '7d' }
//   );

//  const cookie = serialize('token', token, {
//   httpOnly: true,
//   secure: process.env.NODE_ENV === 'production',
//   sameSite: 'lax',
//   path: '/',
//   maxAge: 60 * 60 * 24 * 7,
// });


//   return new NextResponse(JSON.stringify({ message: 'Login successful' }), {
//     status: 200,
//     headers: { 'Set-Cookie': cookie },
//   });
// }


import connectedDB from '@/config/database';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  await connectedDB();

  const { email, password } = await req.json();

  const user = await User.findOne({ email });

  if (!user || !user.password) {
    return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return NextResponse.json({ message: 'Incorrect password' }, { status: 401 });
  }

  // ✅ Update last login timestamp
  user.lastLogin = new Date();
  await user.save(); // Save updated user

  // ✅ Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );

  // ✅ Create cookie
  const cookie = serialize('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return new NextResponse(
    JSON.stringify({ message: 'Login successful' }),
    {
      status: 200,
      headers: { 'Set-Cookie': cookie },
    }
  );
}
