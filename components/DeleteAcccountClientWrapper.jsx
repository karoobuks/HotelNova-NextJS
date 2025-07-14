'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';

export default function DeleteAccountClientWrapper() {
  const [showModal, setShowModal] = useState(false);
  const [isDeleting, startDelete] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startDelete(async () => {
      try {
        const res = await fetch('/api/users/disable', { method: 'DELETE' });
        if (res.ok) {
          await signOut();
          router.push('/login');
        } else {
          alert('❌ Failed to disable account.');
        }
      } catch (err) {
        console.error(err);
        alert('❌ Error occurred');
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="text-red-500 underline text-sm"
      >
        Delete My Account
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center space-y-4">
            <h2 className="text-xl font-bold text-gray-800">Confirm Account Deletion</h2>
            <p className="text-gray-600 text-sm">
              Are you sure you want to disable your account? This can be undone by contacting support.
            </p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                {isDeleting ? 'Disabling...' : 'Yes, Disable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
