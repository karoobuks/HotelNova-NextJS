// 'use client';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { formatDateWithOrdinal } from '@/utils/dateFormatter';

// const BookRoomButton = ({ room, isRoomCurrentlyBooked, nextBooking  }) => {
//   const router = useRouter();
 
//   const handleBookingClick = () => {
//     if (isRoomCurrentlyBooked) {
//       toast.error('This room is already booked!');
//       return;
//     } 
//       router.push(`/rooms/${room._id}/booking`);
//   };

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-4">Booking Information</h3>

//           {/* 🔔 Show upcoming booking info */}
//       { !isRoomCurrentlyBooked && nextBooking && (
//         <p className="text-sm text-orange-600 mb-3">
//           Note:<i> This room is already booked from{' '}
//           <strong>{formatDateWithOrdinal(nextBooking.checkInDate)}</strong>{' '}
//           to{' '}
//           <strong>{formatDateWithOrdinal(nextBooking.checkOutDate)}</strong>. You can only book <strong>before</strong> that period.</i>
//         </p>
//       )}

//       <button
//         onClick={handleBookingClick}
//         title={isRoomCurrentlyBooked ? 'This room is already booked!' : 'Click to book this room'}
//         className={`px-4 py-2 rounded-xl text-white transition ${
//           isRoomCurrentlyBooked
//             ? 'bg-gray-400 cursor-not-allowed'
//             : 'bg-green-500 hover:bg-green-600'
//         }`}
//         disabled={isRoomCurrentlyBooked || !room.availability}
//       >
//         {isRoomCurrentlyBooked  ? 'Unavailable' : 'Book This Room'}
//       </button>
//     </div>
//   );
// };

// export default BookRoomButton;


// 'use client';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { formatDateWithOrdinal } from '@/utils/dateFormatter';

// const BookRoomButton = ({ room, nextBooking }) => {
//   const router = useRouter();

//   const today = new Date();

//   let isCurrentlyBooked = false;
//   let isBookedInFuture = false;

//   if (nextBooking) {
//     const checkIn = new Date(nextBooking.checkInDate);
//     const checkOut = new Date(nextBooking.checkOutDate);

//     if (today >= checkIn && today < checkOut) {
//       isCurrentlyBooked = true;
//     } else if (today < checkIn) {
//       isBookedInFuture = true;
//     }
//   }

//   const isUnavailable = isCurrentlyBooked || !room.availability;
//   const canBook = !isCurrentlyBooked && room.availability;

//   const handleBookingClick = () => {
//     if (!canBook) {
//       toast.error('This room cannot be booked at the moment.');
//       return;
//     }
//     router.push(`/rooms/${room._id}/booking`);
//   };

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-4">Booking Information</h3>

//       {/* ✅ Show note only if room is bookable now but has a future reservation */}
//       {canBook && isBookedInFuture && (
//         <p className="text-sm text-orange-600 mb-3">
//           Note: <i>This room is already booked from{' '}
//             <strong>{formatDateWithOrdinal(nextBooking.checkInDate)}</strong> to{' '}
//             <strong>{formatDateWithOrdinal(nextBooking.checkOutDate)}</strong>. You can only book <strong>before</strong> that period.</i>
//         </p>
//       )}

//       <button
//         onClick={handleBookingClick}
//         title={
//           !room.availability
//             ? 'This room is unavailable'
//             : isCurrentlyBooked
//             ? 'This room is currently booked and in use'
//             : 'Click to book this room'
//         }
//         className={`px-4 py-2 rounded-xl text-white transition ${
//           canBook ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
//         }`}
//         disabled={!canBook}
//       >
//         {canBook ? 'Book This Room' : 'Unavailable'}
//       </button>
//     </div>
//   );
// };

// export default BookRoomButton;

// 'use client';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import { formatDateWithOrdinal } from '@/utils/dateFormatter';

// const BookRoomButton = ({ room, currentBooking, nextBooking }) => {
//   const router = useRouter();

//   const isCurrentlyBooked = !!currentBooking; // now accurate
//   const isBookedInFuture = !!nextBooking && !isCurrentlyBooked;

//   const canBook = room.availability && !isCurrentlyBooked;

//   const handleBookingClick = () => {
//     if (!canBook) {
//       toast.error('This room cannot be booked at the moment.');
//       return;
//     }
//     router.push(`/rooms/${room._id}/booking`);
//   };

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-4">Booking Information</h3>

//       {/* ✅ Show note only if there's a future booking and room is available now */}
//       {canBook && isBookedInFuture && (
//         <p className="text-sm text-orange-600 mb-3">
//           Note: <i>This room is already booked from{' '}
//             <strong>{formatDateWithOrdinal(nextBooking.checkInDate)}</strong> to{' '}
//             <strong>{formatDateWithOrdinal(nextBooking.checkOutDate)}</strong>. You can only book <strong>before</strong> that period.</i>
//         </p>
//       )}

