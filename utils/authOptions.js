// import GoogleProvider from 'next-auth/providers/google'
// import connectedDB from '@/config/database'
// import User from '@/models/User'

// export const authOptions = {

//     providers : [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             authorization:{
//                 params: {
//                     prompt: 'consent',
//                     access_type: 'offline',
//                     response_type: 'code',
//                 }
//             },
//             httpOptions:{
//                 timeout: 100000
//             },
//         })
//     ],
//     callbacks:{
//         async signIn ({ profile }){
//             await connectedDB()
//             const userExists = await User.findOne({email: profile.email})

//             if(!userExists){
//                 const username = profile.name.slice(0, 20);

//                 await User.create({
//                     email: profile.email,
//                     username,
//                     image: profile.picture
//                 })
//             }
//             return true;
//         },
//         async session({ session }){
//             await connectedDB()
//             const user = await User.findOne({email: session.user.email});
//             session.user.id = user._id.toString()
            
//             return session
//         }
//     }
// }



// import GoogleProvider from 'next-auth/providers/google';
// import connectedDB from '@/config/database';
// import User from '@/models/User';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: 'consent',
//           access_type: 'offline',
//           response_type: 'code',
//         },
//       },
//       httpOptions: {
//         timeout: 100000,
//       },
//     }),
//   ],

//   callbacks: {
//     async signIn({ profile }) {
//       await connectedDB();

//       const userExists = await User.findOne({ email: profile.email });

//       if (!userExists) {
//         const [firstname, ...rest] = profile.name.split(' ');
//         const lastname = rest.join(' ');

//         await User.create({
//           email: profile.email,
//           firstname,
//           lastname,
//           image: profile.picture,
//           role: 'guest', // ✅ assign default role
//         });
//       }

//       return true;
//     },

//     async session({ session }) {
//       await connectedDB();

//       const user = await User.findOne({ email: session.user.email });

//       if (user) {
//         session.user.id = user._id.toString();
//         session.user.role = user.role;
//       }

//       return session;
//     },
//   },

//   pages: {
//     signIn: '/login', // ✅ custom login page
//   },

//   session: {
//     strategy: 'jwt',
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };

// import GoogleProvider from 'next-auth/providers/google';
// import connectedDB from '@/config/database';
// import User from '@/models/User';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: 'consent',
//           access_type: 'offline',
//           response_type: 'code',
//         },
//       },
//     }),
//   ],

//   session: {
//     strategy: 'jwt',
//   },

//   callbacks: {
//     async signIn({ profile }) {
//       await connectedDB();
//       const userExists = await User.findOne({ email: profile.email });

//       if (!userExists) {
//         const [firstname, ...rest] = profile.name.split(' ');
//         const lastname = rest.join(' ');
//         await User.create({
//           email: profile.email,
//           firstname,
//           lastname,
//           image: profile.picture,
//           role: 'guest',
//         });
//       }

//       return true;
//     },

//     async jwt({ token, user }) {
//       if (user) {
//         await connectedDB();
//         const dbUser = await User.findOne({ email: user.email });
//         token.id = dbUser._id.toString();
//         token.role = dbUser.role;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },

//   pages: {
//     signIn: '/login',
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };


// import GoogleProvider from 'next-auth/providers/google';
// import connectedDB from '@/config/database';
// import User from '@/models/User';

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       authorization: {
//         params: {
//           prompt: 'consent',
//           access_type: 'offline',
//           response_type: 'code',
//         },
//       },
//       httpOptions:{
//         timeout:100000
//       },
//     }),
//   ],

//   session: {
//     strategy: 'jwt',
//   },

//   callbacks: {
//     async signIn({ profile }) {
//       await connectedDB();
//       const existingUser = await User.findOne({ email: profile.email });
//       if (!existingUser) {
//         const [firstname, ...rest] = profile.name.split(' ');
//         await User.create({
//           email: profile.email,
//           firstname,
//           lastname: rest.join(' '),
//           image: profile.picture,
//           role: 'guest',
//         });
//       }
//       return true;
//     },

//     async jwt({ token, user }) {
//       await connectedDB();
//       const dbUser = await User.findOne({ email: token.email });
//       token.id = dbUser?._id?.toString();
//       token.role = dbUser?.role || 'guest';
//       return token;
//     },

//     async session({ session, token }) {
//       session.user.id = token.id;
//       session.user.role = token.role;
//       return session;
//     },
//   },

//   pages: {
//     signIn: '/login',
//   },

//   secret: process.env.NEXTAUTH_SECRET,
// };


// /utils/authOptions.js

import GoogleProvider from 'next-auth/providers/google';
import connectedDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
      httpOptions: {
        timeout: 100000,
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    // 🟡 When user signs in via Google
    async signIn({ profile }) {
      await connectedDB();

      const existingUser = await User.findOne({ email: profile.email });

      if (!existingUser) {
        const [firstname, ...rest] = profile.name.split(' ');

        // 🔄 Create user with default role = guest
        await User.create({
          email: profile.email,
          firstname,
          lastname: rest.join(' '),
          image: profile.picture,
          role: 'guest', // 👈 default role
        });
      }

      return true;
    },

    // 🔐 Add role & userId to JWT token
    async jwt({ token }) {
      await connectedDB();

      const dbUser = await User.findOne({ email: token.email });

      token.id = dbUser?._id?.toString();
      token.role = dbUser?.role || 'user';

      return token;
    },

    // 💼 Expose role & ID to the session
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },

  secret: process.env.NEXTAUTH_SECRET,
};

