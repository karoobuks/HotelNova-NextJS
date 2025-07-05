import { startBookingCleanupJob } from '@/utils/bookingCron';
import { NextResponse } from 'next/server';

let hasStarted = false;

export function GET() {
  if (!hasStarted) {
    startBookingCleanupJob();
    hasStarted = true;
    console.log('🔥 Cron job manually started via API route');
  }

  return NextResponse.json({ message: 'Cron job is running ✅' });
}

//http://localhost:3000/api/cron/start
