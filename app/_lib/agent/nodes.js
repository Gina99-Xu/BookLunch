import { getUserPreference } from "../actions";
import { getRestaurantsWithoutEmbedding } from "../data-service";
import { getLocalRecommendations } from "./helper";

//retrieve user preference 
export async function retrieveUserPreference(state, { userId }) {
  try {
    const data = await getUserPreference(userId);
    return {
      ...state,
      userPreferences: data
    };
  } catch (error) {
    console.error('Error retrieving user preference:', error);
    return {
      ...state,
      messages: [
        ...(state.messages || []),
        {
          role: 'ai',
          content: 'Sorry, I encountered an error retrieving your preferences.'
        }
      ]
    };
  }
}

//generate restaurant recommendations
export async function generateRestaurantRecommendations(state) {
  try {
    if (!state.userPreferences) {
      return {
        ...state,
        messages: [
          ...(state.messages || []),
          {
            role: 'ai',
            content: 'I need to know your preferences first. What type of cuisine are you interested in?'
          }
        ]
      };
    }

    const allRestaurants = await getRestaurantsWithoutEmbedding();
    const restaurants = allRestaurants.data || [];

    const recommendations = await getLocalRecommendations({
      userPreferences: state.userPreferences,
      allRestaurants: restaurants
    });
    console.log('recommendation is', recommendations)

    return {
      ...state,
      restaurantOptions: restaurants,
      messages: [
        ...(state.messages || []),
        {
          role: 'ai',
          content: recommendations
        }
      ]
    };
  } catch (error) {
    console.error('Error generating recommendations:', error);
    return {
      ...state,
      messages: [
        ...(state.messages || []),
        {
          role: 'ai',
          content: 'Sorry, I encountered an error generating recommendations.'
        }
      ]
    };
  }
}

//initiate booking
export async function initiBooking(state) {
  try {
    return {
      ...state,
      currentStep: 'booking',
      messages: [
        ...(state.messages || []),
        {
          role: 'ai',
          content: "Which restaurant would you like to book? Please specify the name and day."
        }
      ]
    };
  } catch (error) {
    console.error('Error initiating booking:', error);
    return {
      ...state,
      messages: [
        ...(state.messages || []),
        {
          role: 'ai',
          content: 'Sorry, I encountered an error with the booking process.'
        }
      ]
    };
  }
}