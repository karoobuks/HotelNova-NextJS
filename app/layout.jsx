
import LayoutWrapper from '@/components/LayoutWrapper'
import '@/assets/styles/globals.css'
import { Toaster } from 'react-hot-toast';




export const metadata = {
    title:'HotelNova',
    keywords:'rental, property, real estate',
    description:'Find the perfect rental property',
    icons:{
        icon:'/favicon-rounded.ico'
    }
}


export default function RootLayout ({ children }) {
   
    return ( <html lang="en">
        
        <body>
            <Toaster position='top-center' /> 
               <LayoutWrapper>{ children }</LayoutWrapper> 
        </body>
    </html> );
}
 
// export default MainLayout;