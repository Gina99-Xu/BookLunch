'use client'

export default function SubmitButton({ children, pending }) {
  return (
    <button disabled={pending}
      className="bg-primary-200 px-8 py-4 text-black font-semibold hover:bg-accent-500">
      {pending ? pendingLabel : children}
    </button>
  )
}