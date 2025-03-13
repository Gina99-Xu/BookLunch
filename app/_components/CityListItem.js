'use client'

import Image from "next/image";
import { useCityPosition } from "./CityPositionContext";

export default function CitiesListItem({ city }) {
  const { setLongtitude, setLatitude } = useCityPosition();

  return (
    <>
      <Image className="rounded-md" src={city.image} width="300" height="300" alt={city.name} />
      <div className="flex">
        <button
          onClick={() => {
            setLongtitude(() => city.longtitude)
            setLatitude(() => city.latitude)
          }}>

          <div className="flex flex-col justify-start items-center mb-2">
            <div><span className="font-bold">{city.name}</span></div>
            <div><span>Country: {city.country}</span></div>
            <div><span>Ratings: {city.ratings}</span></div>
          </div>
        </button>
      </div >
    </>
  )
}