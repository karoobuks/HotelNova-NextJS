// components/LeaveReviewButton.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LeaveReviewButton({ hasReviewed, roomId, reviewCount }) {
  const router = useRouter();

  const handleClick = () => {
    if (hasReviewed) {
      toast.error('You have already reviewed this room.');
    } else {
      router.push(`/rooms/${roomId}/review?count=${reviewCount}`);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="mt-1 bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
    >
      Leave a Review
    </button>
  );
}
