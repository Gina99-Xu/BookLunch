'use client'
import { createContext, useContext, useState } from "react";

const CityPositionContext = createContext();

function CityPositionProvider({ children }) {
  const [latitude, setLatitude] = useState(1.3521);
  const [longtitude, setLongtitude] = useState(103.82);


  return (
    <CityPositionContext.Provider value={{ latitude, longtitude, setLatitude, setLongtitude }}>
      {children}</CityPositionContext.Provider>
  )
}

function useCityPosition() {
  const context = useContext(CityPositionContext);
  if (context === undefined)
    throw new Error('Context was undefined')

  return context

}

export { CityPositionProvider, useCityPosition }