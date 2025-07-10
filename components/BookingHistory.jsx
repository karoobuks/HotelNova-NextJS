'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Font Awesome icons

export default function BookingHistory({ bookings }) {
  const [showAll, setShowAll] = useState(false);

  // ✅ Sort bookings by most recent check-in date first
  const sortedBookings = [...bookings].sort((a, b) => new Date(b.checkInDate) - new Date(a.checkInDate));
  const visibleBookings = showAll ? sortedBookings : sortedBookings.slice(0, 2);

  return (
    <div className="bg-white p-8 mt-10 shadow rounded-lg">
      <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
        Booking History
      </h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">You have no bookings yet.</p>
      ) : (
        <div className="space-y-6">
          {visibleBookings.map((booking) => (
            <div key={booking._id} className="border rounded p-4 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {booking.room?.name || 'Room Name Unavailable'}
                </h3>
                <span className="text-sm text-blue-600 font-semibold">
                  {booking.status || 'Pending'}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                Check-in: {booking.checkInDate ? new Date(booking.checkInDate).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-sm text-gray-600">
                Check-out: {booking.checkOutDate ? new Date(booking.checkOutDate).toLocaleDateString() : 'N/A'}
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

          {bookings.length > 2 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="text-blue-600 text-sm font-medium flex items-center gap-1 hover:underline"
              >
                {showAll ? 'Show Less' : 'View More'}{' '}
                {showAll ? <FaChevronUp className="mt-0.5" /> : <FaChevronDown className="mt-0.5" />}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
