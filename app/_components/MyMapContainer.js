
import { getProperties } from "../_lib/data-service";
import CitiesList from "./CitiesList";
import { LazyMap } from "./LazyMap";

export default async function MyMapContainer({ properties, searchParams }) {

  // const properties = await getProperties();
  const filter = await searchParams;

  console.log(filter);

  let filteredProperties = [];
  const filterCountry = filter.country;
  const filterMinimum = filter.minimum;
  const filterCuisine = filter.cuisine;

  console.log('filtercountry', filterCountry);
  console.log('filtermini', filterMinimum);
  console.log('filtercuisine'.filterCuisine);


  if (Object.keys(filter).length === 0) {
    console.log('inisde undefined filter');
    filteredProperties = properties;
  } else {
    if (filterCuisine !== undefined) {
      console.log('2');
      filteredProperties = properties.filter(property => property.cuisine === filterCuisine);
    } else if (filterCountry !== undefined) {
      console.log('3');
      filteredProperties = properties.filter(property => property.country === filterCountry);
    } else if (filterMinimum !== undefined) {
      console.log('4');
      filteredProperties = properties.filter(property => property.minimum === filterMinimum);
    } else {
      filteredProperties = properties.filter(property => property.minimum === filterMinimum
        && property.country === filterCountry && property.cuisine >= filterCuisine
      );
    }
  }

  return (
    <div className='grid grid-cols-4 gap-4 h-screen'>
      <CitiesList properties={filteredProperties} />
      <LazyMap />
    </div>
  )
}