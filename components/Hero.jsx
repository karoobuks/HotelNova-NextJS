import Link from "next/link";

const Hero = () => {
    return ( <section className="bg-blue-600 py-20 mb-4 border-b shadow-md ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center ">
            <div className="text-center">
                <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
                    Welcome to HotelNova
                </h1>
                <p className="text-3xl font-semibold text-white my-4">
                    Luxury. Comfort. Elegance
                </p>
                <Link href='/book' className="text-blue-600 font-bold text-2xl bg-white rounded-md px-3 py-2 hover:bg-gray-200 ">Book Now</Link>

            </div>

        </div>
        
    </section> );
}
 
export default Hero;