
import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import Room from '@/models/Room';
import Review from '@/models/Review';
import Notification from '@/models/Notification';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export async function POST(req, { params }) {
  await connectedDB();

  const { id: roomId } =  params;
  const { comment, rating } = await req.json();

  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const room = await Room.findById(roomId);
    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    // ✅ 1. Create the review
    const newReview = await Review.create({
      reviewer: sessionUser.user.id,
      room: roomId,
      comment,
      rating,
      date: new Date(),
    });

    await Notification.create({
      user: sessionUser.user.id,
      message:  `Thank you, ${sessionUser.user.firstname || 'Guest'}, 
      for your review of "${room.name}".
      We truly appreciate your thoughtful feedback.
      Your insights help us maintain the high standards we strive for at HotelNova.`,
      read: false,
      createdAt: new Date(),
      });

      const cleanReview = newReview.toObject();


        if (!Array.isArray(room.reviews)) {
      room.reviews = [];
    }
    // ✅ 2. Push the review's ID to the room
    room.reviews.push(newReview._id);

    // ✅ 3. Recalculate average rating
    const allReviews = await Review.find({ room: roomId });
    const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = totalRating / allReviews.length;
    room.averageRating = parseFloat(averageRating.toFixed(1));

    console.log('🧾 Review object:', newReview);


    // ✅ 4. Save room
    await room.save();

    return NextResponse.json({ success: true, review: cleanReview }, { status: 201 });
  } catch (err) {
    console.error('Review save failed:', err);
    return NextResponse.json({ error: 'Failed to save review' }, { status: 500 });
  }
}

