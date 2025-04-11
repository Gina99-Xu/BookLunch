
import ReservationUpdateForm from "@/app/_components/ReservationUpdateForm";
import { getBooking, getRestaurant } from "@/app/_lib/data-service";


export default async function Page({ params }) {
  console.log('inside edit reservation page params', params);
  const { id } =  await params;
  const { restaurantId } = await getBooking(id);
  const restaurant = await getRestaurant(restaurantId);

  return (
    <div>
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Edit Booking #{id}
      </h2>

      < ReservationUpdateForm restaurant={restaurant} bookingId={id} />
    </div >
  )
}