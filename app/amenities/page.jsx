import Room from "@/models/Room";
import connectedDB from "@/config/database";

const AmenitiesPage = async({ params }) => {
    await connectedDB()
    const rooms = await Room.find().lean()
    

     const allAmenities = [
    ...new Set(rooms.flatMap((room) => room.amenities || [])),
  ];

      if (!allAmenities || allAmenities.length === 0) {
    return (
      <div className="mt-8 text-gray-500 italic">No amenities listed for this room.</div>
    );
  }

    return (  <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {
                  allAmenities.map((amenity, index) =>(
                    <span key={index} className="text-sm font-semibold px-3 py-1.5 rounded-full bg-blue-100 text-blue-600">
                        {amenity}
                    </span>
                  ))
                }

              </div>
            </div> );
}
 
export default AmenitiesPage;

