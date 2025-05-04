import { NextResponse } from "next/server";
import { getUserPreference } from "@/app/_lib/actions";
import { getRestaurantsWithoutEmbedding } from "@/app/_lib/data-service";
import { getLocalRecommendations } from "@/app/_lib/agent/helper";

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    // Parse the request body
    const { message, userId } = await request.json();
    console.log('Chat request received:', { message, userId });

    // Get user preferences
    const userPreferences = await getUserPreference(userId);
    console.log('User preferences:', userPreferences);

    // Get restaurants - function returns array directly
    const allRestaurants = await getRestaurantsWithoutEmbedding();
    console.log(`Found ${allRestaurants?.length || 0} restaurants in total`);

    // Ensure we have valid data to work with
    if (!allRestaurants || !Array.isArray(allRestaurants)) {
      console.error('Invalid restaurant data received');
      return NextResponse.json({
        response: "I'm having trouble accessing our restaurant database at the moment.",
        restaurants: [],
        nextStep: 'error'
      }, { status: 200 });
    }

    // Filter restaurants based on user preferences
    let filteredRestaurants = [];
    if (allRestaurants.length > 0 && userPreferences) {
      // Get user's preferred cuisine from any available field
      const preferredCusineCity = userPreferences.cuisine_city;
      const preferredCusineCountry = userPreferences.cuisine_country;
      const preferredCuisine = userPreferences.cuisine_preference;
      const preferredCuisineBudget = userPreferences.cuisine_budget;

      console.log('Filtering with criteria:', { preferredCuisine, preferredCuisineBudget, preferredCusineCity, preferredCusineCountry });

      // Filter restaurants
      filteredRestaurants = allRestaurants.filter(restaurant => {
        // Match by cuisine if we have preference
        const cuisineMatch = !preferredCuisine ||
          restaurant.cuisine?.toLowerCase().includes(preferredCuisine.toLowerCase()) ||
          restaurant.country?.toLowerCase().includes(preferredCusineCountry.toLowerCase()) ||
          restaurant.city?.toLowerCase().includes(preferredCusineCity.toLowerCase()) ||
          restaurant.minimum <= preferredCuisineBudget

        return cuisineMatch;
      });

      // If no restaurants match the filter, use all restaurants
      if (filteredRestaurants.length === 0) {
        console.log('No restaurants matched the filter criteria, using all restaurants');
        filteredRestaurants = allRestaurants;
      }

      // Limit to top 5 restaurants
      // filteredRestaurants = filteredRestaurants.slice(0, 5);

      console.log(`Filtered to ${filteredRestaurants.length} restaurants based on preferences`);
    } else {
      // If no user preferences or no restaurants, use all restaurants (limited)
      filteredRestaurants = allRestaurants.slice(0, 5);
      console.log('Using all restaurants due to missing user preferences');
    }

    // Check if message contains booking-related words
    const isBookingIntent = message.toLowerCase().includes('book') ||
      message.toLowerCase().includes('reserve');

    let aiResponse;
    let nextStep = 'initial';

    if (isBookingIntent) {
      // Handle booking intent
      aiResponse = "Which restaurant would you like to book? Please specify the name and day.";
      nextStep = 'booking';
    } else {
      // Generate restaurant recommendations
      try {
        // Always use filteredRestaurants which is guaranteed to be at least an empty array
        aiResponse = await getLocalRecommendations({
          userPreferences,
          allRestaurants: filteredRestaurants
        });
      } catch (error) {
        console.error('Error getting recommendations:', error);
        aiResponse = "I'm having trouble generating recommendations right now. Please try again later.";
      }
    }

    console.log(`Sending response with ${filteredRestaurants.length} restaurants`);

    // Always return the filtered restaurants, even if empty
    return NextResponse.json({
      response: aiResponse,
      restaurants: filteredRestaurants,
      nextStep: nextStep
    }, { status: 200 });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: "Sorry, I encountered an error processing your message." },
      { status: 500 }
    );
  }
}