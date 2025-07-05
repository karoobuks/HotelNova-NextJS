import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
   type: {
    type: String,
    enum: ['booking', 'message', 'info'],
    default: 'info',
  },
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
