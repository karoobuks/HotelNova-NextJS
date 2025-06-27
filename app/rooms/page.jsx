
import RoomCard from '@/components/RoomCard';
import Room from '@/models/Room';
import connectedDB from '@/config/database';
import Link from "next/link";



const RoomsPage = async () => {
      await connectedDB()
      const rooms = await Room.find({}).lean()
    
    return (<section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
           {rooms.length === 0 ? (<p>No rooms found</p>) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                {
                    rooms.map((room) => (<RoomCard key={room._id } room={room} />))
                }
            </div>
           )}
        </div>

    </section>);
}
 
export default RoomsPage;