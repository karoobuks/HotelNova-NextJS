
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function EditReviewPage() {
  const router = useRouter();
  const { reviewId, id: roomId } = useParams();

  const [review, setReview] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}/review/edit/${reviewId}`);

        if (!res.ok) {
          const { error } = await res.json();
          toast.error(error || 'Failed to fetch review.');
          return;
        }

        const data = await res.json();
        setReview(data);
        setComment(data.comment);
        setRating(data.rating);
      } catch (err) {
        console.error('❌ Review fetch failed:', err);
        toast.error('An error occurred while fetching review.');
      } finally {
         setLoading(false);
      }
    };

    if (reviewId && roomId) fetchReview();
  }, [reviewId, roomId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch(`/api/rooms/${roomId}/review/edit/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment, rating }),
      });

      if (res.ok) {
        toast.success('Review updated!');
        router.push(`/rooms/${roomId}`);
      } else {
        const { error } = await res.json();
        toast.error(error || 'Failed to update review.');
      }
    } catch (err) {
      console.error('❌ Update failed:', err);
      toast.error('An error occurred while updating review.');
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Edit Your Review</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            step="0.1"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Comment</label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {submitting? 'Review Is Updating...':'Update Review'}
        </button>
      </form>
    </div>
  );
}
