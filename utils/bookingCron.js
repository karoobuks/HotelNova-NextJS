import cron from 'node-cron';
import connectedDB from '@/config/database';
import Booking from '@/models/Booking';
import Room from '@/models/Room';

let isRunning = false;

export function startBookingCleanupJob() {
  if (isRunning) return;

  cron.schedule('*/1 * * * *', async () => {
    console.log('🔁 Running cron: Checking for expired bookings...');
    await connectedDB();

    const now = new Date();

    const expiredBookings = await Booking.find({
      checkOutDate: { $lt: now },
      status: { $ne: 'Completed' },
    });

    for (const booking of expiredBookings) {
      booking.status = 'Completed';
      await booking.save();

      const room = await Room.findById(booking.room);
      if (room) {
        room.availability = true;
        room.bookingStatus = 'Available';
        await room.save();
      }
    }

    console.log(`✅ ${expiredBookings.length} booking(s) marked as completed.`);
  });

  isRunning = true;
  console.log('🚀 Booking cleanup cron job started');
}
