// // components/ChangePasswordForm.jsx
// 'use client';

// import { useState } from 'react';
// import toast from 'react-hot-toast';

// export default function ChangePasswordForm({ hasPassword }) {
//   const [form, setForm] = useState({ currentPassword: '', newPassword: '' });
//   const [submitting, setSubmitting] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     const res = await fetch('/api/profile/change-password', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include',
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       toast.success(data.message || 'Password changed successfully');
//       setForm({ currentPassword: '', newPassword: '' });
//     } else {
//       toast.error(data.error || 'Failed to change password');
//     }

//     setSubmitting(false);
//   };

//   if (!hasPassword) {
//     return (
//       <p className="text-sm text-gray-500 mt-4">
//         You signed up with Google. Password change is not available.
//       </p>
//     );
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 mt-4 max-w-md">
//       <div>
//         <label className="block font-medium">Current Password</label>
//         <input
//           type="password"
//           name="currentPassword"
//           value={form.currentPassword}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded"
//         />
//       </div>

//       <div>
//         <label className="block font-medium">New Password</label>
//         <input
//           type="password"
//           name="newPassword"
//           value={form.newPassword}
//           onChange={handleChange}
//           required
//           className="w-full px-4 py-2 border rounded"
//         />
//       </div>

//       <button
//         type="submit"
//         disabled={submitting}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//       >
//         {submitting ? 'Updating...' : 'Change Password'}
//       </button>
//     </form>
//   );
// }


'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ChangePasswordForm({ userId }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`/api/profile/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, currentPassword, newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      router.push('/profile')
    } catch (err) {
      toast.error(err.message || 'Error updating password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="w-full border rounded px-3 py-2 mt-1"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Updating...' : 'Change Password'}
      </button>
    </form>
  );
}
