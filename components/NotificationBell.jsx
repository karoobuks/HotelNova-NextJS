
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBell } from 'react-icons/fa';

const NotificationBell = () => {
  const [notifications, setNotifications] = useState([]);
  const [lastCount, setLastCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  /** -----------------------------------------------------------------
   *  Fetch notifications + Play sound on new
   * -----------------------------------------------------------------*/
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch('/api/notifications/user');
        const data = await res.json();
        const currentCount = data.notifications?.length || 0;

        // 🔊 Play sound if a new notification is added
        if (currentCount > lastCount) {
          const audio = new Audio('/sounds/notification.mp3');
          audio.play().catch(err => {
            console.warn('Audio play failed (may require user interaction):', err);
          });
        }

        setNotifications(data.notifications || []);
        setLastCount(currentCount);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };

    fetchNotifications(); // initial
    const interval = setInterval(fetchNotifications, 15000); // poll every 15s

    return () => clearInterval(interval); // cleanup
  }, [lastCount]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleDropdown = async () => {
    const willOpen = !showDropdown;
    setShowDropdown(willOpen);

    if (willOpen && unreadCount > 0) {
      try {
        await fetch('/api/notifications/mark-read-one', { method: 'POST' });
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      } catch (err) {
        console.error('Failed to mark notifications as read:', err);
      }
    }
  };

  return (
    <div className="relative">
      <button
        aria-label="Toggle Notifications"
        onClick={toggleDropdown}
        className="relative focus:outline-none"
      >
        <FaBell className="h-6 w-6 text-blue-700 hover:text-blue-600 transition-colors duration-200" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full leading-none">
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div className="absolute mt-2 right-0 w-72 bg-white border shadow rounded z-50 overflow-hidden">
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <p className="p-4 text-sm text-gray-500">Loading...</p>
            ) : notifications.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">No notifications</p>
            ) : (
              notifications.slice(0, 5).map((note, i) => (
                <div
                  key={i}
                  className={`p-3 text-sm border-b text-gray-700 ${
                    !note.read ? 'bg-blue-50 font-medium' : ''
                  }`}
                >
                  {note.message}
                </div>
              ))
            )}
          </div>

          <div className="text-center border-t bg-gray-50">
            <Link
              href="/notifications"
              className="block text-sm text-blue-600 hover:underline py-2"
              onClick={() => setShowDropdown(false)}
            >
              See all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
