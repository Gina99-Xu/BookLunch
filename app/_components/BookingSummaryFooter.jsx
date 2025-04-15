import { CircleDollarSign } from "lucide-react";
import { useReservation } from "./ReservationContext";

export function BookingSummaryFooter({ restaurant }) {
  const { selectedDate, resetDate, resetTime } = useReservation();
  const { discount, regularPrice } = restaurant;

  function resetAll() {
    resetDate();
    resetTime();
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-50 rounded-lg">
            <CircleDollarSign className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Expected Minimum Spent</p>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-semibold text-gray-900">
                ${regularPrice - discount}
              </span>
              {discount > 0 && (
                <span className="text-sm line-through text-red-500">
                  ${regularPrice}
                </span>
              )}
              <span className="text-sm text-gray-500">per person</span>
            </div>
          </div>
        </div>

        {selectedDate && (
          <button
            onClick={resetAll}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
          >
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
}