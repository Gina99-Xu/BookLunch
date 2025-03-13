import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export default async function Page() {

  const session = await auth();
  const bookings = await getBookings(session.user.userId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      {bookings.length === 0 ? <p>You have no reservations ye! Start booking today!</p> :
        <ReservationList bookings={bookings} />}
    </div>
  )
}