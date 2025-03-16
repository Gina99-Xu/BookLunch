'use server'

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";


/**bookings */
export async function updateBooking(formData) {
  const bookingId = Number(formData.get("bookingId"));
  console.log(bookingId);
  const session = await auth();
  if (!session) throw new Error("You must logged in first")

  const userBookings = await getBookings(session.user.userId)
  const userBookingIds = userBookings.map(booking => booking.id)
  console.log(userBookingIds);

  if (!userBookingIds.includes(bookingId)) {
    throw new Error('booking id doesnt exit')
  }

  const updatedBookingData = {
    numGuests: Number(formData.get("numGuests")),
    observations: formData.get("observations")
  }

  const { error } = await supabase
    .from("bookings")
    .update(updatedBookingData)
    .eq("id", bookingId)
    .select()
    .single()

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be updated");
  }

  revalidatePath(`/account/reservations/edit/${bookingId}`)
  revalidatePath("/account/reservations")

  redirect("/account/reservations")

}


/**
 * 
 * 
bookingdata - seats, comments, time, date, 
restaurantId, restaurant default information etc

regularPrice, discount, id, minimum 
 */


export async function createBooking(bookingData, formData) {
  const session = await auth();
  if (!session) throw new Error("You must logged in first")

  const newBooking = {
    ...bookingData,
    userId: session.user.userId,
    observations: formData.get("observations"),
  }

  const { error } = await supabase.from("bookings")
    .insert([newBooking])

  if (error) {
    console.error(error);
    throw new Error("Error insert booking data");
  }

  revalidatePath(`/restaurants/${bookingData.restaurantId}`)
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

  revalidatePath("/account")

}

