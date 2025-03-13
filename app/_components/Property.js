import { EyeSlashIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import TextExpander from "./TextExpander";

export default function Property({ property }) {

  const { id, description, maxCapacity, regularPrice, discount, image, name } =
    property;

  return (
    <div className="grid grid-cols-2 gap-20 border border-slate-300 rounded-md py-8 px-10 mb-24">
      <div className="relative">
        <Image
          src={image}
          height={600}
          width={600}
          sizes=""
          alt={`Property ${id}`}
          className="rounded-md"
        />
      </div>

      <div>
        <h3 className=" text-black text-5xl mb-5 pb-1 font-bold">
          {name}
        </h3>

        <p className="text-lg text-black mb-10">
          <TextExpander>{description}</TextExpander>
        </p>

        <ul className="flex flex-col gap-4 mb-7">
          <li className="flex gap-3 items-center">
            <UsersIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              <span className="font-bold">${property.discount}</span>
              {''} discount for minimum spent of <span className="font-bold">${property.regularPrice}</span> per meal
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <MapPinIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Located at {" "}
              <span className="font-bold">{property.address}</span>
            </span>
          </li>
          <li className="flex gap-3 items-center">
            <EyeSlashIcon className="h-5 w-5 text-primary-600" />
            <span className="text-lg">
              Ratings <span className="font-bold">{property.ratings}</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  )

}