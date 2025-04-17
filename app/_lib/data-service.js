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

    //check for restaurant embeddings
    const restaurantIds = data.map(restaurant => restaurant.id);
    const { data: existingEmbeddings } = await supabase
      .from('restaurant_embeddings')
      .select('*')
      .in('restaurant_id', restaurantIds);

    const existingEmbeddingIds = existingEmbeddings?.map(embedding => embedding.restaurant_id) || [];

    const restaurantsToEmbed = data.filter(restaurant => !existingEmbeddingIds.includes(restaurant.id));
    if (restaurantsToEmbed.length > 0) {
      await generateRestaurantEmbeddings(restaurantsToEmbed);
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

async function generateRestaurantEmbeddings(restaurants) {
  for (const restaurant of restaurants) {
    try {

      const restaurantText = `${restaurant.name}, ${restaurant.cuisine}, ${restaurant.country}, ${restaurant.city}, ${restaurant.regularPrice}, ${restaurant.description}`
      const response = await fetch('http://localhost:11434/api/embeddings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'nomic-embed-text',
          prompt: restaurantText
        })
      })

      if (!response.ok) {
        throw new Error('Failed to generate embeddings')
      }

      const { embedding } = await response.json();
      await supabase.from('restaurant_embeddings')
        .insert({
          restaurant_id: restaurant.id,
          embedding: embedding,
          created_at: new Date().toISOString(),
        })

    } catch (error) {
      console.error('Error generating restaurant embeddings:', error)
    }
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
  if (!email) {
    console.error("No email provided to getUserByEmail");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user by email:", error.message);
    throw new Error("Unable to load user details");
  }
}

export async function getUserById(id) {
  if (!id) {
    console.error("No id provided to getUserById");
    return null;
  }

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null;
      }
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching user by id:", error.message);
    throw new Error("Unable to load user details");
  }
}

export async function createUser(newUser) {
  console.error("Creating user, newuser is ", newUser);

  if (!newUser?.email) {
    throw new Error("Email is required to create a user");
  }

  try {
    const existingUser = await getUserByEmail(newUser.email);
    if (existingUser) {
      return existingUser;
    }

    // Match the exact column names in your database
    const { data, error } = await supabase
      .from("users")
      .insert([{
        email: newUser.email,
        name: newUser.name || ''
      }])
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      throw error;
    }

    if (!data) {
      throw new Error("No data returned after user creation");
    }

    return data;
  } catch (error) {
    console.error("Error creating user:", error.message);
    throw new Error("Unable to create new user");
  }
}


export async function getUserPreferences(id) {
  const { data, error } = await supabase
    .from('user_preference_embeddings')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching user preferences:', error)
  }
  return data;
}

export async function getRestaurantSuggestionsByUserId(id) {

  try {
    const { data, error } = await supabase
      .from('restaurants_suggestions')
      .select('*')
      .eq('user_id', id)
  } catch (error) {
    console.error('Error fetching restaurant suggestions:', error)
    return { error }
  }
  return data || [];
}

