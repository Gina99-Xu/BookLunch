'use client'

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { getProperties } from "../_lib/data-service";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import HowItWorks from "./HowItWorks";

export default function HomepageMap() {

  const [properties, setProperties] = useState([]);
  const markerRefs = useRef([])

  useEffect(() => {
    async function getResult() {
      const result = await getProperties();
      if (result !== null && result !== undefined) {
        setProperties(result);
      }
    }
    getResult();
  }, [])


  useEffect(() => {
    if (markerRefs.current.length > 0) {
      markerRefs.current.array.forEach(marker => {
        if (marker) {
          marker.openPopup();
        }
      });
    }
  }, [properties])

  function PopupDisplay({ property }) {
    return (
      <div>
        <Image src={property.image} width={300} height={100} alt='' />
        <div className="bg-inherit flex flex-col gap-2">
          <span>{property.name} - {property.city}</span>
          <span>Address: {property.address}</span>
        </div>
      </div>

    )
  }

  if (typeof window !== 'undefined' && properties !== null) {
    return (
      <div className="h-full w-full position-relative">
        <h1 className="text-orange-600 text-2xl mb-2 font-bold text-center">
          Total of <span className="text-3xl">{properties.length}</span> Restuarants we worked with across East Asia
        </h1>
        <MapContainer center={[-37.8439, 144.982]} zoom={4} scrollWheelZoom={true}
          className="h-full bg-gray-300 outline-none"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {
            properties.map(property =>
              <Marker
                position={[property.latitude, property.longtitude
                ]} key={property.name}>
                <Popup className="custom-popup bg-gray-100 border-2 rounded-lg p-4 w-96 h-96 shadow-lg">
                  <PopupDisplay property={property} />
                </Popup>
                {/* <ChangeCenter position={[latitude, longtitude]} /> */}
              </Marker>)
          }
        </MapContainer >
        <div>
          <h1 className="text-orange-600 text-2xl mt-4 mb-2 font-bold text-center">
            How it Works?
          </h1>
          <HowItWorks />
        </div>
      </div>
    )
  }
}
