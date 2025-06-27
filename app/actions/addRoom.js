// 'use server'
// import Room from '@/models/Room'
// import connectedDB from '@/config/database'
// import { getSessionUser } from '@/utils/getSessionUser'
// import { revalidatePath } from 'next/cache'
// import { redirect } from 'next/navigation'
// import cloudinary from '@/config/cloudinary'

// async function addRoom(formData) {
//   await connectedDB()

//   const sessionUser = await getSessionUser()
//   if (!sessionUser || !sessionUser.userId) {
//     throw new Error('User ID is required')
//   }
//   const { userId } = sessionUser

//   const amenities = formData.getAll('amenities')
//   const images = formData.getAll('images').filter((image) => image.name !== '')

//   const roomData = {
//     name: formData.get('name'),
//     type: formData.get('type'),
//     description: formData.get('description'),
//     amenities,
//     price: formData.get('price'),
//     availability: true,
//     bookingStatus: formData.get('bookingStatus'),
//     averageRating: 0,
//     reviews: [],
//     createdBy: userId // optional: associate room with user
//   }

//   const imageUrls = []

//   // ✅ Upload images one-by-one (in order)
//   for (const imageFile of images) {
//     const imageBuffer = await imageFile.arrayBuffer()
//     const imageData = Buffer.from(new Uint8Array(imageBuffer))
//     const imageBase64 = imageData.toString('base64')

//     const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, {
//       folder: 'HotelNova',
//       transformation: [
//         {
//           width: 1280,
//           height: 720,
//           crop: 'limit',
//           quality: 'auto',
//           fetch_format: 'auto',
//         }
//       ],
//     })

//     imageUrls.push(result.secure_url)
//   }

//   // ✅ Assign uploaded images
//   roomData.images = imageUrls
//   roomData.headerImage = imageUrls[0] || '/default-room.jpg' // fallback for safety

//   // ✅ Save to DB
//   const newRoom = new Room(roomData)
//   await newRoom.save()

//   // ✅ Refresh and redirect
//   revalidatePath('/', 'layout')
//   redirect(`/rooms/${newRoom._id}`)
// }

// export default addRoom




'use server';

import Room from '@/models/Room';
import connectedDB from '@/config/database';
import { getSessionUser } from '@/utils/getSessionUser';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

async function addRoom(data) {
  await connectedDB();

  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error('User ID is required');
  }

  const { userId } = sessionUser;

  const roomData = {
    name: data.name,
    type: data.type,
    description: data.description,
    amenities: Array.isArray(data.amenities) ? data.amenities : [data.amenities],
    price: data.price,
    availability: true,
    bookingStatus: data.bookingStatus,
    averageRating: 0,
    reviews: [],
    createdBy: userId,
    images: data.images || [],
    headerImage: data.images?.[0] || '/default-room.jpg',
  };

  const newRoom = new Room(roomData);
  await newRoom.save();

  revalidatePath('/', 'layout');
  redirect(`/rooms/${newRoom._id}`);
}

export default addRoom;
