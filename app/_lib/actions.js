'use server'

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

/** BOOKINGS */
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


/** AUTH */
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" })
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" })
}


/** USER  */
export async function updateUserProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in first");

  console.log('debug formData is', formData);
  const nationalID = formData.get("nationalID");
  const name = formData.get("name");
  const nationality = formData.get("nationality");

  if (!nationalID || !name || !nationality) {
    throw new Error("All fields are required");
  }

  const dataToUpdate = { 
    nationalID, 
    nationality, 
    name 
  };

  try {
    const { error } = await supabase
      .from("users")
      .update(dataToUpdate)
      .eq("id", session.user.id);

    if (error) {
      console.error("Supabase error:", error);
      throw new Error("Failed to update profile: " + error.message);
    }

    revalidatePath("/account");
  } catch (error) {
    console.error("Profile update error:", error);
    throw new Error(error.message || "Error updating profile");
  }
}


export async function updateUserPreferences(formData) {
  const session = await auth();
  if (!session) throw new Error("You must logged in first");

  const dataToUpdate = {
    cuisine_preference: formData.cuisine_preference,
    cuisine_country: formData.cuisine_country,
    cuisine_city: formData.cuisine_city,
    cuisine_budget: formData.cuisine_budget
  };

  const { data, error } = await supabase
    .from("users")
    .update(dataToUpdate)
    .eq("id", formData.id);

  if (error) {
    console.error("Error updating preferences:", error);
    return { error };
  }

  revalidatePath("/account");
  return { data };
}

