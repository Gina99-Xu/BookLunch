import { StateGraph } from "@langchain/langgraph";
import { generateRestaurantRecommendations, initiBooking, retrieveUserPreference } from './nodes';

export default function createRecommendationGraph(userId) {
  // Define the graph with properly configured channels
  const workflow = new StateGraph({
    channels: {
      messages: { history: true },  // Use history: true for array values
      userPreferences: { value: null },
      restaurantOptions: { history: true },  // Use history: true for array values
      currentStep: { value: 'initial' }
    }
  });

  // Define nodes
  workflow.addNode("get_preferences", async (state) => retrieveUserPreference(state, { userId }));
  workflow.addNode('make_recommendations', async (state) => generateRestaurantRecommendations(state));
  workflow.addNode('start_booking', async (state) => initiBooking(state));

  // Define edges
  workflow.addEdge("__start__", "get_preferences");
  workflow.addEdge('get_preferences', 'make_recommendations');

  workflow.addConditionalEdges(
    'make_recommendations',
    (state) => {
      try {
        // Add error handling for message processing
        if (!state.messages || state.messages.length === 0) {
          return '__end__';
        }

        const lastMsg = state.messages[state.messages.length - 1].content.toLowerCase();
        if (lastMsg.includes('book') || lastMsg.includes('reserve')) {
          return 'start_booking';
        }
        return '__end__';
      } catch (error) {
        console.error('Error in conditional edge:', error);
        return '__end__';
      }
    }
  );

  workflow.addEdge('start_booking', '__end__');

  return workflow.compile();
}