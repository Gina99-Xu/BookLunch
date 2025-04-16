'use client'

import { updateUserProfile } from "../_lib/actions";
import SubmitButton from "./SubmitButton"

export default function UpdateProfileForm({ loggedUser, children }) {
  console.log('debug loggedUser is', loggedUser);
  const { name, email, nationalID, nationality, cuisine_preference
,     cuisine_country, cuisine_city, cuisine_budget} = loggedUser;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Update Your Profile</h2>
          <p className="mt-2 text-sm text-gray-600">Make changes to your profile information</p>
        </div>
        <form 
          className="bg-white rounded-lg shadow-md p-8 space-y-6"
          action={updateUserProfile}
        >
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              defaultValue={name} 
              name='name' 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-500"
              disabled 
              defaultValue={email} 
              name="email" 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cuisine Preferences</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              name="cuisine_preference"
              defaultValue={cuisine_preference}
              placeholder="e.g. Italian, Japanese, Korean"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Cuisine Country</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              name="cuisine_country"
              defaultValue={cuisine_country}
              placeholder="Country"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Preferred Cuisine City</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              name="cuisine_city"
              defaultValue={cuisine_city}
              placeholder="City"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Cuisine Budget</label>
            <select
              name="cuisine_budget"
              defaultValue={cuisine_budget}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
            >
              <option value="">Select Budget Range</option>
              <option value="low">$(Budget-Friendly)</option>
              <option value="medium">$$(Mid-Range)</option>
              <option value="high">$$$(High-End)</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Country of Nationality</label>
            <input
              type="text"
              name="nationality"
              defaultValue={nationality} 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">National Identity Card Number</label>
            <input 
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
              defaultValue={nationalID} 
              name="nationalID"
              required
            />
          </div>

          <div className="flex justify-end pt-6">
            <SubmitButton 
              pendingLabel="Updating..." 
              className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Update Profile
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  )
}