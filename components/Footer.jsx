import Image from 'next/image';
import Logo from '@/assets/images/HotelNova-logo.png'
import Link from 'next/link';

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return ( <footer className="bg-blue-200 py-4 mt-24">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
            <div className="mb-4 md:mb-0">
              <Link href='/'> <Image src={Logo}  alt='Logo' className='h-9 w-auto rounded-xl font-bold' /></Link>  
            </div>
            <div className=' flex flex-wrap justify-center md:justify-start mb-4 md:mb-0'>
                <ul className='flex space-x-4'>
                    <li><Link href="/rooms"> Rooms</Link></li>
                    <li><Link href="/"> Terms of Service</Link></li>
                </ul>
            </div>
        </div>
        <p className='text-sm text-gray-500 mt-2 md:mt-0'>
         &copy;  {currentYear} HotelNova. All rights reserved. 
        </p>
        
    </footer> );
}
 
export default Footer;