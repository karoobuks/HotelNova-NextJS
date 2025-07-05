'use client';

import { useState } from 'react';
import {  useRouter } from 'next/navigation';
import toast from 'react-hot-toast';




const ReviewForm =  ({ id }) => {
 

//   const { id } = useParams();
  const router = useRouter();

  if (!id) {
  console.error("id is missing");
  return <p>Error: Invalid room ID</p>;
}


  const [form, setForm] = useState({
    //reviewer: '',
    comment: '',
    rating: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/rooms/${id}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Review submitted successfully!");
        router.push(`/rooms/${id}`);
      } else {
        toast.error("Something went wrong. Please try again.");
        router.push('/error');
      }
    } catch (err) {
      console.error('Review submission error:', err);
      toast.error("Server error. Please try again later.");
      router.push('/error');
    } finally {
      setSubmitting(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-6">Leave a Review</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* <div>
            <label htmlFor="reviewer" className="block font-semibold mb-1">Your Name</label>
            <input
              type="text"
              name="reviewer"
              id="reviewer"
              value={form.reviewer}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div> */}

          <div>
            <label htmlFor="comment" className="block font-semibold mb-1">Comment</label>
            <textarea
              name="comment"
              id="comment"
              rows="4"
              value={form.comment}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="What did you like or dislike about this room?"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rating" className="block font-semibold mb-1">Rating (0–5)</label>
              <input
                type="number"
                name="rating"
                id="rating"
                value={form.rating}
                onChange={handleChange}
                min="0"
                max="5"
                step="0.1"
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>

            {/* <div>
              <label htmlFor="date" className="block font-semibold mb-1">Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={form.date}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div> */}
          </div>
          
          <div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-200"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
