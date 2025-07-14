// // /app/api/admin/users/route.js

// import { NextResponse } from 'next/server';
// import connectedDB from '@/config/database';
// import User from '@/models/User';
// import { getSessionUser } from '@/utils/getSessionUser';

// export async function GET() {
//   await connectedDB();
//   const currentUser = await getSessionUser();

//   if (!currentUser || currentUser.role !== 'admin') {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//   }

//   const users = await User.find({}, '-password'); // exclude password
//   return NextResponse.json(users, { status: 200 });
// }


import { NextResponse } from 'next/server';
import connectedDB from '@/config/database';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

export async function GET(req) {
  await connectedDB();

  const currentUser = await getSessionUser();
  if (!currentUser || currentUser.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 5;
  const role = searchParams.get('role') || 'all';
  const status = searchParams.get('status') || 'all';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || 'createdAt';
  const order = searchParams.get('order') === 'asc' ? 1 : -1;

  const filter = {};

  if (role !== 'all') filter.role = role;
  if (status !== 'all') filter.status = status;
  if (search) {
    filter.$or = [
      { firstname: { $regex: search, $options: 'i' } },
      { lastname: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } }
    ];
  }

  const total = await User.countDocuments(filter);

  const users = await User.find(filter, '-password')
    .sort({ [sort]: order })
    .skip((page - 1) * limit)
    .limit(limit);

  return NextResponse.json({ users, total });
}
