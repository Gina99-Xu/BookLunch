import Property from "@/app/_components/Property";
import Spinner from "@/app/_components/Spinner";
import { getProperty } from "@/app/_lib/data-service";
import { Suspense } from "react";
import Reservation from '@/app/_components/Reservation'

export default async function Page({ params }) {

  const { propertyId } = await params;
  const property = await getProperty(propertyId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Property property={property} />
      <div>
        <h4 className="text-3xl font-semibold text-center mb-10 text-black">
          Reserve Today & Pay Later
        </h4>
        <Suspense fallback={<Spinner />}>
          <Reservation property={property} />
        </Suspense>
      </div>
    </div>)
}