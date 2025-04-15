import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";

export default async function Page() {

  const session = await auth();
  console.log('debug booking session is', session);
  const bookings = await getBookings(session.user.id);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>
      {bookings.length === 0 ? <div className="font-bold text-center text-2xl">No reservations found! Start Exploring Restaurants Now!</div> :
        <ReservationList bookings={bookings} />}
    </div>
  )
}