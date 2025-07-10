// import Link from "next/link";

// const RegisterPage = () => {
//     return ( <div className="bg-gray-100 flex items-center justify-center min-h-screen ">
//         <div className="w-auto max-w-sm  bg-white rounded-xl shadow-lg p-8 space-y-6">
//             <form action="#" className="space-y-4">
//                 <div >
//                 <label htmlFor="firstname">Firstname</label>
//                 <input type="text"
//                 id="firstname"
//                 placeholder="First Name" 
//                 className="w-full px-4 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "/>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="lastname">Lastname</label>
//                     <input type="text" 
//                     id="lastname"
//                     placeholder="Last Name"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="Email">Email</label>
//                     <input type="text" 
//                     id="email"
//                     placeholder="example@you.com"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
//                     <input type="password"
//                     id="password"
//                     placeholder="******"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phone">Phone No</label>
//                     <input type="phone"
//                     id="phone"
//                     placeholder="Phone number"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
//                 <div>
//                     <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="address">Address</label>
//                     <input type="text" 
//                     id="address"
//                     placeholder="Home Address"
//                     className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
//                 </div>
               
//                 <button
//                 type="submit"
//                 className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
//                     Sign up 
//                 </button>
//             </form>

//         </div>

//     </div> );
// }
 
// export default RegisterPage;


'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    phone: '',
    address: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      router.push('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    signIn('google', { callbackUrl: '/profile' });
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="w-auto max-w-sm bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {['firstname', 'lastname', 'email', 'password', 'phone', 'address'].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-gray-700 text-sm font-medium mb-1 capitalize"
              >
                {field}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                id={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={field === 'email' ? 'example@you.com' : ''}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={field === 'email' || field === 'password'}
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {loading ? 'Registering...' : 'Sign Up'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="w-full h-px bg-gray-300" />
          <span className="text-sm text-gray-500">or</span>
          <div className="w-full h-px bg-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          onClick={handleGoogleSignup}
          className="w-full border border-gray-300 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="text-sm font-medium text-gray-700">Continue with Google</span>
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?
          <a href="/login" className="text-blue-600 hover:underline"> Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
