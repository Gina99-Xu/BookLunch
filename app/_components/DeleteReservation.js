
import { TrashIcon } from "@heroicons/react/24/solid";
import { useTransition } from "react"
import Spinner from "./Spinner";

export default function DeleteReservation({ bookingId, onDelete }) {

  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this booking")) {
      startTransition(() => onDelete(bookingId))
    }
  }

  return (
    <button
      onClick={handleDelete}
      className="group flex items-center gap-2 uppercase">
      {!isPending ? (
        <>
          <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
          <span className="mt-1">Delete</span>
        </>
      ) : (
        <span className="mx-auto">
          <Spinner />
        </span>
      )}

    </button>
  )
}