import mongoose, { Schema, model, models, Document } from 'mongoose';



const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ['Executive', 'Deluxe', 'Family', 'Suite', 'Other'], required: true },
  description: { type: String, required: true },
  amenities: { type: [String], default: [] },
  images: { type: [String], default: [] },
  headerImage: { type:String, required:true},
  price: { type: String, required: true },
  availability: { type: Boolean, required: true },
  bookingStatus: { type: String, enum: ['Open', 'Booked'], required: true },
  averageRating: { type: Number, min: 0, max: 5,  default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref:'Review' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// const Room = models.Room || model('Room', roomSchema);
const Room = globalThis.Room || model('Room', roomSchema);
globalThis.Room = Room;


export default Room
