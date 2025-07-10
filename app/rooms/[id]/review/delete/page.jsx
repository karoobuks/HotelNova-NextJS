'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import toast from 'react-hot-toast';

export default function DeleteReviewPage() {
  const router = useRouter();
  const { id: roomId, reviewId } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const deleteReview = async () => {
      try {
        const res = await fetch(`/api/rooms/${roomId}/review/delete/${reviewId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          toast.success('Review deleted successfully.');
          router.push(`/rooms/${roomId}`);
        } else {
          const { error } = await res.json();
          toast.error(error || 'Failed to delete review.');
        }
      } catch (err) {
        console.error('❌ Delete error:', err);
        toast.error('An error occurred while deleting review.');
      } finally {
        setLoading(false);
      }
    };

    if (roomId && reviewId) {
      deleteReview();
    }
  }, [roomId, reviewId]);

  return (
    <div className="max-w-xl mx-auto p-6 text-center">
      {loading ? (
        <p className="text-lg font-semibold">Deleting your review...</p>
      ) : (
        <p className="text-lg text-red-500 font-medium">Redirecting...</p>
      )}
    </div>
  );
}
