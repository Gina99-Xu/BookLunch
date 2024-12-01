"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { se } from "date-fns/locale";


/**bookings */
export async function deleteBooking(bookingId) {
  const session = await auth();

  if (!session) throw new Error("You must logged in first")

  const userBookings = await getBookings(session.user.userId)
  const userBookingIds = userBookings.map(booking => booking.id)
  if (!userBookingIds.includes(bookingId)) {
    throw new Error('booking id doesnt exit')
  }

  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId)

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  revalidatePath('/account/reservations')
}



/**signin and signout */
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}

/** user */

export async function updateUserProfile(formData) {
  const session = await auth();

  if (!session) throw new Error("You must logged in first")

  const nationalID = formData.get("nationalID")
  const fullName = formData.get("fullName")
  const nationality = formData.get("nationality")

  if (!/^[a-zA-Z0-9]{6,12}$/.test(nationalID)) {
    throw new Error("Please enter valid identity card number")
  }

  const dataToUpdate = { nationalID, nationality, fullName }

  const { data, error } = await supabase
    .from("users")
    .update(dataToUpdate)
    .eq("email", session.user.email)

  if (error) throw new Error("Error updating profile")

  revalidatePath("/account/profile")

}

