import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getSessionUser = async (req) => {
    const session = await getServerSession(authOptions)
      console.log('👉 FULL SESSION:', session); // 🔍 See what it contains 

    if (!session || !session.user || !session.user.id) {
        throw new Error("❌ No user found in session.");
        
    }

    
  // if (!session || !session.user) {
  //   return null;
  // }


    return {
        user: session.user,
        userId: session.user._id || session.user.id,
    }
}