const { getSettings, getBookedDatesByPropertyId } = require("../_lib/data-service");
import { auth } from "../_lib/auth";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ restaurant }) {
  const session = await auth();

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <DateSelector restaurant={restaurant} />
        <div className="border-t md:border-t-0 md:border-l border-gray-200">
          {session?.user ? (
            <ReservationForm restaurant={restaurant} user={session.user} />
          ) : (
            <LoginMessage />
          )}
        </div>
      </div>
    </div>
  );
}

export default Reservation;