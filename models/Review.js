import mongoose, { Schema, model, models, Document } from 'mongoose';


const reviewSchema = new mongoose.Schema({
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
  },
  comment: String,
  rating: Number,
  date: { type: Date, default: Date.now },
});


const Review = models.Review || model('Review', reviewSchema)

export default Review;