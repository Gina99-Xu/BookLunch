'use client'

import { DayPicker } from "react-day-picker";
import { useReservation } from "./ReservationContext";
import { differenceInDays, isWithinInterval } from "date-fns";
import "react-day-picker/dist/style.css";
function isAlreadyBooked(range, datesArr) {
  return (
    range.from &&
    range.to &&
    datesArr.some(date => isWithinInterval(date, { start: range.from, end: range.to })
    ))
}
export default function DateSelector({ settings, property, bookedDates }) {

  const { range, setRange, resetRange } = useReservation();

  const displayRange = isAlreadyBooked(range, bookedDates) ? {} : range

  const { regularPrice, discount } = property;
  const numNights = differenceInDays(displayRange.to, displayRange.from);
  const propertyPrice = numNights * (regularPrice - discount);

  const { minBookingLength, maxBookingLength } = settings;

  return (
    <div className="py-4 px-4">
      <DayPicker
        mode="range"
        onSelect={setRange}
        selected={range}
        min={minBookingLength + 1}
        max={maxBookingLength}
        fromMonth={new Date()}
        fromDate={new Date()}
        toYear={new Date().getFullYear() + 5}
        numberOfMonths={2}

      />
    </div>
  )
}
