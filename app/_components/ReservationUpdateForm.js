'use client'

import { useReservation } from "./ReservationContext"
import SubmitButton from "./SubmitButton";
import { updateBooking } from "../_lib/actions";
import { useTable } from "./TableContext";
import Seating from "./Seatings";
import DateSelector from "./DateSelector";


export default function ReservationUpdateForm({ restaurant, bookingId }) {

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
    selectedTableSeat,
    id: bookingId,
  }

  return (
    <div className="border-l-2 flex flex-col gap-8 bg-stale-200 px-4 py-4">
      <DateSelector
        restaurant={restaurant}
      />
      <Seating />
      <form className="flex-grow px-4 text-md grid grid-cols-1"
        action={async (formData) => {
          const observations = formData.get("observations");
          const mergedData = { ...bookingData, observations };
          await updateBooking(mergedData);
        }}>
        <div>
          <textarea name="observations" id="observations" className="border h-60 mt-4 px-5 py-6 bg-gray-00 text-black font-bold w-full shadow-sm rounded-sm"
            placeholder="Anything else we should know about before your arrival such as Any allergies, special requirements?"
          >
          </textarea>
        </div>
        <div className="flex flex-col-reverse justify-end">
          <SubmitButton pendingLabel="Reserving...">Update Now</SubmitButton>
        </div>

      </form>
    </div>
  )
}