
import CountryDropDownFilter from '../_components/CountryDropDownFilter';
import MyMapContainer from '../_components/MyMapContainer';
import SearchBox from '../_components/SearchBox';
import CuisineDropDownFilter from '../_components/MinimumSpentFilter';
import MinimumSpentFilter from '../_components/MinimumSpentFilter';
import ToggleView from '../_components/ToggleView';
import { getProperties } from '../_lib/data-service';
import Loading from '../loading';
import MapContainerWrapper from '../_components/MapContainerWrapper';
import PropertyList from '../_components/PropertyList';

export default async function Page({ searchParams }) {

  const properties = await getProperties();
  console.log(properties)
  return (
    <div>
      <SearchBox />
      <div className='flex flex-row gap-4 items-center justify-center '>
        <CountryDropDownFilter />
        <MinimumSpentFilter />
      </div>
      <ToggleView>
        <MyMapContainer properties={properties} searchParams={searchParams} />
        <PropertyList  properties={properties}  searchParams={searchParams} />
      </ToggleView>
    </div>
  )
}