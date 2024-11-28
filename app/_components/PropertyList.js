
import PropertyCard from "./PropertyCard";

function PropertyList({ properties, filter }) {

  /**Filter logic */
  let filterProperties;
  if (filter === 'all') filterProperties = properties;
  if (filter === 'small') filterProperties = properties.filter((p) => p.maxCapacity <= 3)
  if (filter === 'medium') filterProperties = properties.filter(p => p.maxCapacity <= 5)
  if (filter === 'large') filterProperties = properties.filter(p => p.maxCapacity >= 6)

  return (
    <div className="grid grid-cols-3 gap-5">
      {filterProperties.map((property) =>
        <PropertyCard property={property} key={property.id} />
      )}

    </div>)
}

export default PropertyList;