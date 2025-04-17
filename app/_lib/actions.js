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

  const userBookings = await getBookings(session.user.id)
  const userBookingIds = userBookings.map(booking => booking.id)

  if (!userBookingIds.includes(parseInt(id))) {
    throw new Error('booking id doesnt exit')
  }

  const updatedBookingData = {
    ...bookingData,
    userId: session.user.id
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

  console.log('debug bookingData session!!!', session);
  const newBooking = {
    ...bookingData,
    userId: session.user.id,
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

  const userBookings = await getBookings(session.user.id)
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
  const cuisine_country = formData.get("cuisine_country");
  const cuisine_city = formData.get("cuisine_city");
  const cuisine_budget = formData.get("cuisine_budget");

  if (!nationalID || !name || !nationality || !cuisine_country || !cuisine_city || !cuisine_budget) {
    throw new Error("All fields are required");
  }

  const dataToUpdate = {
    nationalID,
    nationality,
    name,
    cuisine_country,
    cuisine_city,
    cuisine_budget
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
  if (!session) throw new Error("You must be logged in first");

  if (!formData.id) {
    console.error("No user ID provided to updateUserPreferences");
    return { error: new Error("User ID is required") };
  }

  const dataToUpdate = {
    cuisine_preference: formData.cuisine_preference,
    cuisine_country: formData.cuisine_country,
    cuisine_city: formData.cuisine_city,
    cuisine_budget: formData.cuisine_budget
  };

  try {
    const { data, error } = await supabase
      .from("users")
      .update(dataToUpdate)
      .eq("id", formData.id)
      .select();

    if (error) {
      console.error("Error updating preferences:", error);
      return { error };
    }

    revalidatePath("/account");
    return { data };
  } catch (error) {
    console.error("Error in updateUserPreferences:", error);
    return { error };
  }
}

export async function updateUserPreferenceEmbeddings(embedding) {
  const session = await auth();
  if (!session) throw new Error('You must be logged in first');

  try {
    // First update the users table with the embedding
    const { error: userError } = await supabase
      .from('users')
      .update({
        embedding: embedding
      })
      .eq('id', session.user.id);

    if (userError) {
      console.error('Failed to update user embedding:', userError);
      return { error: userError };
    }

    // Now handle the user_preference_embeddings table
    // Check if entry exists
    const { data: existingData, error: existingError } = await supabase
      .from('user_preference_embeddings')
      .select('*')
      .eq('user_id', session.user.id)
      .single();

    if (existingData) {
      // Update existing record
      const { data, error } = await supabase
        .from('user_preference_embeddings')
        .update({
          embedding: embedding,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', session.user.id);

      if (error) {
        console.error('Failed to update user preference embeddings:', error);
        return { error };
      }

      return { data };
    } else {
      // Insert new record
      const { data, error } = await supabase
        .from('user_preference_embeddings')
        .insert({
          user_id: session.user.id,
          embedding: embedding,
          created_at: new Date().toISOString()
        });

      if (error) {
        console.error('Failed to create user preference embeddings:', error);
        return { error };
      }

      return { data };
    }
  } catch (error) {
    console.error('Error in updateUserPreferenceEmbeddings:', error);
    return { error };
  }
}


export async function getUserPreferenceEmbeddings(userId) {
  try {
    const { data: existingData, error: existingError } = await supabase
      .from('user_preference_embeddings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingError) {
      console.error('Failed to get user preference embeddings:', existingError);
      return { error: existingError, data: null };
    }

    if (!existingData) {
      return { error: 'No preference embeddings found for user', data: null };
    }

    return { data: existingData, error: null };
  } catch (error) {
    console.error('Error in getUserPreferenceEmbeddings:', error);
    return { error, data: null };
  }
}




export async function getMatchedRestaurants(userPreferenceEmbeddings) {
  const { data, error } = await supabase
    .rpc('match_restaurants', {
      query_embedding: userPreferenceEmbeddings.embedding,
      match_threshold: 0.5,
      match_count: 10
    })

  if (error) {
    console.error('Error fetching matched restaurants:', error)
    return { error, data: null }
  }

  return { data, error: null }
}

export async function storeRestaurantSuggestions(suggestions) {
  const session = await auth();
  if (!session) throw new Error('You must logged in first');

  const { data, error } = await supabase
    .from('restaurants_suggestions')
    .upsert(
      suggestions.map(suggestion => ({
        user_id: session.user.id,
        restaurant_id: suggestion.id,
        similarity_score: suggestion.similarity,
        created_at: new Date().toISOString()
      })),
      { onConflict: 'user_id, restaurant_id' }
    )

  if (error) {
    console.error('Error storing restaurant suggestions:', error)
    return { error, data: null }
  }

  return { data, error: null }

}


