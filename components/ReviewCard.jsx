
'use client';

import Link from 'next/link';
import Image from 'next/image';
import StarRating from './StarRating';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function ReviewCard({ review, isOwner }) {
  const router = useRouter();

  const handleDelete = async (e) => {
    e.preventDefault();

    const confirmed = confirm('Are you sure you want to delete this review?');
    if (!confirmed) return;

    const toastId = toast.loading('Deleting your review...');

    try {
      const res = await fetch(`/api/rooms/${review.room}/review/delete/${review._id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('Review deleted successfully!', { id: toastId });
        router.refresh();
      } else {
        toast.error('Failed to delete the review.', { id: toastId });
      }
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Something went wrong.', { id: toastId });
    }
  };

  return (
    <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition border border-gray-100">
      <div className="mb-2 flex justify-between items-center">
        <div className="flex items-center gap-3 mb-2">
          {review.reviewer?.image && (
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={review.reviewer.image}
                alt={review.reviewer.name || 'Reviewer'}
                width={40}
                height={40}
                unoptimized
                className="rounded-full object-cover"
              />
            </div>
          )}
          <h4 className="text-lg font-semibold text-gray-800">
            {review.reviewer?.name || 'Anonymous'}
          </h4>
        </div>
        <span className="text-sm">
          <StarRating rating={review.rating} />
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-2">
        {review.date
          ? new Date(review.date).toLocaleString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
              hour12: true,
            })
          : 'N/A'}
      </p>

      <p className="text-gray-700 mb-2">{review.comment}</p>

      {isOwner && (
        <div className="flex gap-4 mt-2">
          <Link
            href={`/rooms/${review.room}/review/edit/${review._id}`}
            className="text-white bg-blue-600 px-3 py-1.5 rounded-xl hover:bg-blue-700 text-sm"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-white bg-red-500 px-3 py-1.5 rounded-xl hover:bg-red-700 text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
