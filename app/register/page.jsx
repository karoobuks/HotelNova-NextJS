import Link from "next/link";

const RegisterPage = () => {
    return ( <div className="bg-gray-100 flex items-center justify-center min-h-screen ">
        <div className="w-auto max-w-sm  bg-white rounded-xl shadow-lg p-8 space-y-6">
            <form action="#" className="space-y-4">
                <div >
                <label htmlFor="firstname">Firstname</label>
                <input type="text"
                id="firstname"
                placeholder="First Name" 
                className="w-full px-4 py-2  border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 "/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="lastname">Lastname</label>
                    <input type="text" 
                    id="lastname"
                    placeholder="Last Name"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="Email">Email</label>
                    <input type="text" 
                    id="email"
                    placeholder="example@you.com"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="password">Password</label>
                    <input type="password"
                    id="password"
                    placeholder="******"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="phone">Phone No</label>
                    <input type="phone"
                    id="phone"
                    placeholder="Phone number"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="address">Address</label>
                    <input type="text" 
                    id="address"
                    placeholder="Home Address"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
               
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                    Sign up 
                </button>
            </form>

        </div>

    </div> );
}
 
export default RegisterPage;