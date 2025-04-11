'use client'

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import React, { useEffect, useState } from "react";
import { getRestaurants } from "../_lib/data-service";
import { useCityPosition } from "./CityPositionContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function MyMap() {
  const [position, setPosition] = useState([1.3521, 103.82]);
  const [properties, setProperties] = useState([]);
  const { latitude, longtitude, setLongtitude, setLatitude } = useCityPosition();
  const router = useRouter();

  function ChangeCenter({ position }) {
    const map = useMap();
    React.useEffect(() => {
      map.setView(position);
    }, [position, map])
    return null;
  }

  function PopupDisplay({ property }) {
    return (
      <div className="popup-container">
        <div className="relative w-full h-48">
          <Image 
            src={property.image} 
            fill
            className="object-cover rounded-t-lg"
            alt={property.name} 
          />
        </div>
        <div className="p-4 bg-white rounded-b-lg">
          <h3 className="text-lg font-semibold mb-2">{property.name}</h3>
          <p className="text-gray-600 mb-1">{property.city}</p>
          <p className="text-gray-600 text-sm mb-4">{property.address}</p>
          <button
            className="border border-amber-500 w-full hover:bg-amber-50 text-amber-600 rounded-md 
                      px-4 text-sm font-medium py-2 x-4


  "
            onClick={() => router.push(`/restaurants/${property.id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    )
  }

  useEffect(() => {
    async function getResult() {
      const result = await getRestaurants();
      if (result !== null && result !== undefined && latitude !== undefined && longtitude !== undefined) {
        setProperties(result.data);
      }
    }
    getResult();
  }, [latitude, longtitude])

  useEffect(() => {
    if (latitude && longtitude)
      setPosition([latitude, longtitude])
  }, [latitude, longtitude, setPosition])

  if (typeof window !== 'undefined' && properties !== null && latitude !== null && longtitude !== null) {
    return (
      <div className="col-start-2 col-end-6 relative w-full h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)]">
        <MapContainer 
          center={position} 
          zoom={12} 
          scrollWheelZoom={true} 
          className="h-full w-full rounded-lg shadow-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {properties && properties.map(property => (
            <Marker
              position={[property.latitude, property.longtitude]}
              key={property.name}
            >
              <Popup 
                className="custom-popup"
                maxWidth={320}
                minWidth={280}
              >
                <PopupDisplay property={property} />
              </Popup>
              <ChangeCenter position={[latitude, longtitude]} />
            </Marker>
          ))}
        </MapContainer>
      </div>
    )
  }
  return null;
}