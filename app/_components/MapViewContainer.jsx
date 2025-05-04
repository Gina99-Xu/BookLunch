import RestaurantMiniList from "./RestaurantMiniList";
import { LazyMap } from "./LazyMap";


export default function MapViewContainer({ restaurants }) {

  return (
    <div className='grid grid-cols-4 gap-4 h-[calc(100vh-180px)] relative'>
      <RestaurantMiniList restaurants={restaurants} />
      <div className="col-span-3 relative">
        <LazyMap />
      </div>
    </div>
  )
}