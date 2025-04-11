'use client'

import "react-day-picker/dist/style.css";
import { DayPicker } from "react-day-picker";
import { useReservation } from "./ReservationContext";
import { TimeSlots } from "./TimeSlots";
import { BookingSummaryFooter } from "./BookingSummaryFooter";
import "../_styles/globals.css";
import { AlarmClockCheck, Calendar1 } from 'lucide-react';


export default function DateSelector({ restaurant }) {
  const { selectedDate, setSelectedDate } = useReservation();

  return (
    <div className="bg-white p-6 md:p-8">
      {/* Date Selection */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Calendar1 className="h-5 w-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
        </div>
        <div className="flex justify-center">
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            required
            className="custom-day-picker bg-gray-50 p-3 rounded-lg"
            classNames={{
              day: 'text-sm p-2 hover:bg-amber-50 rounded-md',
              selected: 'bg-amber-100 text-amber-900 font-semibold',
              today: 'text-amber-600 font-semibold',
              disabled: 'text-gray-300',
            }}
            modifiers={{
              disabled: { before: new Date() },
            }}
          />
        </div>
      </div>

      {/* Time Selection */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <AlarmClockCheck className="h-5 w-5 text-amber-600" />
          <h3 className="text-lg font-semibold text-gray-900">Select Time</h3>
        </div>
        <TimeSlots />
      </div>

      {/* Summary Footer */}
      <BookingSummaryFooter restaurant={restaurant} />
    </div>
  );
}
