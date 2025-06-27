// app/booking/page.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const EditBookingPage = ({ roomId }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    checkInDate: '',
    checkOutDate: '',
    totalGuests: 1,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/booking/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, roomId }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Booking successful!');
        router.push('/profile');
      } else {
        toast.error(data.error || 'Booking failed');
      }
    } catch (err) {
      toast.error('An error occurred');
    }

    setSubmitting(false);
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Book Your Stay</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Check-In Date</label>
          <input
            type="date"
            name="checkInDate"
            value={form.checkInDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Check-Out Date</label>
          <input
            type="date"
            name="checkOutDate"
            value={form.checkOutDate}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Total Guests</label>
          <input
            type="number"
            name="totalGuests"
            min="1"
            value={form.totalGuests}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting ? 'Booking...' : 'Confirm Booking'}
        </button>
      </form>
    </section>
  );
};

export default EditBookingPage;
