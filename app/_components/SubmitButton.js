'use client'
import { useFormStatus } from "react-dom";

export default function SubmitButton({ children, pendingLabel }) {

  const { pending } = useFormStatus();

  return (
    <button disabled={pending}
      className="bg-primary-200 px-8 py-4 text-black font-semibold hover:bg-accent-500">
      {pending ? pendingLabel : children}
    </button>
  )
}