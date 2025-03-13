import SubmitButton from "@/app/_components/SubmitButton";
import { updateBooking } from "@/app/_lib/actions";
import { getBooking, getProperty } from "@/app/_lib/data-service";


export default async function Page({ params }) {
  const { bookingId } = await params;
  const { numGuests, observations, propertyId } = await getBooking(bookingId);
  const { maxCapacity } = await getProperty(propertyId)

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Reservations #{bookingId}
      </h2>
      <form className="text-black py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateBooking}
      >
        <input type="hidden" value={bookingId} name='bookingId' />
        <div className="space-y-2 space-x-4 flex justify-between">
          <label htmlFor="numGuests">How many guests?</label>
          <select name="numGuests"
            id="numGuests"
            defaultValue={numGuests}
            required
            className="px-5 py-3 bg-primary-200 text-black">
            <option value='' key=''>Select number of guests</option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map(x =>
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label>Anything we should know about your stay?</label>
          <textarea
            defaultValue={observations}
            name="observations"
            className="px-5 py-3 bg-primary-200 w-full shadow-sm rounded-sm"
          />
        </div>
        <div className="flex justify-end items-center gap-6">
          <SubmitButton pendingLabel="Updating...">Update Reservation</SubmitButton>
        </div>
      </form>
    </div>
  )
}