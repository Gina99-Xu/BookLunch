'use client'
import CitiesListItem from "./CityListItem";

export default function CitiesList({ properties }) {
  return (
    <div className="overflow-y-scroll scroll-smooth">
      <div className="flex flex-col gap-4 border rounded-md border-slate-300 py-4 px-6
    ">
        <h3 className="font-[550] text-xl"> Search Results: <span className="text-yellow-600">{properties.length}</span> Restaurants</h3>
        <div>
          {properties && properties.map((property, index) =>
            <CitiesListItem city={property} key={index} />
          )
          }
        </div>
      </div >
    </div>

  )
}