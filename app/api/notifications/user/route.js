import connectedDB from '@/config/database';
import Notification from '@/models/Notification';
import { getSessionUser } from '@/utils/getSessionUser';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectedDB();
  const user = await getSessionUser();
  // const user = session?.user;

  //console.log('🔍 User ID in notifications route:', user._id);


  if (!user?._id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const notifications = await Notification.find({ user: user._id }).sort({ createdAt: -1 }).lean();
  return NextResponse.json({ notifications });
}


// // app/api/notifications/user/route.js
// import { cookies } from 'next/headers';
// import { getSessionUser } from '@/utils/getSessionUser';
// import connectedDB from '@/config/database';
// import Notification from '@/models/Notification';

// export async function GET() {
//   await connectedDB();

//   const user = await getSessionUser(cookies()); // ✅ pass cookies

//   if (!user?._id) {
//     return Response.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const notifications = await Notification.find({ user: user._id }).sort({ createdAt: -1 });

//   return Response.json(notifications);
// }
