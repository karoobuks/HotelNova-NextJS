
import connectedDB from '@/config/database';
import User from '@/models/User';
import Review from '@/models/Review';
import { getSessionUser } from '@/utils/getSessionUser';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const dynamic = 'force-dynamic';

export async function POST(req) {
   console.log("🔥 HIT /api/profile/edit"); 
  try{
  await connectedDB();

  const sessionUser = await getSessionUser();
 
  const user = sessionUser.user;

  
    if (!user?.id ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

  const data = await req.formData();
  const name = data.get('name');
  const phone = data.get('phone');
  const image = data.get('image');

  let imageUrl = null;

  if (image && typeof image === 'object') {
  const buffer = Buffer.from(await image.arrayBuffer());

  const base64Image = `data:${image.type};base64,${buffer.toString('base64')}`;
        console.log('✅ User from DataBase:', user);

  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'HotelNova/profiles',
      resource_type: 'image',
      timeout:60000,
    });
    console.log('ImageUploaded:',result)
    imageUrl = result.secure_url;
  } catch (uploadErr) {
    console.error('❌ Cloudinary upload failed:', uploadErr);
    return NextResponse.json({ error: 'Image upload failed' }, { status: 500 });
  }
}


  const updated = await User.findByIdAndUpdate(
    user.id,
    { name, phone, image: imageUrl },
    { new: true }
  );

    // 🧮 Get the number of reviews by this user
    const reviewCount = await Review.countDocuments({ reviewer: user.id });

    const updatedUser = updated.toObject(); // convert to plain JS object
    updatedUser.reviewCount = reviewCount;  // merge reviewCount into user

  console.log("Updated User:", updated)
  return NextResponse.json({
    message: 'Profile updated',
    user: updatedUser,
    status: 200,
  });

}catch (err) {
    console.error('❌ Update failed:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

