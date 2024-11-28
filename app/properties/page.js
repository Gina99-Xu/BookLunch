import { Suspense } from "react"
import Spinner from "../_components/Spinner"
import PropertyList from '../_components/PropertyList'
import { getProperties } from "../_lib/data-service";
import PropertyCard from "../_components/PropertyCard";
import { Filter } from "../_components/Filter";

export const metadata = {
  title:
    "Properties"
}

export default async function Page({ searchParams }) {

  const properlist = await getProperties();
  const filter = searchParams?.capacity ?? 'all'
  return (
    <div>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      {properlist.length > 0 && <PropertyList properties={properlist} filter={filter} />}
    </div>

  )
}
