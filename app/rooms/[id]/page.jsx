
import RoomHeaderImage from "@/components/RoomHeaderImage";
import connectedDB from "@/config/database";
import Room from "@/models/Room";
import Booking from "@/models/Booking";
import Review from "@/models/Review";
import Link from "next/link";
import { FaArrowLeft, FaStar } from "react-icons/fa";
import Image from "next/image";
import RoomImages from "@/components/RoomImages";
import BookRoomButton from '@/components/BookRoomButton';
//import { getDisabledDates } from "@/utils/getDisabledDates";




const RoomPage = async ({ params }) => {
  await connectedDB()
  const { id } = await params;
  const room = await Room.findById(id).populate({
    path: 'reviews',
    populate: {
      path: 'reviewer', // reviewer is a reference to User
      // select: 'firstname lastname email image', // select fields you want
    },
  })
  .lean({ virtuals: true });

  const now = new Date();

  // const isRoomCurrentlyBooked = await Booking.exists({
  //   room: room._id,
  //   checkInDate: { $lte: now },
  //   checkOutDate: { $gte: now },
  // });

  // Fetch the active booking
  // const activeBooking = await Booking.findOne({
  //   room: room._id,
  //   checkInDate: { $lte: now },
  //   checkOutDate: { $gte: now },
  // }).lean();




  // const allBookings = await Booking.find({ room: room._id }).lean();
  // const disabledDates = getDisabledDates(allBookings); // generate disabled dates

  const plainRoom = JSON.parse(JSON.stringify(room));

    const currentBooking = await Booking.findOne({
  room: room._id,
  checkInDate: { $lte: now },
  checkOutDate: { $gt: now },
  }).lean();

const nextBooking = await Booking.findOne({
  room: room._id,
  checkInDate: { $gt: now },
}).sort({ checkInDate: 1 }).lean();

  if (currentBooking) {
  plainRoom.availability = false;
  plainRoom.bookingStatus = "Occupied";
  } else {
  plainRoom.availability = true;
  plainRoom.bookingStatus = nextBooking ? "Open (future booking exists)" : "Open";
  }

  room.reviews.forEach((review) => {
  const user = review.reviewer;
  if (user && !user.name && user.email && !user.firstname && !user.lastname) {
    const [username] = user.email.split('@');
    user.name = username.charAt(0).toUpperCase() + username.slice(1);
  }
});

  
  console.log("👤 Reviewer example:", room.reviews[0]?.reviewer);

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
              <span className={plainRoom.availability? "text-green-700": "text-red-600"}>{plainRoom.bookingStatus}
              </span>
            </div>

            <div>
            <Link href={`/rooms/${room._id}/review`}>
            <button className="mt-1 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
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
              </div>
            {/* <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Booking Information</h3>

              {room.bookingStatus === 'Booked' ? (
                <button
                  disabled
                  className="bg-gray-400 text-white px-4 py-2 rounded-xl cursor-not-allowed"
                  title="Room already booked"
                >
                  Unavailable
                </button>
              ) : (
                <Link href={`/rooms/${room._id}/booking`}>
                  <button className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600">
                    Book This Room
                  </button>
                </Link>
              )}
            </div> */}
              
              <BookRoomButton
                room={plainRoom}
                currentBooking={currentBooking}
                nextBooking={nextBooking}
                
              />




              
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
                          {/* <h4 className="text-lg font-semibold text-gray-800">{review.reviewer?.name || 'Anonymous'}</h4> */}
                          <div className="flex items-center gap-3 mb-2">
                                    {review.reviewer?.image && (
                                      <div className="w-10 h-10 rounded-full overflow-hidden">
                                      <Image
                                        src={review.reviewer.image}
                                        alt={review.reviewer.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full object-cover"
                                      />
                                      </div>
                                    )}
                                    <h4 className="text-lg font-semibold text-gray-800">
                                      {review.reviewer?.name || 'Anonymous'}
                                    </h4>
                                  </div>

                          <span className="text-yellow-500 flex items-center text-sm "><FaStar className="mr-1"/>{review.rating}</span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{review.date ? new Date(review.date).toLocaleString('en-US', {
                                                                        year: 'numeric',
                                                                        month: 'long',
                                                                        day: 'numeric',
                                                                        hour: 'numeric',
                                                                        minute: '2-digit',
                                                                        hour12: true,
                                                                      })
                                                                    : 'N/A'}
                       </p>
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
