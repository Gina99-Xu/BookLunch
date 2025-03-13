'use client'

import { useReservation } from "./ReservationContext"
import SubmitButton from "./SubmitButton";
import { createBooking } from "../_lib/actions";
import { useTable } from "./TableContext";
import Seating from "./Seatings";


export default function ReservationForm({ property, user }) {

  const { selectedDate, setSelectedDate, selectedTime, setSelectedTime, resetDate, resetTime } = useReservation();
  const { regularPrice, discount, id } = property;
  const { tables, setTables, setSelectedTableSeat, selectedTableSeat, handleTableClick } = useTable();
  console.log(selectedTableSeat);

  const propertyPrice = (regularPrice - discount);

  const bookingData = {
    selectedDate,
    selectedTime,
    propertyPrice,
    propertyId: id
  }

  const createBookingwithData = createBooking.bind(null, bookingData)

  return (
    <div className="flex flex-col gap-8 bg-stone-400 px-4 py-4">
      <Seating />
      <form className="flex-grow px-4 text-md grid grid-cols-1"
        action={async (formData) => {
          await createBookingwithData(formData);
          resetRange()
        }}>
        <div>
          <textarea name="observations" id="observations" className="h-60 mt-4 px-5 py-6 bg-gray-00 text-black font-bold w-full shadow-sm rounded-sm"
            placeholder="Anything else we should know about before your arrival such as Any allergies, special requirements?"
          >
          </textarea>
        </div>
        <div className="flex flex-col-reverse justify-end">
          <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
        </div>

      </form>
    </div>
  )
}