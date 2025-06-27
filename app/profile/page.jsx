export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';
import { FaGear } from 'react-icons/fa6'; // Font Awesome 6 specific
import { FaQuestionCircle, FaComments, FaHistory, FaUser } from 'react-icons/fa'; // Classic FA icons




import Image from 'next/image';
import Link from 'next/link';
import connectedDB from '@/config/database';
import User from '@/models/User';
import Review from '@/models/Review';
import Booking from '@/models/Booking';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';
import profileDefault from '@/assets/images/profile.png';


const ProfilePage = async () => {
  await connectedDB();


  
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    // no session → redirect to /login
    redirect('/login');
  }

   const user = await User.findById(session.user.id).lean();
  

  if (!user) {
  console.error('❌ No user found in session.');
  return (
    <section className="text-center py-10 text-red-500 text-lg">
      Failed to load profile. Please try again later.
    </section>
  );
}

const reviewCount = await Review.countDocuments({ reviewer: user._id });
user.reviewCount = reviewCount;

const bookings = await Booking.find({ user: user._id }).populate('room');

console.log('✅ Session:', session);
console.log('✅ User from DB:', user);



  return (
    <section className="bg-blue-50 min-h-screen">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">

        {/* Profile Header */}
        <div className="bg-white p-8 shadow rounded-lg">
          <h1 className="text-3xl font-bold text-blue-700 mb-6 flex items-center gap-2"><FaUser className="text-3xl" /> <span>Your Profile</span></h1>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative w-36 h-36 rounded-full overflow-hidden border-4 border-blue-500">
              <Image
                src={user.image 
                  ? `${user.image}?t=${Date.now()}` 
                  : profileDefault}
                unoptimized
                alt="User"
                fill
                className="object-cover"
              />
            </div>

            <div>
              <p className="text-xl font-semibold text-gray-800">Name: {user.name}</p>
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

        {/* Booking History */}
        <div className="bg-white p-8 mt-10 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><FaHistory className="text-2xl" /> <span>Booking History</span></h2>
          {bookings.length === 0 ? (
            <p className="text-gray-600">You have no bookings yet.</p>
          ) : (
            <div className="space-y-6">
              {bookings
                .filter(booking => booking && booking.room) // Defensive check
                .map(booking => (
                  <div key={booking._id} className="border rounded p-4 shadow-sm">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {booking.room.name || 'Room Name Unavailable'}
                      </h3>
                      <span className="text-sm text-blue-600 font-semibold">
                        {booking.status || 'Pending'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Check-in: {booking.checkInDate
                        ? new Date(booking.checkInDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                    <p className="text-sm text-gray-600">
                      Check-out: {booking.checkOutDate
                        ? new Date(booking.checkOutDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                    {booking.room?._id && (
                      <Link
                        href={`/rooms/${booking.room._id}`}
                        className="text-blue-600 underline text-sm mt-2 inline-block"
                      >
                        View Room
                      </Link>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white p-8 mt-10 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"><FaComments className="text-2xl" /> <span>Your Reviews</span></h2>
          <p className="text-gray-600"> You’ve written {user.reviewCount || 0}{' '}
  {user.reviewCount <= 1 ? 'review' : 'reviews'} </p>
        </div>

        {/* Account Settings */}
        <div className="bg-white p-8 mt-10 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2 ">  <FaGear className="text-2xl" /> <span>Account Settings</span></h2>
          <div className="space-y-4">
            <Link href="/account/password" className="text-blue-600 underline text-sm block">
              Change Password
            </Link>
            <button className="text-red-500 underline text-sm">Delete Account</button>
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-white p-8 mt-10 shadow rounded-lg">
          <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2"> <FaQuestionCircle className="text-2xl" /> <span>Need Help?</span></h2>
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
