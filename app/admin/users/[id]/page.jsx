'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function UserProfilePage() {
  const { id } = useParams();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const current = await fetch('/api/me').then(res => res.json());
        setCurrentUserId(current._id);

        const res = await fetch(`/api/admin/users/${id}`);
        if (!res.ok) throw new Error();
        const data = await res.json();
        setUser(data);
        setLoading(false);
      } catch {
        toast.error('Failed to load user');
        router.push('/admin/users');
      }
    };

    fetchUser();
  }, [id, router]);

  const updateRole = async (newRole) => {
    if (!user) return;
    const confirmed = confirm(`Change role to "${newRole}"?`);
    if (!confirmed) return;

    const res = await fetch(`/api/admin/users/${user._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });

    if (res.ok) {
      toast.success('Role updated');
      setUser({ ...user, role: newRole });
    } else {
      toast.error('Failed to update role');
    }
  };

  const toggleStatus = async () => {
    const newStatus = user.status === 'verified' ? 'banned' : 'verified';
    const confirmed = confirm(`Change status to "${newStatus}"?`);
    if (!confirmed) return;

    const res = await fetch(`/api/admin/users/${user._id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (res.ok) {
      toast.success('Status updated');
      setUser({ ...user, status: newStatus });
    } else {
      toast.error('Failed to update status');
    }
  };

  if (loading || !user) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">User Profile</h1>

      <div className="space-y-3 text-sm">
        <p><strong>Name:</strong> {user.firstname || ''} {user.lastname || ''}</p>
        <p><strong>Email:</strong> {user.email}</p>
        {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
        <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        <p><strong>Last Login:</strong> {user.lastLogin ? new Date(user.lastLogin).toLocaleString() : '—'}</p>

        <div>
          <strong>Role:</strong>
          <select
            value={user.role}
            onChange={(e) => updateRole(e.target.value)}
            disabled={user._id === currentUserId}
            className="ml-2 border px-2 py-1 rounded"
          >
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
            <option value="user">User</option>
          </select>
          {user._id === currentUserId && (
            <span className="text-red-500 text-xs ml-2">(cannot change your own role)</span>
          )}
        </div>

        <div className="mt-2">
          <strong>Status:</strong>
          <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
            user.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {user.status}
          </span>

          <button
            onClick={toggleStatus}
            disabled={user._id === currentUserId}
            className={`ml-4 px-3 py-1 rounded text-xs transition ${
              user.status === 'verified'
                ? 'bg-red-100 hover:bg-red-200 text-red-700'
                : 'bg-green-100 hover:bg-green-200 text-green-700'
            } ${user._id === currentUserId ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {user.status === 'verified' ? 'Ban' : 'Verify'}
          </button>
        </div>
      </div>

      <button
        onClick={() => router.push('/admin/users')}
        className="mt-6 inline-block bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
      >
        ← Back to User List
      </button>
    </div>
  );
}
