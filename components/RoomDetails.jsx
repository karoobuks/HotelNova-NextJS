
import { FaCheck } from 'react-icons/fa';

const RoomDetails = ({ room}) => {
    

    return (  <main>
            <div
              className="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div className="text-gray-500 mb-4">{room.type}</div>
              <h1 className="text-3xl font-bold mb-4">{room.name}</h1>
             

              <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
                Rates & Options
              </h3>
              
              
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Description & Details</h3>
              <p className="text-gray-500 mb-4">
                {room.description}
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 className="text-lg font-bold mb-6">Amenities</h3>

              <ul
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none"
              >
                {room.amenities.map((amenity, index) => (
                    <li key={index}>
                  <FaCheck className="inline-block text-green-600 mr-2" /> {' '}{amenity}
                </li>
                ))}
              </ul>
            </div>
            {/* <!-- Map --> */}
            <div className="bg-white p-6 rounded-lg shadow-md mt-6">
              <div id="map"></div>
            </div>
           
          </main> );
}
 
export default RoomDetails;