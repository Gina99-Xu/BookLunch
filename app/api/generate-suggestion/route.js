import { getMatchedRestaurants, getUserPreferenceEmbeddings, storeRestaurantSuggestions } from "@/app/_lib/actions";
import { NextResponse } from 'next/server';
import { auth } from "@/app/_lib/auth";

export async function GET() {
    try {
        const session = await auth();
        if (!session) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userId = session.user.id;
        const { data: embeddings, error: embeddingsError } = await getUserPreferenceEmbeddings(userId);

        console.log("inside generate suggestion embeddings", embeddings);

        if (embeddingsError) {
            return NextResponse.json({ error: embeddingsError }, { status: 404 });
        }

        const { data: matchedRestaurants, error: matchError } = await getMatchedRestaurants(embeddings);

        console.log("inside generate suggestion matchedRestaurants", matchedRestaurants);

        if (matchError) {
            return NextResponse.json({ error: matchError }, { status: 500 });
        }

        if (!matchedRestaurants || matchedRestaurants.length === 0) {
            return NextResponse.json({ error: 'No restaurant matches found' }, { status: 404 });
        }

        const { data: storedSuggestions, error: storeError } = await storeRestaurantSuggestions(matchedRestaurants);

        console.log("inside generate suggestion storedSuggestions", storedSuggestions);

        if (storeError) {
            console.error('Error storing suggestions:', storeError);
            // Continue anyway since we have the matches
        }

        return NextResponse.json({ suggestions: matchedRestaurants });
    } catch (error) {
        console.error('Error in generate-suggestion:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}