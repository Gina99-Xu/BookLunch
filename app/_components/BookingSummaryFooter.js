import { useReservation } from "./ReservationContext";
import { useTable } from "./TableContext";

export function BookingSummaryFooter({ restaurant }) {

  const { selectedDate, resetDate, resetTime, selectedTime } = useReservation();

  const { discount, regularPrice } = restaurant;

  function resetAll() {
    console.log('click')
    resetDate();
    resetTime()
  }


  return (
    <div className="rounded-md flex items-center justify-between py-4 px-4 bg-gray-200  text-black font-bold mb-2">
      <div className="flex items-baseline gap-6">
        <p className="flex gap-2">
          {discount > 0 ? (
            <>
              <span className="text-1xl">Expected Minimum Spent: ${regularPrice - discount}</span>
              <span className="line-through font-semibold text-primary-700">
                ${regularPrice}
              </span>
            </>
          ) : (
            <span className="text-2xl">${regularPrice}</span>
          )}
          <span className="">/person</span>
        </p>
      </div>

      {selectedDate ? (
        <button
          onClick={resetAll}
          className="rounded-md px-6 py-2 text-sm font-semibold bg-white  hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-75"
        >
          Clear
        </button>
      ) : null}
    </div>
  )
}