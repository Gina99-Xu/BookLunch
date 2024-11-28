import Property from "@/app/_components/Property";
import { getProperty } from "@/app/_lib/data-service";

export default async function Page({ params }) {

  const property = await getProperty(params.propertyId);
  console.log(property)

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Property property={property} />
      <div>
        <h2>
          Reserve {property.id} today. Pay on Arrival
        </h2>

        <div>Date selectior</div>
      </div>
    </div>)
}