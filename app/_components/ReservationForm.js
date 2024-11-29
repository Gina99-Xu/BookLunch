'use client'

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationContext"
import SubmitButton from "./SubmitButton";


export default function ReservationForm({ property, user }) {

  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = property;

  const startDate = range.form;
  const endDate = range.to;

  const numNights = differenceInDays(endDate, startDate);
  const propertyPrice = numNights * (regularPrice - discount);



  return (
    <div className="grid grid-cols-1">
      <div className="bg-primary-800 text-primary-300 px-4 py-2 grid grid-cols-1">
        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>Logged in : {user.name}</p>
        </div>
      </div>
      <form className="bg-primary-500 py-10 px-16 text-lg gap-2">
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select name="numGuests" id="numGuests"
            className="px-5 py-3 bg-primary-200 text-black w-full shadow-sm rounded-sm">
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(x =>
              <option key={x} value={x}>{x} {x == 1 ? 'guest' : 'guests'}</option>)}
          </select>
        </div>


        <div className="space-y-2">
          <label htmlFor="observations">Anything else we should know about your stay?</label>
          <textarea name="observations" id="observations" className="px-5 py-3 bg-primary-200 text-black w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements?"
          >
          </textarea>
        </div>
        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <SubmitButton pendingLabel="Reserving...">Reserve now</SubmitButton>
          )}
        </div>
      </form>

    </div>
  )
}