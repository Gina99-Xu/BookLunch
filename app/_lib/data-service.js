import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { eachDayOfInterval } from "date-fns";



export async function getBookings(userId) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("userId", userId)

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}


export const getProperty = async function (propertyId) {
  revalidatePath(`/properties/${propertyId}`)
  const { data, error } = await supabase.from('properties')
    .select('*')
    .eq('id', propertyId)
    .single()

  if (error) {
    console.log(error);
    notFound();
  }

  return data;
}

export const getProperties = async function () {
  revalidatePath('/properties')
  const { data, error } = await supabase.from('properties')
    .select('*')

  if (error) {
    console.error(error);
    throw new Error('Properties cannot be loaded')
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

export async function getBookedDatesByPropertyId(propertyId) {
  revalidatePath(`/properties/${propertyId}`)
  let today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today = today.toISOString();


  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("propertyId", propertyId)
    .or(`startDate.gte.${today},status.eq.checked-in`);


  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates

}

/** USER PART */
export async function getUserByEmail(email) {
  console.log(email)
  const { data, error } = await supabase.from("users").select("*")
    .eq("email", email).single()

  console.log(data)
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