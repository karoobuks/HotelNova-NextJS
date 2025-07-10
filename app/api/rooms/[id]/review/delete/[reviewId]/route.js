// File: app/api/rooms/[id]/review/delete/[reviewId]/route.js

import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import Review from '@/models/Review';
import Room from '@/models/Room';
import { getSessionUser } from '@/utils/getSessionUser';

export async function DELETE(req, { params }) {
  await connectedDB();

  const { id: roomId, reviewId } =  params;
  const user = await getSessionUser();

  if (!user?._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const review = await Review.findById(reviewId);
  if (!review || review.reviewer.toString() !== user._id.toString()) {
    return NextResponse.json({ error: 'Review not found or access denied' }, { status: 403 });
  }

  await Review.findByIdAndDelete(reviewId);
  await Room.findByIdAndUpdate(roomId, { $pull: { reviews: reviewId } });

  // Recalculate average rating
  const remaining = await Review.find({ room: roomId });
  const newAvg = remaining.length > 0
    ? remaining.reduce((sum, r) => sum + r.rating, 0) / remaining.length
    : 0;

  await Room.findByIdAndUpdate(roomId, { averageRating: parseFloat(newAvg.toFixed(1)) });

  return NextResponse.json({ success: true });
}
