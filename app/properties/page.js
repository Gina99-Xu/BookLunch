import PropertyList from '../_components/PropertyList'
import { getProperties } from "../_lib/data-service";
import { Filter } from "../_components/Filter";

export const metadata = {
  title:
    "Properties"
}

export default async function Page({ searchParams }) {

  const properties = await getProperties();
  const filter = await searchParams;
  const filterResult = filter.country ?? 'Australia'

  const filteredProperties = properties.filter(property => property.country === filterResult);

  return (
    <div>
      <div className="flex justify-start mb-8">
        <h1 className="text-4xl mb-5 text-accent-600 font-semibold">
          Our Restaurant Selections
        </h1>
      </div>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {filteredProperties.length > 0 && <PropertyList properties={filteredProperties} filter={filterResult} />}
    </div>

  )
}
