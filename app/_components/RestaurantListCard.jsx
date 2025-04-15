import Image from "next/image";
import Link from "next/link";

export default function RestaurantListCard({ restaurant }) {
  const { address, city, id, description, maxCapacity, regularPrice, discount, image, name } = restaurant;

  return (
    <div className="bg-white border rounded-lg border-slate-200 overflow-hidden shadow-md hover:shadow-md transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={image}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={`${name} restaurant`}
          className="object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">
          {address}
        </p>
        
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div >
            {discount > 0 ? (
              <div>
                <span className="text-xl font-bold text-gray-900 mr-2">
                  ${regularPrice - discount}
                </span>
                <span className="line-through text-sm text-red-500">
                  ${regularPrice}
                </span>
              </div>
            ) : (
              <span className="text-lg font-medium text-gray-900">${regularPrice}</span>
            )}
            <span className="text-sm text-gray-500">min. per person</span>
          </div>
          
          <Link 
            href={`/restaurants/${id}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 flex items-center"
          >
            View details <span className="ml-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

