import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
export default function PropertyCard({ property }) {
  const { id, description, maxCapacity, regularPrice, discount, image } = property;

  return (
    <div className=" border border-primary-800 p-4">
      <div className="">
        <Image
          src={image}
          height={400}
          width={400}
          alt={`Property ${id}`}
          className="object-cover border-r border-primary-800"
        />
      </div>
      <div>
        <p className="text-lg text-primary-200">
          For up to <span className="font-bold">{maxCapacity}</span> guests
        </p>
      </div>
      <div className="flex gap-3 items-center mb-2">
        <p className="flex gap-3 justify-end items-baseline">
          {discount > 0 ? (
            <>
              <span className="text-2xl font-[250]">
                ${regularPrice - discount}
              </span>
              <span className="line-through font-semibold text-primary-600">
                ${regularPrice}
              </span>
            </>
          ) : (
            <span className="text-2xl font-[250]">${regularPrice}</span>
          )}
          <span className="text-primary-200">/ night</span>
        </p>
      </div>
      <div>
        <Link href={`/properties/${id}`}>
          Details and Reservations &rarr;
        </Link>
      </div>
    </div>
  )
}

