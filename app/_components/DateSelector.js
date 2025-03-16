'use client'


import "react-day-picker/dist/style.css";
import { timeSlots } from "../_lib/utils";
import { DayPicker } from "react-day-picker";
import { useReservation } from "./ReservationContext";
import { TimeSlots } from "./TimeSlots";
import { BookingSummaryFooter } from "./BookingSummaryFooter";
import "../_styles/globals.css";

export default function DateSelector({ restaurant }) {

  const { selectedDate, setSelectedDate, resetDate, resetTime } = useReservation();
  const { discount, regularPrice } = restaurant;
  console.log(selectedDate)
  function resetAll() {
    console.log('click')
    resetDate();
    resetTime()
  }


  return (
    <div className="flex flex-col gap-10 px-4 py-4 justify-between">
      <div className="flex justify-center">
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          required
          className="custom-day-picker"
          classNames={{
            today: `text-black`,
            selected: `bg-slate-300 border-gray-400 text-black`,
          }}
        />
      </div>
      <TimeSlots />
      <BookingSummaryFooter property={restaurant} />
    </div >

  )
}
