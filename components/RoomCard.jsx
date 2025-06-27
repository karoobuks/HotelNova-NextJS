import Link from "next/link";
import Image from "next/image";


const RoomCard = ({ room }) => {
  if (!room || !room.images || room.images.length === 0) {
    return null;
  }

  return (
    <div className="shadow-md rounded-xl relative">
      <div className="relative w-full h-64">
        <Image
          src={room.images[0]}
          alt="Hotel room"
          fill
          className="w-full h-auto rounded-t-xl"
        />
      </div>
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{room.name}</div>
          <h2 className="text-xl font-bold">{room.description}</h2>
          <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
            <p className="md:hidden lg:inline">${room.price}</p>
          </div>
           <Link
                  href={`/rooms/${room._id}`}
                  className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                >
                  Details
                </Link>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
