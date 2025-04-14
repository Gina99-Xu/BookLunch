'use server'

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

/**bookings */
export async function updateBooking(bookingData) {
  const { id } = bookingData;
  const session = await auth();
  if (!session) throw new Error("You must logged in first")

  const userBookings = await getBookings(session.user.userId)
  const userBookingIds = userBookings.map(booking => booking.id)

  if (!userBookingIds.includes(parseInt(id))) {
    throw new Error('booking id doesnt exit')
  }

  const updatedBookingData = {
    ...bookingData,
    userId: session.user.userId
  }

  const { error } = await supabase
    .from("bookings")
    .update(updatedBookingData)
    .eq("id", parseInt(id))
    .select()
    .single()

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be updated");
  }

  revalidatePath("/account/reservations/*")
  redirect("/account/reservations")
}


export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must logged in first")

  const newBooking = {
    ...bookingData,
    userId: session.user.userId,
    observations: formData.get("observations"),
  }

  console.log(typeof bookingData.restaurantId)

  const { error } = await supabase.from("bookings")
    .insert([newBooking])

  if (error) {
    console.error(error);
    throw new Error("Error insert booking data");
  }

  revalidatePath("/account/reservations/*")
  redirect('/restaurants/thankyou')
}


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
  revalidatePath("/account/reservations/*")
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

  revalidatePath("/account")

}

