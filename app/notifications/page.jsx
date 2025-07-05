
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBed, FaEnvelope, FaInfoCircle, FaCheck, FaTrash } from 'react-icons/fa';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/notifications/user');
      const data = await res.json();
      setNotifications(data.notifications || []);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'booking':
        return <FaBed className="text-green-600" />;
      case 'message':
        return <FaEnvelope className="text-blue-600" />;
      case 'info':
      default:
        return <FaInfoCircle className="text-gray-500" />;
    }
  };

  const markAsRead = async (id) => {
    try {
      await fetch(`/api/notifications/mark-read-one?id=${id}`, { method: 'POST' });
      fetchNotifications();
    } catch (err) {
      console.error('Error marking notification as read:', err);
    }
  };


const clearAll = async () => {
  try {
    const res = await fetch('/api/notifications/clear', { method: 'DELETE' });
    const result = await res.json();

    if (!res.ok) {
      console.error('Failed to clear:', result);
      return;
    }

    console.log('Cleared successfully:', result);
    fetchNotifications(); // refresh UI
  } catch (err) {
    console.error('Error clearing notifications:', err);
  }
};


  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Notifications</h1>
        {notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="flex items-center text-sm text-red-600 hover:text-red-800"
          >
            <FaTrash className="mr-1" /> Clear All
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500">You have no notifications.</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification, idx) => (
            <li
              key={idx}
              className={`flex items-start justify-between gap-2 p-4 rounded-lg shadow-sm border transition ${
                notification.read ? 'bg-white' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <div className="flex gap-3 items-start">
                <div className="mt-1">{getIcon(notification.type)}</div>
                <div>
                  <p className="text-sm text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(notification.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification._id)}
                  className="text-xs text-blue-600 hover:underline flex items-center"
                >
                  <FaCheck className="mr-1" /> Mark as read
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      <Link
        href="/"
        className="mt-6 inline-block text-blue-600 hover:underline text-sm"
      >
        ← Back to Home
      </Link>
    </div>
  );
}
