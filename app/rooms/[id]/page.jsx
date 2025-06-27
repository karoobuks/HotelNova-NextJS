
import RoomHeaderImage from "@/components/RoomHeaderImage";
import connectedDB from "@/config/database";
import Room from "@/models/Room";
import Link from "next/link";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import Image from "next/image";
import RoomImages from "@/components/RoomImages";


// const RoomPage = async ({ params }) => {
//   const room = properties.find((p) => p.id.toString() === params.id);

//   if (!room) {
//     return (
//       <div className="text-red-500 p-10 text-center">
//         Room not found.
//       </div>
//     );
//   }

//   return (
//     <>
//       <RoomHeaderImage image={room.image[0]} />

//       {/* Back Button */}
//       <section className="bg-white shadow-sm">
//         <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <Link href="/rooms" className="text-blue-600 hover:underline flex items-center">
//             <FaArrowLeft className="mr-2" /> Back to Rooms
//           </Link>
//         </div>
//       </section>

//       {/* Main Room Info */}
//       <section className="bg-gray-50">
//         <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//             {/* Info */}
//             <div>
//               <h1 className="text-4xl font-bold mb-4 text-gray-800">{room.name}</h1>
//               <p className="text-gray-700 text-lg mb-6 leading-relaxed">{room.description}</p>

//               <div className="space-y-3">
//                 <div>
//                   <span className="font-medium text-gray-700">Price:</span>{" "}
//                   <span className="text-green-600 font-semibold">{room.price}</span>
//                 </div>

//                 <div>
//                   <span className="font-medium text-gray-700">Availability:</span>{" "}
//                   <span className={room.availability ? "text-green-700" : "text-red-600"}>
//                     {room.bookingStatus}
//                   </span>
//                 </div>

//                 <div className="flex items-center gap-2">
//                   <span className="font-medium text-gray-700">Rating:</span>
//                   <span className="text-yellow-500 flex items-center">
//                     <FaStar className="mr-1" /> {room.averageRating}
//                   </span>
//                 </div>
//               </div>

//               {/* Amenities */}
//               <div className="mt-8">
//                 <h3 className="text-xl font-semibold mb-4">Amenities</h3>
//                 <div className="flex flex-wrap gap-2">
//                   {room.amenities.map((item, idx) => (
//                     <span
//                       key={idx}
//                       className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full"
//                     >
//                       {item}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Image Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               {room.image.map((img, idx) => (
//                 <div
//                   key={idx}
//                   className="relative w-full h-44 sm:h-52 rounded-lg overflow-hidden shadow-sm"
//                 >
//                   <Image
//                     src={`/images/properties/${img}`}
//                     alt={`Room ${idx + 1}`}
//                     fill
//                     className="object-cover transition duration-300 hover:scale-105"
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Reviews */}
//           {room.reviews && room.reviews.length > 0 && (
//             <div className="mt-14">
//               <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
//               <div className="grid md:grid-cols-2 gap-6">
//                 {room.reviews.map((review, idx) => (
//                   <div
//                     key={idx}
//                     className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-gray-100"
//                   >
//                     <div className="mb-2 flex justify-between items-center">
//                       <h4 className="text-lg font-semibold text-gray-800">{review.reviewer}</h4>
//                       <span className="text-yellow-500 flex items-center text-sm">
//                         <FaStar className="mr-1" /> {review.rating}
//                       </span>
//                     </div>
//                     <p className="text-sm text-gray-500 mb-2">
//                       {new Date(review.date).toLocaleDateString()}
//                     </p>
//                     <p className="text-gray-700">{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// };

// export default RoomPage;

const RoomPage = async ({ params }) => {
  await connectedDB()
  const { id } = await params;
  const room = await Room.findById(id).lean()
  
   const headerImage = room.images?.[0] || "/airpot-room.jpg";

  if (!room) {
  return (
    <div className="text-red-500 p-10 text-center">
      Room not found.
    </div>
  );
}

  
  return ( 
    <>
    <RoomHeaderImage image={room.headerImage} />
      <section className="bg-white shadow-sm">
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6">
         <Link href='/rooms' className="text-blue-600 text-center hover:underline flex items-center">
        <FaArrowLeft className="mr-2"/><span>Go Back to Rooms</span>
        </Link>
       </div>
      </section>
      <section className="bg-gray-50">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">{room.name}</h1>
          <p className="text-gray-700 mb-6 text-lg leading-relaxed">{room.description}</p>
          <div className="space-y-6">
            <div>
              <span className="font-medium text-gray-700">Price:</span>{" "}
              <span className="font-semibold text-green-600">${room.price}</span>
            </div>
            <div>
              <span className="font-medium text-gray-700">Availability</span>{" "}
              <span className={room.availability? "text-green-700": "text-red-600"}>{room.bookingStatus}
              </span>
            </div>

            <div>
            <Link href={`/rooms/${room._id}/review`}>
            <button className="mt-1 bg-green-500 text-white px-4 py-2 rounded">
              Leave a Review
            </button>
          </Link>
          </div>


            <div className="flex items-center gap-2">
              <span className=" font-medium text-gray-700">Rating:</span>
              <span className="text-yellow-500 flex items-center"><FaStar className="mr-1"/>{room.averageRating}</span>
            </div>

            <div className="mt-8">
              <h3 className="text-xl text-semibold mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {
                  room.amenities.map((amenity, index) =>(
                    <span key={index} className="text-sm font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-600">
                        {amenity}
                    </span>
                  ))
                }
              <div>
            <Link href={`/rooms/${room._id}/booking`}>
            <button className=" bg-green-500 text-white text-sm font-semibold px-3 py-1.5 rounded-full hover:bg-green-600">
              Book This Room
            </button>
          </Link>
          </div>
              </div>
            </div>
          </div>

                 {/* reviews */}
                 { room.reviews && room.reviews.length > 0 &&(

                <div className="mt-14">
                  <h2 className="text-2xl font-bold mb-6">Guest Reviews</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                  {
                    room.reviews.map((review, index) =>(
                      <div key={index} className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-gray-100">
                        <div className="mb-2 flex justify-between items-center">
                          <h4 className="text-lg font-semibold text-gray-800">{review.reviewer}</h4>
                          <span className="text-yellow-500 flex items-center text-sm "><FaStar className="mr-1"/>{review.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{new Date(review.date).toLocaleDateString()}</p>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))
                  }
                  </div>

                </div>
                 )  }
        </div>
      </section>
      <RoomImages images={room.images} />
      
    </>
   );
}
 
export default RoomPage;
