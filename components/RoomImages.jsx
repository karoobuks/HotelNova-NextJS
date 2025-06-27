import Image from "next/image";

const RoomImages = ({ images}) => {
    return ( <section className="bg-blue-50 p-4">
        <div className="container mx-auto">
            { images.length === 1 ? (
                <Image 
                   src={ images[0] }
                   alt= ''
                   className='object-cover h-[400px] mx-auto rounded-xl'
                   width={1280} //1800
                   height={720} //400
                    quality={60}
                   priority={true}
                />
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    { images.map((image, index) => (
                        <div key={index} className={ `${images.length === 3 && index === 2
                            ? 'col-span-2' : 'col-span-1'
                        }`}> 
                         <Image 
                   src={image}
                   alt= ''
                   className='object-cover h-[400px] w-full rounded-xl'
                   width={1280} //1800
                   height={720} //400
                   priority={true}
                />
                        </div>
                    ))}
                </div>
            )}
        </div>
    </section> );
}
 
export default RoomImages;