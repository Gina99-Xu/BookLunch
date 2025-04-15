'use client'

import { useReservation } from "./ReservationContext"
import SubmitButton from "./SubmitButton";
import { createBooking } from "../_lib/actions";
import { useTable } from "./TableContext";
import Seating from "./Seatings";
import { MessageSquare } from 'lucide-react';

export default function ReservationForm({ restaurant }) {
  const { selectedDate, selectedTime } = useReservation();
  const { selectedTableSeat } = useTable();
  const { regularPrice, discount, id, minimum, image, name } = restaurant;
  const priceAfterDiscount = (regularPrice - discount);

  const bookingData = {
    selectedDate,
    selectedTime,
    regularPrice,
    discount,
    minimum,
    priceAfterDiscount,
    restaurantId: id,
    image,
    restaurantName: name,
    selectedTableSeat
  }

  const createBookingwithData = createBooking.bind(null, bookingData)

  return (
    <div className="bg-white p-6 md:p-8">
      <Seating />
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="h-5 w-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">Special Requests</h3>
        </div>
        
        <form
          action={createBookingwithData}
          className="space-y-6"
        >
          <div>
            <textarea
              name="observations"
              id="observations"
              rows={4}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-700 placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
              placeholder="Any allergies, dietary restrictions, or special requirements we should know about?"
            />
          </div>
          
          <div className="flex justify-end">
            <SubmitButton
              pendingLabel="Reserving..."
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Confirm Booking
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
}