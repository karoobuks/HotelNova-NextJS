'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditRoomPage() {
  const { id } = useParams();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    type: '',
    amenities: '',
  });

  useEffect(() => {
    const fetchRoom = async () => {
      const res = await fetch(`/api/rooms/${id}`);
      const data = await res.json();
      const room = data.room;

      setFormData({
        name: room.name,
        description: room.description,
        price: room.price,
        type: room.type,
        amenities: room.amenities.join(', '),
      });
    };

    fetchRoom();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`/api/rooms/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
        amenities: formData.amenities.split(',').map((a) => a.trim()),
      }),
    });

    if (res.ok) {
      alert('Room updated successfully');
      router.push('/admin/rooms');
    } else {
      alert('Failed to update room');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Room</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Room Name"
          className="w-full p-2 border rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded"
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          className="w-full p-2 border rounded"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Room Type"
          className="w-full p-2 border rounded"
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Amenities (comma separated)"
          className="w-full p-2 border rounded"
          value={formData.amenities}
          onChange={(e) => setFormData({ ...formData, amenities: e.target.value })}
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
}
