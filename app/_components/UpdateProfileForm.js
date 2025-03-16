'use client'

import { updateUserProfile } from "../_lib/actions";
import SubmitButton from "./SubmitButton"


export default function UpdateProfileForm({ loggedUser, children }) {

  const { fullName, email, nationalID } = loggedUser;

  return (
    <form className="py-10 text-lg px-10 flex-col gap-10 border border-stone-700"
      action={updateUserProfile}>
      <div className="space-y-2">
        <label>Full Name</label>
        <input
          className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={fullName} name='fullName' />
      </div>
      <div className="space-y-2">
        <label>Email</label>
        <input className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          disabled defaultValue={email} name='email' />
      </div>
      <div className="space-y-2">
        <div className="py-4 flex items-center justify-between">
          <label htmlFor=''>Country of Origin</label>
          {children}
        </div>
      </div>
      <div className="space-y-2">
        <label>National Identity Card Number</label>
        <input className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          defaultValue={nationalID} name='nationalID' />
      </div>
      <div className="flex justify-end items-center gap-2 mt-4">
        <SubmitButton pendingLabel="Updating...">Update profile</SubmitButton>
      </div>
    </form>
  )
}