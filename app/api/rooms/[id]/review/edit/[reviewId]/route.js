
import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import Review from '@/models/Review';
import Room from '@/models/Room';
import { getSessionUser } from '@/utils/getSessionUser';


export async function GET(req, { params }) {
  await connectedDB();

  const { reviewId } = params;

  try {
    const review = await Review.findById(reviewId).populate('reviewer');

    if (!review) {
      return NextResponse.json({ error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json(review);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function PUT(req, { params }) {
  await connectedDB();

  const { id: roomId, reviewId } = params;
  const { comment, rating } = await req.json();
  const user = await getSessionUser();

  if (!user?._id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const review = await Review.findById(reviewId);
  if (!review || review.reviewer.toString() !== user._id.toString()) {
    return NextResponse.json({ error: 'Review not found or access denied' }, { status: 403 });
  }

  review.comment = comment;
  review.rating = rating;
  review.date = new Date();
  await review.save();

  // Recalculate average rating
  const allReviews = await Review.find({ room: roomId });
  const totalRating = allReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalRating / allReviews.length;
  await Room.findByIdAndUpdate(roomId, { averageRating: parseFloat(averageRating.toFixed(1)) });

  return NextResponse.json({ success: true, review });
}
