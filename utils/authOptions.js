import GoogleProvider from 'next-auth/providers/google'
import connectedDB from '@/config/database'
import User from '@/models/User'

export const authOptions = {

    providers : [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization:{
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                }
            },
            httpOptions:{
                timeout: 100000
            },
        })
    ],
    callbacks:{
        async signIn ({ profile }){
            await connectedDB()
            const userExists = await User.findOne({email: profile.email})

            if(!userExists){
                const username = profile.name.slice(0, 20);

                await User.create({
                    email: profile.email,
                    username,
                    image: profile.picture
                })
            }
            return true;
        },
        async session({ session }){
            await connectedDB()
            const user = await User.findOne({email: session.user.email});
            session.user.id = user._id.toString()

    //          if (user) {
    //     session.user._id = user._id.toString(); // <-- add this line
    //     session.user.phone = user.phone || '';  // optional
    //     session.user.name = user.name;          // optional
    //     session.user.image = user.image;        // optional
    // }
            
            return session
        }
    }
}

