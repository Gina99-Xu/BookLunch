import CountryDropDownFilter from '../_components/CountryDropDownFilter';
import MyMapContainer from '../_components/MyMapContainer';
import SearchBox from '../_components/SearchBox';
import MinimumSpentFilter from '../_components/MinimumSpentFilter';
import ToggleView from '../_components/ToggleView';
import { getRestaurants } from '../_lib/data-service';
import RestaurantList from '../_components/RestaurantList';

export default async function Page({ searchParams }) {

  const restaurants = await getRestaurants();
  
  return (
    <div className='mx-auto'>
      <SearchBox />
      <div className='flex flex-row gap-4 items-center justify-center '>
        <CountryDropDownFilter />
        <MinimumSpentFilter />
      </div>
      <ToggleView className=''>
        <MyMapContainer properties={restaurants} searchParams={searchParams} />
        <RestaurantList restaurants={restaurants} searchParams={searchParams} />
      </ToggleView>
    </div>
  )
}