
import RestaurantCard from "./RestaurantCard";

export default async function RestaurantList({ restaurants, searchParams }) {

  const filter = await searchParams;

  console.log('filter is ', filter);

  let filteredRestaurants = [];
  const filterCountry = filter.country;
  const filterMinimum = filter.minimum;
  const filterCuisine = filter.cuisine;

  console.log('filtercountry', filterCountry);
  console.log('filtermini', filterMinimum);
  console.log('filtercuisine'.filterCuisine);


  if (Object.keys(filter).length === 0) {
    console.log('inisde undefined filter');
    filteredRestaurants = restaurants;
  } else {
    if (filterCuisine !== undefined) {
      console.log('2');
      filteredRestaurants = restaurants.filter(restaurant => restaurant.cuisine === filterCuisine);
    } else if (filterCountry !== undefined) {
      console.log('3');
      filteredRestaurants = restaurants.filter(restaurant => restaurant.country === filterCountry);
    } else if (filterMinimum !== undefined) {
      console.log('4');
      filteredRestaurants = restaurants.filter(restaurant => restaurant.minimum === filterMinimum);
    } else {
      filteredRestaurants = restaurants.filter(restaurant => restaurant.minimum === filterMinimum
        && restaurant.country === filterCountry && restaurant.cuisine >= filterCuisine
      );
    }
  }


  return (
    <div className="grid grid-cols-3 gap-5">
      {filteredRestaurants && filteredRestaurants.map((restaurant) =>
        <RestaurantCard restaurant={restaurant} key={restaurant.id} />
      )}
    </div>)
}
