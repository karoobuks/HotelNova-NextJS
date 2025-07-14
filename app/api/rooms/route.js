import { NextResponse } from 'next/server';
import { getSessionUser } from '@/utils/getSessionUser';
import connectedDB from '@/config/database';
import Room from '@/models/Room';
import cloudinary from '@/config/cloudinary';

export async function POST(req) {
  try {
    await connectedDB();

    const user = await getSessionUser();
    if (!user || !user._id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if(!['admin', 'manager'].includes(user.role)){
     return NextResponse.json({error:'Forbidden: Only admins or managers can create rooms'}, {status:403})
    }

    const body = await req.json();
    const { name, type, description, amenities, price, bookingStatus, images } = body;

    const imageUrls = [];

    for (const image of images) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'HotelNova',
        transformation: [
          {
            width: 1280,
            height: 720,
            crop: 'limit',
            quality: 'auto',
            fetch_format: 'auto',
          },
        ],
      });
      imageUrls.push(result.secure_url);
    }

    const newRoom = new Room({
      name,
      type,
      description,
      amenities,
      price,
      availability: true,
      bookingStatus,
      averageRating: 0,
      reviews: [],
      createdBy: user._id,
      images: imageUrls,
      headerImage: imageUrls[0] || '/default-room.jpg',
    });

    await newRoom.save();

   

    return NextResponse.json({ success: true, roomId: newRoom._id }, { status: 201 });

  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

