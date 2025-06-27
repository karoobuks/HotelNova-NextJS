'use client';
import EditBookingPage from "@/components/EditBookingPage";


export default function BookingPage({params}) {
  const {id} = params;

  return <EditBookingPage id={id} />;
}
