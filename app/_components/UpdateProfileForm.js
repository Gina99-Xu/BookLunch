'use client'

import SubmitButton from "./SubmitButton"


export default function UpdateProfileForm({ children }) {
  return (
    <form className="py-8 text-lg px-12 gap-6 flex-col border border-stone-700">
      <div className="space-y-2">
        <label>Full Name</label>
        <input
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          disabled defaultValue='' name='' />
      </div>
      <div className="space-y-2">
        <label>Email address</label>
        <input className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          disabled defaultValue='' name='' />
      </div>
      <div className="space-y-2">
        <div className="mt-2 flex items-center justify-between">
          <label htmlFor="nationality">Nationality</label>
          <img src='' alt='country flag' className="h-5 rounded-sm" />
          {children}
        </div>
      </div>
      <div className="space-y-2">
        <label>Identity Number</label>
        <input className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          disabled defaultValue='' name='' />
      </div>
      <div className="flex justify-end items-center gap-2 mt-4">
        <SubmitButton>Update profile</SubmitButton>
      </div>

    </form>
  )
}