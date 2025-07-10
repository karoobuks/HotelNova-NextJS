// export { default } from 'next-auth/middleware'

// export const config = {
//     matcher: ['/rooms/add', '/profile', '/rooms/saved', '/messages', '/rooms', '/amenities', '/rooms/:path*', '/rooms/:path*/review']
// }



// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';
// import { jwtVerify } from 'jose'; // lightweight, works in Edge

// const protectedRoutes = [
//   '/rooms/add',
//   '/profile',
//   '/rooms/saved',
//   '/messages',
//   '/rooms',
//   '/amenities',
//   '/rooms/:path*',
// ];

// export async function middleware(req) {
//   const { pathname } = req.nextUrl;

//   const isProtected = protectedRoutes.some(route =>
//     pathname.startsWith(route.replace(':path*', ''))
//   );

//   if (!isProtected) return NextResponse.next();

//   const nextAuthToken = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   if (nextAuthToken) return NextResponse.next();

//   // ✅ Verify manual token using jose (works in Edge)
//   const token = req.cookies.get('token')?.value;

//   if (token) {
//     try {
//       await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));
//       return NextResponse.next();
//     } catch (err) {
//       console.error('Invalid manual JWT:', err);
//     }
//   }

//   const loginUrl = new URL('/login', req.url);
//   return NextResponse.redirect(loginUrl);
// }

// export const config = {
//   matcher: [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/rooms',
//     '/amenities',
//     '/rooms/:path*',
//   ],
// };


// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//   const protectedPaths = [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/rooms',
//     '/amenities',
//   ];

//   const pathname = req.nextUrl.pathname;

//   const isProtected = protectedPaths.some(path => pathname.startsWith(path));

//   if (!isProtected) return NextResponse.next();

//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const cookieToken =
//   req.cookies.get('next-auth.session-token')?.value ||
//   req.cookies.get('__Secure-next-auth.session-token')?.value;

// console.log('Raw cookie token:', cookieToken);


//   console.log('Middleware token:', token);

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/rooms',
//     '/amenities',
//     '/rooms/:path*',
//   ],
// };


// import { NextResponse } from 'next/server';
// import { getToken } from 'next-auth/jwt';

// export async function middleware(req) {
//   const protectedPaths = [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/rooms',
//     '/amenities',
//   ];

//   const pathname = req.nextUrl.pathname;
//   const isProtected = protectedPaths.some(path => pathname.startsWith(path));

//   if (!isProtected) return NextResponse.next();

//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   console.log('✅ Middleware token:', token);

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/rooms',
//     '/amenities',
//     '/rooms/:path*',
//   ],
// };


// // middleware.js
// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const pathname = req.nextUrl.pathname;

//   // Only protect these routes
//   const protectedPaths = [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/amenities',
//   ];

//   const isProtected = protectedPaths.some((path) => pathname.startsWith(path));
//   if (!isProtected) return NextResponse.next();

//   console.log("✅ Middleware token:", token);

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/rooms',
//     '/amenities',
//     '/rooms/:path*',
//   ],
// };


// // middleware.js
// import { getToken } from 'next-auth/jwt';
// import { NextResponse } from 'next/server';

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   console.log('✅ Middleware token:', token);
//   console.log('🔍 Cookies:', req.cookies.getAll());


//   // If token exists, allow the request
//   if (token) return NextResponse.next();

//   // Otherwise, redirect to login
//   return NextResponse.redirect(new URL('/login', req.url));
// }

// export const config = {
//   matcher: [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/amenities',
//     '/rooms/:path*', // covers nested routes like /rooms/123/review
//   ],
// };



// // ✅ 1. middleware.js - Fix token detection for both Google (NextAuth) and manual JWT
// import { NextResponse } from 'next/server';
// import { jwtVerify } from 'jose';

// export async function middleware(req) {
//   const token =
//     req.cookies.get('next-auth.session-token')?.value ||
//     req.cookies.get('__Secure-next-auth.session-token')?.value ||
//     req.cookies.get('token')?.value; // manual login fallback

//   if (!token) {
//     console.log('❌ No token found');
//     return NextResponse.redirect(new URL('/login', req.url));
//   }

//   try {
//     await jwtVerify(token, new TextEncoder().encode(process.env.NEXTAUTH_SECRET));
//     console.log('✅ Token verified');
//     return NextResponse.next();
//   } catch (err) {
//     console.error('❌ Token verification failed:', err);
//     return NextResponse.redirect(new URL('/login', req.url));
//   }
// }

// export const config = {
//   matcher: [
//     '/rooms/add',
//     '/profile',
//     '/rooms/saved',
//     '/messages',
//     '/amenities',
//     '/rooms/:path*'
//   ],
// };

// middleware.js
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  console.log('✅ Middleware token:', token);
  console.log('🔍 Cookies:', req.cookies.getAll());

  if (token) return NextResponse.next();

  // Fallback for manual login JWT token
  const cookieToken =
    req.cookies.get('token')?.value || null;

  if (cookieToken) {
    try {
      const decoded = JSON.parse(
        Buffer.from(cookieToken.split('.')[1], 'base64').toString()
      );
      console.log('✅ Decoded manual token:', decoded);
      return NextResponse.next();
    } catch (err) {
      console.error('❌ Invalid manual token in middleware:', err);
    }
  }

  return NextResponse.redirect(new URL('/login', req.url));
}

export const config = {
  matcher: [
    '/rooms/add',
    '/profile',
    '/rooms/saved',
    '/messages',
    '/amenities',
    '/rooms/:path*',
  ],
};



