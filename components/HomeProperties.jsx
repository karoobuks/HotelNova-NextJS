import Room from '@/models/Room';
import connectedDB from '@/config/database';
import RoomCard from './RoomCard';
import Link from 'next/link';

const HomeProperties = async () => {
  await connectedDB()

  const recentRooms = await Room.find({})
        .sort({createdAt: -1})
        .limit(3)
        .lean()


  return (
    <>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h2 className='text-3xl font-bold text-blue-500 m-6 text-center'>
            Available Rooms
          </h2>

          {recentRooms.length === 0 ? (
            <p>No rooms found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {recentRooms.map((room, index) => (
                <RoomCard
                  key={room._id || room.id || index}
                  room={room}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className='m-auto max-w-lg my-6 px-6'>
        <Link
          href='/rooms'
          className='block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700'
        >
          View All Rooms
        </Link>
        
      </section>
    </>
  );
};

export default HomeProperties;
