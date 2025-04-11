import { getRestaurants } from '../_lib/data-service';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';
import Spinner from '../_components/Spinner';
import MapViewContainer from '../_components/MapViewContainer';
import RestaurantListContainer from '../_components/RestaurantListContainer';
import SearchFilterContainer from '../_components/SearchFilterContainer';
import ToggleView from '../_components/ToggleView';
import ErrorComponent from '../_components/ErrorComponent';

export default async function Page({ searchParams }) {

  const { data: restaurants, error } = await getRestaurants();
  const params = await searchParams;
  const { search: searchValue, country: countryParam, minimum: minimumParam } = params;
  let filteredRestaurants = restaurants || [];

  if (restaurants && restaurants.length > 0) {
    if (searchValue || countryParam || minimumParam) {
      filteredRestaurants = restaurants.filter(restaurant => {
        const matchesCuisine = !searchValue || restaurant.cuisine === searchValue;
        const matchesCountry = !countryParam || restaurant.country === countryParam;
        const matchesMinimum = !minimumParam || restaurant.minimum <= parseInt(minimumParam, 10);
        return matchesCuisine && matchesCountry && matchesMinimum;
      });
    }
  }

  if(error) {
    return (
   <ErrorComponent error={error} />
    )
   }

  if (restaurants.length === 0) return (
    <div className="text-center py-12">
      <p className="text-gray-600 max-w-md mx-auto text-xl">No restaurants found</p>
    </div>
  )


  return (
    <div className='container mx-auto px-4'>
      <div className='mt-4'>
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <ChevronRightIcon className="w-4 h-4" />
          <span className="text-gray-900">Restaurants</span>
        </nav>
      </div>
      <Suspense fallback={<Spinner />}>
        <SearchFilterContainer />
        <ToggleView>
          <MapViewContainer restaurants={filteredRestaurants} />
          <RestaurantListContainer restaurants={filteredRestaurants} />
        </ToggleView>
      </Suspense>
    </div>
  );
}