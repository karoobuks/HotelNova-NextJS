'use client'
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '@/assets/styles/globals.css'
import { usePathname } from 'next/navigation';
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png'
import Logo from '@/assets/images/HotelNova-logo.png'

const NavBar = () => {
  const { data:session } = useSession();
  const profileImage = session?.user?.image;

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [providers, setProviders] = useState(null);

  const pathname = usePathname()
  useEffect( () => {
    const setAuthProviders = async () =>{
      const res = await getProviders()
      setProviders(res)
      
    }
    setAuthProviders()
  }, [])

  return ( <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-20'>
          {/* LOGO */}
          <div className='flex items-center'>
            <Image src={Logo} width={40} height={40} alt='Logo' className='rounded-xl font-bold '/>
            <Link href='/' className='text-xl font-bold text-blue-700'>HotelNova</Link>
          </div>
          {/* DESKTOP MENU */}
          <div className='hidden md:flex space-x-6 items-center'>
            <Link href='/' className={`${pathname === '/' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white hover:bg-blue-600 rounded-md px-3 py-2`}>Home</Link>
            <Link href='/rooms' className={`${pathname === '/rooms' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white hover:bg-blue-600 rounded-md px-3 py-2`}>Rooms</Link>
            <Link href='/book' className={`${pathname === '/book' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white hover:bg-blue-600 rounded-md px-3 py-2`}>Book</Link>
            <Link href='/amenities' className={`${pathname === '/amenities' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white hover:bg-blue-600 rounded-md px-3 py-2`}>Amenities</Link>
            <Link href='/contact' className={`${pathname === '/contact' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white hover:bg-blue-600 rounded-md px-3 py-2`}>Contact</Link>
            {/* {
              !session &&(
             <>
             { providers && Object.values(providers).map((provider, index) =>(
            <button key={index} onClick={() => signIn(provider.id)} className='bg-blue-700 text-white text-gray-700 hover:text-white hover:bg-blue-600 rounded-md px-4 py-2'>Login or Register</button>
            ))}
            </>
            )} */}
            {!session && (
  <>
    {providers ? (
      Object.values(providers).map((provider, index) => (
        <button
          key={index}
          onClick={() => signIn(provider.id)}
          className="bg-blue-700 text-white hover:bg-blue-600 rounded-md px-4 py-2"
        >
          Login or Register
        </button>
      ))
    ) : (
      <button
        onClick={() => signIn()}
        className="bg-blue-700 text-white hover:bg-blue-600 rounded-md px-4 py-2"
      >
        Login or Register
      </button>
    )}
  </>
)}


                {
              session && (
            
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0"
          >
            <Link href="/messages" className="relative group">
              <button
                type="button"
                className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5"></span>
                <span className="sr-only">View notifications</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>
              <span
                className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full"
              >
                2
                {/* <!-- Replace with the actual number of notifications --{">"} */}
              </span>
            </Link>
            {/* <!-- Profile dropdown button --> */}
            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <Image
                    className="rounded-full"
                    src={ profileImage || profileDefault}
                    alt=""
                    width={40}
                    height={40}
                    unoptimized 
  
                  />
                </button>
              </div>

             {/* { <!-- Profile dropdown --{">"}} */}
             {
             isProfileMenuOpen &&(
              <div
                id="user-menu"
                className=" absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="user-menu-button"
                tabIndex="-1"
              >
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-0"
                  >Your Profile</Link
                >
                <Link
                  href="/properties/saved"
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  >Saved Properties</Link
                >
                <button
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                  tabIndex="-1"
                  id="user-menu-item-2"
                  onClick={ () => {
                    setIsProfileMenuOpen(false);
                    signOut();
                  }}
                >
                  Sign Out
                </button>
              </div>
              )}
            </div>
          </div>
              )}

          </div>
          {/* MOBILE HAMBURGER */}
          {/* MOBILE NOTIFICATIONS + HAMBURGER */}
<div className='md:hidden flex items-center space-x-4'>
  {/* Notification Bell */}
  {session && (
    <Link href="/messages" className="relative">
      <button
        type="button"
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">View notifications</span>
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
          />
        </svg>
      </button>
      <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold text-white bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
        2
      </span>
    </Link>
  )}

  {/* Profile Picture Dropdown */}
  {session && (
    <div className="relative">
      <button
        onClick={() => setIsProfileMenuOpen((prev) => !prev)}
        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">Open user menu</span>
        <Image
          className="rounded-full"
          src={profileImage || profileDefault}
          alt="Profile"
          width={40}
          height={40}
          unoptimized 
        />
      </button>

      {/* Dropdown Menu */}
      {isProfileMenuOpen && (
        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 py-1">
          <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Your Profile
          </Link>
          <Link href="/properties/saved" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
            Saved Properties
          </Link>
          <button
            onClick={() => {
              setIsProfileMenuOpen(false);
              signOut(); // <-- Ensure signOut is imported
            }}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )}

  {/* Hamburger Menu Button */}
  <button
    id="toggle-menu"
    className="text-gray-700 focus:outline-none"
    aria-controls="mobile-menu"
    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
  >
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
</div>

          
        </div>
      </div>

      {/* MOBILE MENU */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:hidden px-4 pt-2 pb-4 space-y-2`}>
        <Link href='/' className={`${pathname === '/' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white block hover:bg-blue-600 rounded-md px-3 py-2 text-base font-medium`}>Home</Link>
        <Link href='/rooms' className={`${pathname === '/rooms' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white block hover:bg-blue-600 rounded-md px-3 py-2 text-base font-medium`}>Rooms</Link>
        <Link href='/book' className={`${pathname === '/book' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white block hover:bg-blue-600 rounded-md px-3 py-2 text-base font-medium`}>Book</Link>
        <Link href='/amenities' className={`${pathname === '/amenities' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white block hover:bg-blue-600 rounded-md px-3 py-2 text-base font-medium`}>Amenities</Link>
        <Link href='/contact' className={`${pathname === '/contact' ? 'bg-blue-700 text-white' : 'text-gray-700'}  hover:text-white block hover:bg-blue-600 rounded-md px-3 py-2 text-base font-medium`}>Contact</Link>
        {
          !session &&(
         <>
        <button  onClick={() => signIn()} className= 'bg-blue-700 text-white    hover:text-white block hover:bg-blue-600 rounded-md px-3 py-2 text-base font-medium'> Login or Register </button>
        </>)}


          
      </div>
      
    </nav>
  );
};

export default NavBar;
