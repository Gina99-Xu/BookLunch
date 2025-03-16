const { getSettings, getBookedDatesByPropertyId } = require("../_lib/data-service");
import { auth } from "../_lib/auth";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ restaurant }) {

  const session = await auth();

  return (
    <div className="grid grid-cols-2 border rounded-md border-slate-300">
      <DateSelector
        restaurant={restaurant}
      />
      {session?.user ? <ReservationForm restaurant={restaurant} user={session.user} /> : <LoginMessage />}
    </div>
  )
}

export default Reservation;