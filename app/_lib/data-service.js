import { supabase } from "./supabase";
import { notFound } from "next/navigation";



export async function getBooking(bookingId) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", bookingId)
      .single();

    if (error) throw error;
    if (!data) notFound();

    return data;
  } catch (error) {
    console.error("Error fetching booking:", error.message);
    throw new Error("Unable to load booking details");
  }
}


export async function getBookings(userId) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select('*')
      .eq("userId", userId);

    if (error) throw error;

    return data || [];
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw new Error("Unable to load bookings");
  }
}

export async function getRestaurant(restaurantId) {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*')
      .eq('id', restaurantId)
      .single();

    if (!data) {
      return {
        data: {},
        error: 'Failed to fetch restaurant'
      }
    }

    return {
      data,
      error: null
    };
  } catch (error) {
    return {
      data: {},
      error: error.message || "Unable to load restaurant details"
    }
  }
}

export async function getRestaurants() {
  try {
    const { data, error } = await supabase
      .from('restaurants')
      .select('*');

    if (error) {
      return {
        data: [],
        error: error.message || 'unable to load restaurants'
      }
    }

    if (!data || data.length === 0) {
      return {
        data: [],
        error: "No restaurants found"
      };
    }
    return {
      data,
      error: null
    };
  } catch (error) {
    return {
      data: [],
      error: error.message || "Unable to load restaurants"
    };
  }
}


export async function getCountries() {
  try {
    const response = await fetch("https://restcountries.com/v2/all?fields=name,flag");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const countries = await response.json();
    return countries;
  } catch (error) {
    console.error("Error fetching countries:", error.message);
    throw new Error("Unable to load countries data");
  }
}

export async function getSettings() {
  try {
    const { data, error } = await supabase
      .from("settings")
      .select("*")
      .single();

    if (error) throw error;
    if (!data) throw new Error("Settings not found");

    return data;
  } catch (error) {
    console.error("Error fetching settings:", error.message);
    throw new Error("Unable to load settings");
  }
}

export async function getBookedDatesByPropertyId(restaurantId) {
  try {
    let today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const isoDate = today.toISOString();

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("restaurantId", restaurantId)
      .or(`selectedDate.gte.${isoDate}`);

    if (error) throw error;

    if (!data || !data.selectedDate) {
      return null;
    }

    return new Date(data.selectedDate);
  } catch (error) {
    //console.error("Error fetching booked dates:", error.message);
    throw new Error("Unable to load booking dates");
  }
}

/** USER PART */
export async function getUserByEmail(email) {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) throw error;

    return data || null;
  } catch (error) {
    console.error("Error fetching user:", error.message);
    throw new Error("Unable to load user details");
  }
}

export async function createUser(newUser) {
  try {
    const { data, error } = await supabase
      .from("users")
      .insert([newUser]);

    if (error) throw error;
    if (!data) throw new Error("No data returned after user creation");

    return data;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error("Unable to create new user");
  }
}


