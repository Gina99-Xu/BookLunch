'use client'

import { deleteBooking } from "../_lib/actions";
import ReservationCard from "./ReservationCard";


import { useOptimistic } from 'react';

export default function ReservationList({ bookings }) {

  const [useOptimisticBookings, optimisticDelete] = useOptimistic(
    bookings,
    (curBookings, bookingId) => {
      return curBookings.filter(booking => booking.id != bookingId)
    }
  )

  const handleDelete = async (bookingId) => {
    optimisticDelete(bookingId);
    await deleteBooking(bookingId);

  }
  return (
    <ul className="space-y-6">
      {useOptimisticBookings.map(booking => (
        <ReservationCard
          booking={booking}
          key={booking.id}
          onDelete={handleDelete}
        />
      ))}
    </ul>
  )
}