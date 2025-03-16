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
    restaurantId, selectedTableSeat
  } = booking;

  console.log(booking);

  return (
    <div className="flex border border-primary-800">
    </div>
  );






}