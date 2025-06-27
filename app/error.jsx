'use client'
import {FaExclamationCircle} from 'react-icons/fa'
import Link from 'next/link';

const ErrorPage = ({error}) => {
    return ( <div style={{textAline:"center", padding:"50px" }}>
        <h1 style={{fontSize: "3rem", color:"#ff6347" }}>
            <div className=' flex justify-center'>
            <FaExclamationCircle className='text-8xl text-yellow-400 fa-5x ' />
            </div>
            <div className='flex justify-center'>Something Went Wrong</div>
        
        
        </h1>
        <p className='flex justify-center' style={{ fontSize:"1.2rem" }}>
           {error.toString()}
        </p>
        <Link href="/" className='flex justify-center' style={{ color:"#60b347", textDecoration: "underline"}}>Go back to Home
        </Link>
    </div> );
}
 
export default ErrorPage;