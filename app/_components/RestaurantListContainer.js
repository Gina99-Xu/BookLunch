import RestaurantListCard from "./RestaurantListCard";

export default function RestaurantListContainer({ restaurants }) {

  return (
    <div className="container mx-auto px-4 py-8">
      {restaurants && restaurants.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium text-gray-700">No restaurants found matching your criteria</h3>
          <p className="text-gray-500 mt-2">Try adjusting your filters or search terms</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants && restaurants.map((restaurant) => (
            <RestaurantListCard restaurant={restaurant} key={restaurant.id} />
          ))}
        </div>
      )}
    </div>
  );
}
