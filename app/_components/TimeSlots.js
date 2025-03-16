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
    <div className='flex flex-col gap-2'>
      <div className="grid grid-cols-3 gap-3 mt-2">
        {timeSlots.map((timeslot, index) =>
          <div className={`text-black text-sm justify-center flex flex-row px-3 py-3 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75
          ${timeslot === selectedTime ? 'bg-slate-300' : ''}`}
            key={timeslot}>
            <button
              className='px-1 py-1 font-semibold'
              onClick={() => handleSelectedTime(timeslot)}
            >{timeslot}</button>
          </div>)}
      </div>
    </div >
  )
}