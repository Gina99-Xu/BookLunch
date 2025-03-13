import { UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
export default function PropertyCard({ property }) {
  const { address, city, id, description, maxCapacity, regularPrice, discount, image, name } = property;

  return (
    <div className="border rounded-md border-slate-300 p-4">
      <div className="">
        <Image
          src={image}
          height={400}
          width={400}
          alt={`Property ${id}`}
          className="object-cover rounded-md"
        />
      </div>
      <div>
        <p className="text-lg font-semibold text-black py-2">
          <span>{name}</span>
        </p>
        <p className=" text-black font-[280]">
          <span>Address: {''}{address}</span>
        </p>
      </div>
      <div className="flex gap-2 items-center py-4">
        <p className="flex gap-3 justify-end items-baseline">
          {discount > 0 ? (
            <>
              <span className="text-xl font-[650]">
                Minimum spent:{''} ${regularPrice - discount}
              </span>
              <span className="line-through text-xl font-bold text-red-500">
                ${regularPrice}
              </span>
            </>
          ) : (
            <span className="text-1xl font-bold">Minimum spent: ${regularPrice}</span>
          )}
          <span className=" text-black">/ Person</span>
        </p>
      </div>
      <div className="font-[350] flex justify-end">
        <Link href={`/properties/${id}`}>
          Details and more &rarr;
        </Link>
      </div>
    </div>
  )
}

