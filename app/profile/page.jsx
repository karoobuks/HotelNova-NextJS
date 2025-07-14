

// export const dynamic = 'force-dynamic';
// export const revalidate = 0;
// export const fetchCache = 'force-no-store';

// import Image from 'next/image';
// import Link from 'next/link';
// import { cookies } from 'next/headers';
// import jwt from 'jsonwebtoken';
// import { redirect } from 'next/navigation';
// import { FaGear } from 'react-icons/fa6';
// import { FaQuestionCircle, FaComments, FaUser } from 'react-icons/fa';

// import connectedDB from '@/config/database';
// import User from '@/models/User';
// import Review from '@/models/Review';
// import Booking from '@/models/Booking';
// import Room from '@/models/Room';
// import profileDefault from '@/assets/images/profile.png';
// import BookingHistory from '@/components/BookingHistory';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/utils/authOptions';

// const ProfilePage = async () => {
//   await connectedDB();

//   let user = null;

//   // ✅ Try NextAuth Google session
//   const session = await getServerSession(authOptions);

//   if (session?.user?.email) {
//     user = await User.findOne({ email: session.user.email }).lean();
//   }

//   // ✅ If Google session failed, try manual JWT cookie
//   if (!user) {
//     const token = cookies().get('token')?.value;

//     if (!token) return redirect('/login');

//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       user = await User.findById(decoded.id).lean();
//     } catch (err) {
//       console.error('❌ Invalid or expired manual JWT token:', err);
//       return redirect('/login');
//     }
//   }

//   if (!user) {
//     console.error('❌ No user found after auth.');
//     return (
//       <section className="text-center py-10 text-red-500 text-lg">
//         Failed to load profile. Please try again later.
//       </section>
//     );
//   }

//   // Fetch user stats
//   const reviewCount = await Review.countDocuments({ reviewer: user._id });
//   const bookings = await Booking.find({ user: user._id }).populate('room').lean();
//   const bookingsJSON = JSON.parse(JSON.stringify(bookings));

//   return (
//     <section className="bg-blue-50 min-h-screen">
//       <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">

//         {/* Profile Header */}
//         <div className="bg-white p-8 shadow rounded-lg">
//           <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
//             <FaUser className="text-3xl" /> <span>My Profile</span>
//           </h1>

//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500">
//               <Image
//                 src={user.image ? `${user.image}?t=${Date.now()}` : profileDefault}
//                 alt="User"
//                 unoptimized
//                 fill
//                 className="object-cover"
//               />
//             </div>

//             <div>
//               <p className="text-xl font-semibold text-gray-800">
//                 Name: {user.name || `${user.firstname || ''} ${user.lastname || ''}`}
//               </p>
//               <p className="text-lg text-gray-600">Email: {user.email}</p>
//               <p className="text-lg text-gray-600">Phone: {user.phone || 'Not Provided'}</p>
//               <Link
//                 href="/profile/edit"
//                 className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Edit Profile
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Booking History */}
//         <BookingHistory bookings={bookingsJSON} />

//         {/* Review Count */}
//         <div className="bg-white p-8 mt-10 shadow rounded-lg">
//           <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
//             <FaComments className="text-2xl" /> <span>My Reviews</span>
//           </h2>
//           <p className="text-gray-600">
//             You’ve written {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
//           </p>
//         </div>

//         {/* Account Settings */}
//         <div className="bg-white p-8 mt-10 shadow rounded-lg">
//           <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
//             <FaGear className="text-2xl" /> <span>Account Settings</span>
//           </h2>
//           <div className="space-y-4">
//             <Link href="/account/password" className="text-blue-600 underline text-sm block">
//               Change Password
//             </Link>
//             <button className="text-red-500 underline text-sm">Delete Account</button>
//           </div>
//         </div>

