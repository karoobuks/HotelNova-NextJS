// 'use client'
// import '@/assets/styles/globals.css'

// const LoginPage = () => {
//     return ( <div className="bg-gray-100 flex items-center justify-center min-h-screen">

//   <div className="w-auto max-w-sm bg-white rounded-xl shadow-lg p-8 space-y-6">
//     <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>

//     <form action="#" className="space-y-4">
//       <div>
//         <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
//         <input
//           type="email"
//           id="email"
//           placeholder="you@example.com"
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div>
//         <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
//         <input
//           type="password"
//           id="password"
//           placeholder="********"
//           className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//       </div>

//       <div className="flex items-center justify-between text-sm">
//         <label className="flex items-center">
//           <input type="checkbox" className="mr-2" />
//           Remember me
//         </label>
//         <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
//       </div>

//       <button
//         type="submit"
//         className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//       >
//         Sign In
//       </button>
//     </form>

//     <p className="text-sm text-center text-gray-600">
//       Don't have an account?
//       <a href='/register' className="text-blue-600 hover:underline">Sign up</a>
//     </p>
//   </div>

// </div> );
// }
 
// export default LoginPage;

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';


export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      router.push('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    await signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-auto max-w-sm bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          <span className="text-gray-700 font-medium">Continue with Google</span>
        </button>

        <div className="text-gray-500 text-center text-sm">or</div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="/forgot-password" className="text-blue-600 hover:underline">Forgot password?</a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-sm text-center text-gray-600">
          Don't have an account?
          <a href="/register" className="text-blue-600 hover:underline"> Sign up</a>
        </p>
      </div>
    </div>
  );
}
