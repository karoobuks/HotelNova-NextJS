// import Hero from "@/components/Hero";
// import InfoBoxes from "@/components/InfoBoxes";
// import HomeProperties from "@/components/HomeProperties";


// const HomePage = () => {
//     return ( <div>
//         <Hero />
//         <InfoBoxes />
//         <HomeProperties />
        

//     </div> );
// }
 
// export default HomePage;

// app/page.jsx
import { getSessionUser } from '@/utils/getSessionUser';
import HomePage from '@/components/HomePage';

export default async function Page() {
  const currentUser = await getSessionUser(); // This gets the logged-in user

  return <HomePage currentUser={currentUser} />;
}
