import Restaurant from "@/app/_components/Restaurant";
import Spinner from "@/app/_components/Spinner";
import { getRestaurant } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Reservation from '@/app/_components/Reservation'

export default async function Page({ params }) {

  const { restaurantId } = await params;
  const restaurant = await getRestaurant(restaurantId);

  return (
    <div className="mx-auto min-h-screen">
      <Restaurant restaurant={restaurant} />
      <div>
        <h4 className="text-2xl font-semibold text-center pb-20 text-black">
          Book Now & Pay Later
        </h4>
        <Suspense fallback={<Spinner />}>
          <Reservation restaurant={restaurant} />
        </Suspense>
      </div>
    </div>)
}