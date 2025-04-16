'use client'

import { useState } from 'react';
import { auth } from "../_lib/auth";
import { getUserPreferences } from "../_lib/data-service";
import Button from "./Button";
import RestaurantListContainer from "./RestaurantListContainer";
import { useRouter } from 'next/navigation';

export default function AiRecommendationList(){
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleGenerateRecommendations = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/generate-suggestion');

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Server error:', errorData.error);
                return;
            }

            const data = await response.json();
            setRestaurants(data.suggestions || []);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <button 
                onClick={handleGenerateRecommendations}
                disabled={loading}
                className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
            >
                {loading ? 'Generating...' : 'Generate Recommendations'}
            </button>
            
            {restaurants.length > 0 && 
                <RestaurantListContainer restaurants={restaurants}/>
            }
        </>
    );
}