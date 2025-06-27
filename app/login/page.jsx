'use client'
import '@/assets/styles/globals.css'

const LoginPage = () => {
    return ( <div className="bg-gray-100 flex items-center justify-center min-h-screen">

  <div className="w-auto max-w-sm bg-white rounded-xl shadow-lg p-8 space-y-6">
    <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>

    <form action="#" className="space-y-4">
      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="you@example.com"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="********"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Remember me
        </label>
        <a href="#" className="text-blue-600 hover:underline">Forgot password?</a>
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
      <a href='/register' className="text-blue-600 hover:underline">Sign up</a>
    </p>
  </div>

</div> );
}
 
export default LoginPage;