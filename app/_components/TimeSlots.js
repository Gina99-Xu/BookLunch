import { timeSlots } from "../_lib/utils";
import { useReservation } from "./ReservationContext";

export function TimeSlots({ selectedTimeParam = '' }) {
  const { selectedTime, setSelectedTime } = useReservation();

  function handleSelectedTime(timeslot) {
    if (selectedTimeParam === '') {
      setSelectedTime(timeslot);
    } else {
      setSelectedTime(selectedTimeParam);
    }
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {timeSlots.map((timeslot) => (
        <button
          key={timeslot}
          onClick={() => handleSelectedTime(timeslot)}
          className={`
            px-4 py-3 text-sm font-medium rounded-lg transition-colors
            ${timeslot === selectedTime
              ? 'bg-amber-100 text-amber-900 border-2 border-amber-200'
              : 'bg-gray-50 text-gray-700 hover:bg-amber-50'
            }
          `}
        >
          {timeslot}
        </button>
      ))}
    </div>
  );
}