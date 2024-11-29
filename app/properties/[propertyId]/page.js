import Property from "@/app/_components/Property";
import Spinner from "@/app/_components/Spinner";
import { getProperty } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Reservation from '@/app/_components/Reservation'

export default async function Page({ params }) {

  const property = await getProperty(params.propertyId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Property property={property} />
      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-black">
          Reserve {property.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation property={property} />
        </Suspense>
      </div>
    </div>)
}