import connectedDB from '@/config/database';
import Booking from '@/models/Booking';
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

  // Calculate dummy price or fetch from room model
  const totalPrice = 100 * totalGuests; // example

  const booking = await Booking.create({
    user: user.id,
    room: roomId,
    checkInDate,
    checkOutDate,
    totalGuests,
    totalPrice,
  });

  console.log("BOOKING:", booking)

  return NextResponse.json({ booking }, { status: 201 });
}
