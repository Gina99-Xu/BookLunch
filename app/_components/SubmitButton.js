'use client'
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {

  const { pending } = useFormStatus();

  return (
    <button disabled={pending}
      className=" mt-2 mb-2 py-5 px-6 text-black font-bold bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-opacity-75">
      {pending ? pendingLabel : children}
    </button>
  )
}