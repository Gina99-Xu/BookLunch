
import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";


export async function getBooking(bookingId) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("id", bookingId)
    .single()

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

export async function getBookings(userId) {
  const { data, error } = await supabase
    .from("bookings")
    .select('*')
    .eq("userId", userId)

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}


export const getRestaurant = async function (restaurantId) {
  const { data, error } = await supabase.from('restaurants')
    .select('*')
    .eq('id', restaurantId)
    .single()

  if (error) {
    console.log(error);
    notFound();
  }
  return data;
}

export const getRestaurants = async function () {
  const { data, error } = await supabase.from('restaurants')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error('restaurants cannot be loaded')
  }

  return data;
}



export async function getCountries() {
  try {
    const res = await fetch("https://restcountries.com/v2/all?fields=name,flag");
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Error while fetching countries")
  }
}


export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error('Properties cannot be loaded')
  }

  return data;
}

export async function getBookedDatesByPropertyId(restaurantId) {
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();


  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("restaurantId", restaurantId)
    .or(`selectedDate.gte.${today}`);


  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDate = new Date(data.selectedDate);
  return bookedDate

}

/** USER PART */
export async function getUserByEmail(email) {
  const { data, error } = await supabase.from("users").select("*")
    .eq("email", email).single()
  return data;
}


export async function createUser(newUser) {
  const { data, error } = await supabase.from("users")
    .insert([newUser])

  if (error) {
    console.log(error);
    throw new Error("New user cannot be created")
  }

  return data
}