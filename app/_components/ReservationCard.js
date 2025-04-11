import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, isPast, isToday, formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import DeleteReservation from "./DeleteReservation";
import Image from "next/image";


export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");


export default function ReservationCard({ booking, onDelete }) {

  const { selectedDate, selectedTime, regularPrice, discount, minimum, priceAfterDiscount,
    restaurantId, selectedTableSeat, id, restaurantName, image
  } = booking;

  return (
    <div className="flex border border-primary-800">
      <div className="relative w-[180px] min-h-[180px]">
        <Image
          src={image}
          alt={`${restaurantName} restaurant`}
          fill
          sizes="180px"
          className="object-cover border-r border-primary-800"
          priority
        />
      </div>

      <div className="flex-grow px-6 py-4 flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {restaurantName}
          </h3>
          {isPast(new Date(selectedTime)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-7 px-3 uppercase text-xs font-bold flex items-center rounded-sm">
              upcoming
            </span>
          )}
        </div>

        <p className="text-lg font-semibold">
          Booking Date: {format(new Date(selectedDate), "EEE, MMM dd yyyy")}
        </p>

        <p className="text-lg font-semibold">
          Booking Time: {selectedTime}
        </p>
        <div className="flex gap-5 mt-auto items-baseline">
          <p className="text-xl text-accent-600">Minimum Spent ${minimum}</p>
          <p className="text-primary-300">&bull;</p>
          <p className="text-lg text-primary-300">
            Table Seat {JSON.parse(selectedTableSeat)['name']}
          </p>
        </div>
      </div>

      <div className="flex flex-col border-l border-primary-800 w-[100px]">
        {!isPast(selectedTime) ? (
          <>
            <Link
              href={`/account/reservations/edit/${parseInt(id)}`}
              className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 border-b border-primary-800 flex-grow px-3 hover:bg-accent-600 transition-colors hover:text-primary-900"
            >
              <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
              <span className="mt-1">Edit</span>
            </Link>
            <DeleteReservation bookingId={id} onDelete={onDelete} />
          </>
        ) : null}
      </div>
    </div>
  );






}