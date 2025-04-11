'use client'
import RestaurantMiniListItem from "./RestaurantMiniListItem";

export default function RestaurantMiniList({ restaurants }) {
  return (
    restaurants && restaurants.length > 0 ? (
      <div className="h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] lg:max-h-[calc(100vh-6rem)] overflow-y-auto overflow-x-hidden">
        <div className="bg-white border rounded-lg border-slate-200 p-3 sm:p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg text-gray-800">
              Search Results
            </h3>
            <span className="px-2 py-1.5 bg-blue-50 text-blue-600 text-sm font-medium rounded-md">
              {restaurants.length} Found
            </span>
          </div>

          <div className="space-y-3">
            {restaurants.map((restaurant, index) => (
              <RestaurantMiniListItem restaurant={restaurant} key={restaurant.id || index} />
            ))}
          </div>
        </div>
      </div>
    ) : (
      <div className="text-gray-500 text-center py-6">
        <p className="text-base">No restaurants found</p>
        <p className="text-sm text-gray-400 mt-1">Try adjusting your search criteria</p>
      </div>
    )
  );
}