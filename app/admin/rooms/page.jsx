'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRoomList() {
  const [rooms, setRooms] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/rooms')
      .then((res) => res.json())
      .then((data) => setRooms(data.rooms));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm('Are you sure you want to delete this room?');
    if (!confirmed) return;

    const res = await fetch(`/api/rooms/${id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      setRooms(rooms.filter((room) => room._id !== id));
      alert('Room deleted');
    } else {
      alert('Failed to delete room');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Room Management</h1>
      <ul className="space-y-4">
        {rooms.map((room) => (
          <li key={room._id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{room.name}</h2>
            <p>${room.price}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => router.push(`/admin/rooms/edit/${room._id}`)}
                className="bg-yellow-500 px-4 py-1 rounded text-white"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(room._id)}
                className="bg-red-600 px-4 py-1 rounded text-white"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
