'use client'

import Image from "next/image";
import { useCityPosition } from "./CityPositionContext";

export default function RestaurantMiniListItem({ restaurant }) {
  const { setLongtitude, setLatitude } = useCityPosition();

  return (
    <div className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
      <button
        onClick={() => {
          setLongtitude(() => restaurant.longtitude)
          setLatitude(() => restaurant.latitude)
        }}
        className="w-full flex flex-col sm:flex-row items-start gap-4 hover:bg-slate-100 p-2 rounded-md transition-colors text-left"
      >
        <div className="relative w-full sm:w-24 h-40 sm:h-24 flex-shrink-0">
          <Image 
            className="rounded-md object-cover"
            src={restaurant.image} 
            fill
            sizes="(max-width: 768px) 100px, 96px"
            alt={restaurant.name} 
          />
        </div>
        
        <div className="flex flex-col w-full">
          <h4 className="font-medium text-gray-800 text-lg">{restaurant.name}</h4>
          <div className="text-sm text-gray-600 space-y-1 mt-1">
            <p><span className="text-gray-500">Country:</span> {restaurant.country}</p>
            <p><span className="text-gray-500">Min. Spent:</span> ${restaurant.minimum}</p>
            <p><span className="text-gray-500">Cuisine:</span> {restaurant.cuisine}</p>
            <p className="flex items-center">
              <span className="text-gray-500 mr-1">Rating:</span>
              <span className="text-yellow-500">{restaurant.ratings} ★</span>
            </p>
          </div>
        </div>
      </button>
    </div>
  )
}