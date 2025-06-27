import InfoBox from "./InfoBox";
import Link from "next/link";

const InfoBoxes = () => {
    return ( <section>
        <div className="container-xl lg:container  m-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
                <InfoBox heading='for guests' buttonInfo={{
                text:'Browze rooms',
                link:'/rooms',
                backgroundColor:'bg-black'}}>
                    A panorama of pleasure and comfort. Book with us and get the very best of Amenities  
                </InfoBox>
                <InfoBox heading='For hotel managers' backgroundColor="bg-blue-100" buttonInfo={{
                    text:'Add Rooms',
                    link:'/rooms/add',
                    backgroundColor:'bg-blue-500'
                }}>
                    Book with us today and have a free weekend wi-fi connection
                </InfoBox>

            </div>
        </div>
    </section>);
}
 
export default InfoBoxes;