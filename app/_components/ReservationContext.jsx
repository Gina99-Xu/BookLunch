'use client'
import { createContext, useContext, useState } from "react";

const ReservationContext = createContext();
const initialDate = new Date();
const initalTime = "";

function ReservationProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTime, setSelectedTime] = useState(initalTime);
  const resetDate = () => setSelectedDate(initialDate)
  const resetTime = () => setSelectedTime(initalTime)



  return (
    <ReservationContext.Provider value={{ selectedDate, setSelectedDate, selectedTime, setSelectedTime, resetDate, resetTime }}>
      {children}</ReservationContext.Provider>
  )
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (context === undefined)
    throw new Error('Context was undefined')

  return context

}

export { ReservationProvider, useReservation }