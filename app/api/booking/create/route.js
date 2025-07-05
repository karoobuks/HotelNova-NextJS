
import connectedDB from '@/config/database';
import Booking from '@/models/Booking';
import Room from '@/models/Room';
import Notification from '@/models/Notification';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectedDB();

  const session = await getSessionUser();
  const user = session?.user;

  if (!user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await req.json();
  const { roomId, checkInDate, checkOutDate, totalGuests } = body;

  const room = await Room.findById(roomId);
  if (!room) {
    return NextResponse.json({ error: 'Room not found' }, { status: 404 });
  }

  const checkIn = new Date(checkInDate);
  const checkOut = new Date(checkOutDate);

  if (isNaN(checkIn) || isNaN(checkOut) || checkOut <= checkIn) {
    return NextResponse.json({ error: 'Invalid check-in or check-out date' }, { status: 400 });
  }

  // ✅ Check for overlapping bookings (future or current)
  const overlapping = await Booking.findOne({
    room: roomId,
    $or: [
      {
        checkInDate: { $lt: checkOut },
        checkOutDate: { $gt: checkIn },
      }
    ]
  });

  if (overlapping) {
    return NextResponse.json({ error: 'Room is already booked for these dates' }, { status: 409 });
  }

  // ✅ Calculate total price
  const durationMs = checkOut - checkIn;
  const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
  const totalPrice = room.price * durationDays;

  if (isNaN(totalPrice)) {
    return NextResponse.json({ error: 'Failed to calculate price' }, { status: 500 });
  }

  // ✅ Create the booking
  const booking = await Booking.create({
    user: user.id,
    room: roomId,
    checkInDate,
    checkOutDate,
    totalGuests,
    totalPrice,
  });

  await Notification.create({
  user: user.id,
  message: `Your booking for "${room.name}" has been confirmed!`,
  read: false,
  createdAt: new Date(),
  });

  // ✅ Set room status to 'Booked' only if booking is happening now
  const now = new Date();
  if (checkIn <= now && checkOut > now) {
    room.availability = false;
    room.bookingStatus = 'Booked';
  }

  await room.save();

  return NextResponse.json({ booking }, { status: 201 });
}
