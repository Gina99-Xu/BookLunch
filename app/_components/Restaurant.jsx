import { EyeSlashIcon, MapPinIcon, UsersIcon, CurrencyDollarIcon, ClockIcon, StarIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "./TextExpander";

export default function Restaurant({ restaurant }) {
  const { id, description, maxCapacity, regularPrice, discount, image, name, ratings, cuisine, address } = restaurant;

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-4/3 md:aspect-auto">
          <Image
            src={image}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            alt={`restaurant ${name}`}
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {name}
            </h1>
            <div className="flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
              <StarIcon className="h-5 w-5" />
              <span className="font-semibold">{ratings}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-gray-500 mb-6">
            <BuildingStorefrontIcon className="h-5 w-5" />
            <span className="font-medium">{cuisine} Cuisine</span>
          </div>

          <p className="text-gray-600 text-lg mb-8">
            <TextExpander>{description}</TextExpander>
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <UsersIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="font-semibold">{maxCapacity} people</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Minimum Spent</p>
                <div className="flex items-baseline gap-2">
                  <span className="font-semibold">${regularPrice - discount}</span>
                  {discount > 0 && (
                    <span className="line-through text-sm text-red-500">${regularPrice}</span>
                  )}
                  <span className="text-sm text-gray-500">per person</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 mt-auto">
            <MapPinIcon className="h-6 w-6 text-gray-400 flex-shrink-0 mt-1" />
            <p className="text-gray-600">{address}</p>
          </div>
        </div>
      </div>
    </div>
  );
}