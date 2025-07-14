// components/HomePage.jsx

import Hero from "@/components/Hero";
import InfoBoxes from "@/components/InfoBoxes";
import HomeProperties from "@/components/HomeProperties";
import Link from "next/link";

const HomePage = ({ currentUser }) => {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <HomeProperties />

      {/* Admin Panel Button – Only visible to admins */}
      {currentUser?.role === 'admin' && (
        <div className="text-center mt-8">
          <Link href="/admin/users">
            <button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg shadow-md transition">
              👑 Go to Admin Panel
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
