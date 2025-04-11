import Restaurant from "@/app/_components/Restaurant";
import Spinner from "@/app/_components/Spinner";
import { getRestaurant } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Reservation from '@/app/_components/Reservation';
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import ErrorComponent from "@/app/_components/ErrorComponent";

export default async function Page({ params }) {
  const { restaurantId } = await params;
  const { data: restaurant, error } = await getRestaurant(restaurantId);

 if(error) {
  return (
 <ErrorComponent error={error} />
  )
 }

  return (
    <div className="container mx-auto px-4 sm:px-4 max-w-5xl py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">Home</Link>
        <ChevronRightIcon className="w-4 h-4" />
        <Link href="/restaurants" className="hover:text-gray-700">Restaurants</Link>
        <ChevronRightIcon className="w-4 h-4" />
        <span className="text-gray-900">{restaurant.name}</span>
      </nav>

      <Restaurant restaurant={restaurant} />
      <div className="mt-16">
        <h4 className="text-3xl font-bold text-center mb-12 text-gray-900">
          Book Now & Pay Later
        </h4>
        <Suspense fallback={<Spinner />}>
          <Reservation restaurant={restaurant} />
        </Suspense>
      </div>
    </div>
  );
}