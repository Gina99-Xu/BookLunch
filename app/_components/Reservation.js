const { getSettings, getBookedDatesByPropertyId } = require("../_lib/data-service");
import { auth } from "../_lib/auth";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ property }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByPropertyId(property.id)
  ])

  const session = await auth();


  return (
    <div className="flex flex-row border border-primary-200 ">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        property={property}
      />
      {session?.user ? <ReservationForm property={property} user={session.user} /> : <LoginMessage />}

    </div>
  )

}

export default Reservation;