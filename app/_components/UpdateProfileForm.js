'use client'

import { updateUserProfile } from "../_lib/actions";
import SubmitButton from "./SubmitButton"

export default function UpdateProfileForm({ loggedUser, children }) {
  const { fullName, email, nationalID } = loggedUser;

  return (
    <form 
      className="bg-white rounded-lg shadow-sm p-8 space-y-6"
      action={updateUserProfile}
    >
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
          defaultValue={fullName} 
          name='fullName' 
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
          disabled 
          defaultValue={email} 
          name='email' 
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700">Country of Origin</label>
          {children}
        </div>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">National Identity Card Number</label>
        <input 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
          defaultValue={nationalID} 
          name='nationalID' 
        />
      </div>
      <div className="flex justify-end pt-4">
        <SubmitButton 
          pendingLabel="Updating..." 
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Update profile
        </SubmitButton>
      </div>
    </form>
  )
}