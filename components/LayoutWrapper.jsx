'use client'

import { usePathname } from "next/navigation";
import AuthProvider from "./AuthProvider";
import NavBar from "./Navbar";
import Footer from "./Footer";

const LayoutWrapper = ({children}) => {
    const pathname = usePathname();
    const noHeaderFooter = ['/login', '/register']
    const showHeaderfooter = !noHeaderFooter.includes(pathname)
    return ( 
        <AuthProvider>
        <>
        
            {showHeaderfooter && <NavBar/>}
            { children}
            {showHeaderfooter && <Footer/>}
          
        </>
        </AuthProvider>
    );
}
 
export default LayoutWrapper;