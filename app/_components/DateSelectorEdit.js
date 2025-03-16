import { DayPicker } from "react-day-picker"
import { TimeSlots } from "./TimeSlots";

function DateSelectorEdit({defaultDate, selectedTime }) {

  const [selectedDay, setSelectedDay] = useState(defaultDate);

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };


  return (
    <div>
        <DayPicker
          mode="single"
          selected={selectedDay}
          onSelect={handleDayClick}
          disabled={isPastDate} // Disable past dates
        />
        <TimeSlots selectedTime={selectedTime} />
    </div>
  )
}

export default DateSelectorEdit