//       <button
//         onClick={handleBookingClick}
//         title={
//           !room.availability
//             ? 'This room is unavailable'
//             : isCurrentlyBooked
//             ? 'This room is currently booked and in use'
//             : 'Click to book this room'
//         }
//         className={`px-4 py-2 rounded-xl text-white transition ${
//           canBook ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
//         }`}
//         disabled={!canBook}
//       >
//         {canBook ? 'Book This Room' : 'Unavailable'}
//       </button>
//     </div>
//   );
// };

// export default BookRoomButton;


// 'use client';
// import { useRouter } from 'next/navigation';
// import toast from 'react-hot-toast';
// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import { useState } from 'react';
// import { formatDateWithOrdinal } from '@/utils/dateFormatter';

// const BookRoomButton = ({ room, currentBooking, nextBooking, disabledDates }) => {
//   const router = useRouter();

//   const [startDate, setStartDate] = useState(null);

//   const isCurrentlyBooked = !!currentBooking;

//   const now = new Date();
//   let isBookedInFuture = false;

//   if (nextBooking) {
//     const checkIn = new Date(nextBooking.checkInDate);
//     isBookedInFuture = checkIn > now;
//   }

//   const canBook = room.availability && !isCurrentlyBooked;

//   const handleDateChange = (date) => {
//     setStartDate(date);
//   };

//   const handleBookingClick = () => {
//     if (!canBook || !startDate) {
//       toast.error('Please select a valid date to book.');
//       return;
//     }
//     // You can also pass the selected date via query params if needed:
//     router.push(`/rooms/${room._id}/booking?date=${startDate.toISOString()}`);
//   };

//   return (
//     <div className="mt-8">
//       <h3 className="text-xl font-semibold mb-4">Booking Information</h3>

//       {/* ✅ Date Picker with disabled dates */}
//       <DatePicker
//         selected={startDate}
//         onChange={handleDateChange}
//         excludeDates={disabledDates}
//         placeholderText="Select check-in date"
//         minDate={new Date()}
//         inline
//       />

//       {/* 🟠 Show future booking notice */}
//       {canBook && isBookedInFuture && (
//         <p className="text-sm text-orange-600 mb-3">
//           Note: <i>This room is already booked from{' '}
//             <strong>{formatDateWithOrdinal(nextBooking.checkInDate)}</strong> to{' '}
//             <strong>{formatDateWithOrdinal(nextBooking.checkOutDate)}</strong>. You can only book <strong>before/after</strong> that period.</i>
//         </p>
//       )}

//       {/* ✅ Book button */}
//       <button
//         onClick={handleBookingClick}
//         title={
//           !canBook
//             ? 'This room is unavailable'
//             : isCurrentlyBooked
//             ? 'This room is currently booked'
//             : 'Click to book this room'
//         }
//         className={`mt-4 px-4 py-2 rounded-xl text-white transition ${
//           canBook ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
//         }`}
//         disabled={!canBook}
//       >
//         {canBook ? 'Book This Room' : 'Unavailable'}
//       </button>
//     </div>
//   );
// };

// export default BookRoomButton;


'use client';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { formatDateWithOrdinal } from '@/utils/dateFormatter';

const BookRoomButton = ({ room, currentBooking, nextBooking }) => {
  const router = useRouter();
  const isCurrentlyBooked = !!currentBooking;

  const now = new Date();
  let isBookedInFuture = false;

  if (nextBooking) {
    const checkIn = new Date(nextBooking.checkInDate);
    isBookedInFuture = checkIn > now;
  }

  const canBook = room.availability && !isCurrentlyBooked;


  const handleBookingClick = () => {
    if (!canBook) {
      toast.error('This room is currently unavailable.');
      return;
    }
    
    router.push(`/rooms/${room._id}/booking`);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Booking Information</h3>

      {/* ✅ Show note if there's a future booking */}
      {canBook && isBookedInFuture && (
        <p className="text-sm text-orange-600 mb-3">
          Note: <i>This room is already booked from{' '}
            <strong>{formatDateWithOrdinal(nextBooking.checkInDate)}</strong> to{' '}
            <strong>{formatDateWithOrdinal(nextBooking.checkOutDate)}</strong>. You can only book <strong>before/after</strong> that period.</i>
        </p>
      )}

      <button
        onClick={handleBookingClick}
        title={
          isCurrentlyBooked
            ? 'This room is currently booked and in use'
            : 'Click to book this room'
        }
        className={`px-4 py-2 rounded-xl text-white transition ${
          canBook ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
        }`}
        //disabled={!canBook}
      >
        {canBook ? 'Book This Room' : 'Unavailable'}
      </button>
    </div>
  );
};

export default BookRoomButton;



