import Image from "next/image";
import Room from "@/models/Room";
import connectedDB from "@/config/database";


const RoomHeaderImage = async ({ image}) => {
  
    return (  <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="object-cover h-[400px] w-full"
            width={1280}
            height={720}
            quality={60} // reduce bandwidth use
            unoptimized
            
          />
        </div>
      </div>
    </section>
 );
}
 
export default RoomHeaderImage;