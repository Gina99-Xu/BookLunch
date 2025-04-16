import { updateUserPreferences } from "@/app/_lib/actions";
import { getUserById } from "@/app/_lib/data-service";
import { auth } from "@/app/_lib/auth";

export async function POST(req) {
    try {
        const { cuisinePreference, cuisineCountry, cuisineCity, cuisineBudget, id } = await req.json();

        const session = await auth();
        if (!session) {
            return new Response(JSON.stringify({ message: 'You must be logged in first' }), {
                status: 401
            });
        }

        const user = await getUserById(id);
        if (!user) {
            return new Response(JSON.stringify({ message: 'User not found' }), {
                status: 404
            });
        }

        const result = await updateUserPreferences({
            cuisine_preference: cuisinePreference,
            cuisine_country: cuisineCountry,
            cuisine_city: cuisineCity,
            cuisine_budget: cuisineBudget,
            id
        });

        if (result.error) {
            return new Response(JSON.stringify({ message: 'Failed to update user preferences' }), {
                status: 500
            });
        }

        return new Response(JSON.stringify({
            message: 'User preferences updated successfully',
            success: true
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        return new Response(JSON.stringify({
            message: error.message || 'Internal server error'
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}