//         {/* Support */}
//         <div className="bg-white p-8 mt-10 shadow rounded-lg">
//           <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
//             <FaQuestionCircle className="text-2xl" /> <span>Need Help?</span>
//           </h2>
//           <p className="text-gray-600 mb-2">
//             Reach us via email at{' '}
//             <a href="mailto:support@hotelnova.com" className="text-blue-600 underline">
//               support@hotelnova.com
//             </a>
//           </p>
//           <Link href="/faq" className="text-blue-600 underline text-sm">
//             Visit our FAQ
//           </Link>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProfilePage;


export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { redirect } from 'next/navigation';
import { FaGear } from 'react-icons/fa6';
import { FaQuestionCircle, FaComments, FaUser } from 'react-icons/fa';

import connectedDB from '@/config/database';
import User from '@/models/User';
import Review from '@/models/Review';
import Room from '@/models/Room';
import Booking from '@/models/Booking';
import profileDefault from '@/assets/images/profile.png';
import BookingHistory from '@/components/BookingHistory';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { signOut } from 'next-auth/react';
//import dynamic from 'next/dynamic';
 import DeleteAccountClientWrapper from '@/components/DeleteAcccountClientWrapper';
// import ChangePasswordClientWrapper from '@/components/ChangePasswordClientWrapper';

const ProfilePage = async () => {
  await connectedDB();

  let user = null;

  const session = await getServerSession(authOptions);

  if (session?.user?.email) {
    user = await User.findOne({ email: session.user.email }).lean();
  }

  if (!user) {
    const token = cookies().get('token')?.value;
    if (!token) return redirect('/login');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id).lean();
    } catch (err) {
      console.error('❌ Invalid or expired manual JWT token:', err);
      return redirect('/login');
    }
  }

  if (!user) {
    console.error('❌ No user found after auth.');
    return (
      <section className="text-center py-10 text-red-500 text-lg">
        Failed to load profile. Please try again later.
      </section>
    );
  }

  const reviewCount = await Review.countDocuments({ reviewer: user._id });
  const bookings = await Booking.find({ user: user._id }).populate('room').lean();
  const bookingsJSON = JSON.parse(JSON.stringify(bookings));

  const hasPassword = !!user.password;

  return (
    <section className="bg-blue-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 shadow rounded-lg">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2">
            <FaUser className="text-3xl" /> <span>My Profile</span>
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500">
              <Image
                src={user.image ? `${user.image}?t=${Date.now()}` : profileDefault}
                alt="User"
                unoptimized
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-800">
                Name: {user.name || `${user.firstname || ''} ${user.lastname || ''}`}
              </p>
              <p className="text-lg text-gray-600">Email: {user.email}</p>
              <p className="text-lg text-gray-600">Phone: {user.phone || 'Not Provided'}</p>
              <Link
                href="/profile/edit"
                className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit Profile
              </Link>
            </div>
          </div>
        </div>

        <BookingHistory bookings={bookingsJSON} />

        <div className="bg-white p-8 mt-10 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <FaComments className="text-2xl" /> <span>My Reviews</span>
          </h2>
          <p className="text-gray-600">
            You’ve written {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </p>
        </div>

        <div className="bg-white p-8 mt-10 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <FaGear className="text-2xl" /> <span>Account Settings</span>
          </h2>
          <div className="space-y-4">
              {hasPassword ? (
                <Link
                  href="/account/password"
                  className="text-blue-600 underline text-sm block"
                >
                  Change Password
                </Link>
              ) : (
                <p className="text-sm text-gray-500">
                  You signed up with Google. Password change is not available.
                </p>
              )}

            {/* <button className="text-red-500 underline text-sm">Delete My Account</button> */}
            <DeleteAccountClientWrapper />

          </div>
        </div>

        <div className="bg-white p-8 mt-10 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
            <FaQuestionCircle className="text-2xl" /> <span>Need Help?</span>
          </h2>
          <p className="text-gray-600 mb-2">
            Reach us via email at{' '}
            <a href="mailto:support@hotelnova.com" className="text-blue-600 underline">
              support@hotelnova.com
            </a>
          </p>
          <Link href="/faq" className="text-blue-600 underline text-sm">
            Visit our FAQ
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
