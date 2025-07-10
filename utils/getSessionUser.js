// import { getServerSession } from "next-auth";
// import { authOptions } from "./authOptions";

// export const getSessionUser = async (req) => {
//     const session = await getServerSession(authOptions)
//       console.log('👉 FULL SESSION:', session); // 🔍 See what it contains 

//     if (!session || !session.user || !session.user.id) {
//         throw new Error("❌ No user found in session.");
        
//     }

    
//   // if (!session || !session.user) {
//   //   return null;
//   // }


//     return {
//         user: session.user,
//         userId: session.user._id || session.user.id,
//     }
// }

// import { getServerSession } from 'next-auth';
// import { authOptions } from './authOptions';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import User from '@/models/User';
// import connectedDB from '@/config/database';

// export const getSessionUser = async () => {
//   await connectedDB();

//   // ✅ Try NextAuth session (Google login)
//   const session = await getServerSession(authOptions);
//   if (session?.user?.email) {
//     const user = await User.findOne({ email: session.user.email }).lean();
//     if (user) return user;
//   }

//   // ✅ Fallback to manual JWT token from cookies
//   const token =  cookies().get('token')?.value;
//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).lean();
//     return user;
//   } catch (err) {
//     console.error('❌ Invalid manual JWT token in getSessionUser():', err);
//     return null;
//   }
// };



// // utils/getSessionUser.js
// import jwt from 'jsonwebtoken';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/utils/authOptions';
// import connectedDB from '@/config/database';
// import User from '@/models/User';

// export async function getSessionUser(cookiesInstance) {
//   await connectedDB();

//   // ✅ 1. Check Google login via next-auth
//   const session = await getServerSession(authOptions);
//   if (session?.user?.email) {
//     const user = await User.findOne({ email: session.user.email }).lean();
//     return user;
//   }

//   // ✅ 2. Fallback to manual JWT cookie
//   const token = cookiesInstance.get('token')?.value;
//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).lean();
//     return user;
//   } catch (err) {
//     console.error('❌ Invalid token:', err);
//     return null;
//   }
// }

// // utils/getSessionUser.js
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/utils/authOptions';
// import jwt from 'jsonwebtoken';
// import { cookies } from 'next/headers';
// import connectedDB from '@/config/database';
// import User from '@/models/User';

// export async function getSessionUser() {
//   await connectedDB();

//   // ✅ Check Google login session
//   const session = await getServerSession(authOptions);
//   if (session?.user?.email) {
//     const user = await User.findOne({ email: session.user.email }).lean();
//     return user;
//   }

//   // ✅ Fallback: Check for manual JWT token in cookie
//   const token = cookies().get('token')?.value;
//   if (!token) return null;

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const user = await User.findById(decoded.id).lean();
//     return user;
//   } catch (err) {
//     console.error('❌ Invalid token in getSessionUser:', err);
//     return null;
//   }
// }


// utils/getSessionUser.js
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import connectedDB from '@/config/database';
import User from '@/models/User';

export async function getSessionUser() {
  await connectedDB();

  const session = await getServerSession(authOptions);
  if (session?.user?.email) {
    const user = await User.findOne({ email: session.user.email }).lean();
    return user;
  }

  const token = cookies().get('token')?.value;
  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).lean();
    return user;
  } catch (err) {
    console.error('❌ Invalid token in getSessionUser:', err);
    return null;
  }
}


