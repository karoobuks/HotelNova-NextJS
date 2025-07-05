import mongoose, { Schema, model, models, Document } from 'mongoose';

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // assumes you have a User model
    required: true,
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room', // assumes you have a Room model
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalGuests: {
    type: Number,
    required: true,
    min: 1,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['Available','booked', 'checked-in', 'checked-out', 'Cancelled', 'Completed'],
    default: 'booked',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema);
