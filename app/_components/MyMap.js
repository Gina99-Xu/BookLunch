'use client'

import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import React, { useEffect, useState } from "react";
import { getProperties } from "../_lib/data-service";
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
      <>
        <Image src={property.image} width={300} height={100} alt='' />
        <div className="bg-inherit flex flex-col gap-2">
          <span>{property.name} - {property.city}</span>
          <span>Address: {property.address}</span>
          <button
            className="bg-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75
          border flex justify-center text-sm font-semibold px-4 py-4"
            onClick={() => router.push(`/properties/${property.id}`)}>View Details</button>
        </div>
      </>

    )
  }

  useEffect(() => {
    async function getResult() {
      const result = await getProperties();
      if (result !== null && result !== undefined && latitude !== undefined && longtitude !== undefined) {
        setProperties(result);
      }
    }
    getResult();
  }, [latitude, longtitude])

  useEffect(() => {
    if (latitude && longtitude)
      setPosition([latitude, longtitude])
  }, [latitude, longtitude, setPosition])


  if (typeof window !== 'undefined' && properties !== null & latitude !== null & longtitude !== null) {

    return (
      <div className="map-container">
        <MapContainer center={position} zoom={12} scrollWheelZoom={true} className="map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {
            properties.map(property =>
              <Marker
                position={[property.latitude, property.longtitude
                ]} key={property.name}>
                <Popup className="custom-popup bg-gray-100 border-2 rounded-lg p-4 w-96 h-96 shadow-lg">
                  <PopupDisplay property={property} />
                </Popup>
                <ChangeCenter position={[latitude, longtitude]} />
              </Marker>)
          }
        </MapContainer >
      </div>
    )
  }

}