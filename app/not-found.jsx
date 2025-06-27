
import {FaExclamationTriangle} from 'react-icons/fa'

const NotFoundPage = () => {
    return ( <div style={{textAline:"center", padding:"50px" }}>
        <h1 style={{fontSize: "3rem", color:"#ff6347" }}>
            <div className=' flex justify-center'>
            <FaExclamationTriangle className='text-8xl text-yellow-400 fa-5x ' />
            </div>
            <div className='flex justify-center'>404 - Page Not Found</div>
        
        
        </h1>
        <p className='flex justify-center' style={{ fontSize:"1.2rem" }}>
           oops! The page you are looking for does not exist.
        </p>
        <a href="/" className='flex justify-center' style={{ color:"#60b347", textDecoration: "underline"}}>Go back to Home
        </a>
    </div> );
}
 
export default NotFoundPage;