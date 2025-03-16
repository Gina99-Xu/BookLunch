'use client'

import { useReservation } from "./ReservationContext"
import SubmitButton from "./SubmitButton";
import { createBooking } from "../_lib/actions";
import { useTable } from "./TableContext";
import Seating from "./Seatings";


export default function ReservationForm({ restaurant }) {

  const { selectedDate, selectedTime } = useReservation();
  console.log(selectedDate, selectedTime);
  console.log(selectedTime);

  const { regularPrice, discount, id, minimum } = restaurant;
  console.log(regularPrice, discount, id, minimum);

  const { selectedTableSeat } = useTable();
  console.log(selectedTableSeat['name']);

  const priceAfterDiscount = (regularPrice - discount);

  const bookingData = {
    selectedDate,
    selectedTime,
    regularPrice,
    discount,
    minimum,
    priceAfterDiscount,
    restaurantId: id,
    selectedTableSeat
  }

  const createBookingwithData = createBooking.bind(null, bookingData)

  return (
    <div className="border-l-2 flex flex-col gap-8 bg-stale-200 px-4 py-4">
      <Seating />
      <form className="flex-grow px-4 text-md grid grid-cols-1"
        action={async (formData) => {
          await createBookingwithData(formData);
          resetRange()
        }}>
        <div>
          <textarea name="observations" id="observations" className="border h-60 mt-4 px-5 py-6 bg-gray-00 text-black font-bold w-full shadow-sm rounded-sm"
            placeholder="Anything else we should know about before your arrival such as Any allergies, special requirements?"
          >
          </textarea>
        </div>
        <div className="flex flex-col-reverse justify-end">
          <SubmitButton pendingLabel="Reserving...">Book Now</SubmitButton>
        </div>

      </form>
    </div>
  )
}