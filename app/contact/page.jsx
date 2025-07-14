// 'use client';

// import { useState } from 'react';
// import { motion } from 'framer-motion';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [success, setSuccess] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSuccess(false);

//     // TODO: Replace with your backend endpoint
//     await new Promise((resolve) => setTimeout(resolve, 1000));

//     setFormData({ name: '', email: '', message: '' });
//     setSuccess(true);
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h1>

//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden md:flex">
//         {/* Contact Info */}
//         <div className="md:w-1/2 bg-blue-600 text-white p-6 space-y-4">
//           <h2 className="text-xl font-semibold">Let's Get in Touch</h2>
//           <p className="text-sm">We’d love to hear from you! Fill out the form and we’ll get back shortly.</p>

//           <div className="space-y-2">
//             <p><strong>📍 Address:</strong> 123 HotelNova Lane, Lagos, Nigeria</p>
//             <p><strong>📞 Phone:</strong> +234 812 345 6789</p>
//             <p><strong>✉️ Email:</strong> support@hotelnova.com</p>
//           </div>
//         </div>

//         {/* Form */}
//         <div className="md:w-1/2 p-6">
//           {success && (
//             <motion.p
//               className="text-green-600 text-sm mb-4"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               ✅ Message sent successfully!
//             </motion.p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Message</label>
//               <textarea
//                 name="message"
//                 rows={4}
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               ></textarea>
//             </div>

//             <motion.button
//               whileTap={{ scale: 0.95 }}
//               type="submit"
//               className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition"
//             >
//               Send Message
//             </motion.button>
//           </form>
//         </div>
//       </div>
//     </motion.div>
//   );
// }



// 'use client';

// import { useState } from 'react';
// import emailjs from '@emailjs/browser';
// import { motion } from 'framer-motion';

// export default function ContactPage() {
//   const [formData, setFormData] = useState({ name: '', email: '', message: '' });
//   const [success, setSuccess] = useState(false);
//   const [sending, setSending] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSending(true);
//     setSuccess(false);

//     const { name, email, message } = formData;

//     try {
//       await emailjs.send(
//         'your_service_id',    // Replace with your EmailJS service ID
//         'your_template_id',   // Replace with your EmailJS template ID
//         { name, email, message },
//         'your_public_key'     // Replace with your EmailJS public key
//       );

//       setSuccess(true);
//       setFormData({ name: '', email: '', message: '' });
//     } catch (error) {
//       console.error('EmailJS error:', error);
//       alert('❌ Failed to send message');
//     } finally {
//       setSending(false);
//     }
//   };

//   return (
//     <motion.div
//       className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <h1 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h1>

//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden md:flex">
//         {/* Left: Info */}
//         <div className="md:w-1/2 bg-blue-600 text-white p-6">
//           <h2 className="text-xl font-semibold mb-2">Let's Get in Touch</h2>
//           <p className="text-sm mb-4">We’d love to hear from you!</p>
//           <p><strong>📍</strong> Lagos, Nigeria</p>
//           <p><strong>📞</strong> +234 812 345 6789</p>
//           <p><strong>✉️</strong> support@hotelnova.com</p>
//         </div>

//         {/* Right: Form */}
//         <div className="md:w-1/2 p-6">
//           {success && (
//             <motion.p
//               className="text-green-600 text-sm mb-4"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4 }}
//             >
//               ✅ Your message was sent successfully!
//             </motion.p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700">Message</label>
//               <textarea
//                 name="message"
//                 rows={4}
//                 value={formData.message}
//                 onChange={handleChange}
//                 required
//                 className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
//               ></textarea>
//             </div>

//             <button
//               type="submit"
//               disabled={sending}
//               className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
//             >
//               {sending ? 'Sending...' : 'Send Message'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </motion.div>
//   );
// }


'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(false);

    const { name, email, message } = formData;

    const templateParams = {
      user_name: name,
      email,
      message,
      company: process.env.NEXT_PUBLIC_COMPANY_NAME || 'Your Company',
      title: 'Contact Form Submission',
    };

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      alert('❌ Failed to send message');
    } finally {
      setSending(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 flex flex-col items-center px-4 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Contact Us</h1>

      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md overflow-hidden md:flex">
        {/* Left: Info */}
        <div className="md:w-1/2 bg-blue-600 text-white p-6">
          <h2 className="text-xl font-semibold mb-2">Let's Get in Touch</h2>
          <p className="text-sm mb-4">We’d love to hear from you!</p>
          <p><strong>📍</strong> Lagos, Nigeria</p>
          <p><strong>📞</strong> +234 816 090 2077</p>
          <p><strong>✉️</strong> support@hotelnova.com</p>
        </div>

        {/* Right: Form */}
        <div className="md:w-1/2 p-6">
          {success && (
            <motion.p
              className="text-green-600 text-sm mb-4"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              ✅ Your message was sent successfully!
            </motion.p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 mt-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
