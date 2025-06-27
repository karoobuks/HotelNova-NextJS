// app/rooms/[roomId]/review/page.jsx
'use client';
import ReviewForm from '@/components/ReviewForm';


export default async function ReviewPage({params}) {
  const {id} = await params;

  return <ReviewForm id={id} />;
}
