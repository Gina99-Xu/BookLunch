'use client'

import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function UserPreferenceForm({userId}) {
    const router = useRouter();
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [shouldRedirect, setShouldRedirect] = useState(false);

    const [formData, setFormData] = useState({
        id: userId,
        cuisinePreference: '',
        cuisineCountry: '',
        cuisineCity: '',
        cuisineBudget: ''
    });

    useEffect(() => {
        if (shouldRedirect) {
            window.location.href = '/restaurants';
        }
    }, [shouldRedirect]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        try {

            //save user preference 
            const response = await fetch('/api/user-preference', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update user preferences');
            }

            if (data.success) {
                console.log('/api/user-preference is success');
                // setShouldRedirect(true);
                // router.replace('/restaurants');
                // router.push('/restaurants');
                // window.location.href = '/restaurants';
            }

            //generate user preference embeddings
            const text = `${formData.cuisinePreference}, ${formData.cuisineCountry}, ${formData.cuisineCity}, ${formData.cuisineBudget}`;

            const responseEmbeddings = await fetch('/api/generate-embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            })

            const embeddingsData = await responseEmbeddings.json();
            console.log('embeddingsData is ', embeddingsData);
           
           
            //store user preference embeddings
            const responseStoreEmbeddings = await fetch('/api/store-preference-embeddings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'  
                },
                body: JSON.stringify({
                    userId, 
                    embedding: embeddingsData.embedding
                })
            })  

            const storeEmbeddingsData = await responseStoreEmbeddings.json();

            if(!responseStoreEmbeddings.ok){
                throw new Error(storeEmbeddingsData.message || 'Failed to store user preference embeddings');
            }

            if(storeEmbeddingsData.success){
                console.log('User preference embeddings stored successfully');
                setShouldRedirect(true);
                router.replace('/restaurants');
                router.push('/restaurants');
                window.location.href = '/restaurants';
            }

        } catch (error) {
            console.error('Error updating user preferences:', error);
            setError(error.message || 'An error occurred while updating preferences');
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-900">Set Your Preferences</h2>
                    <p className="mt-2 text-sm text-gray-600">Help us personalize your experience</p>
                </div>

                <form className="bg-white rounded-lg shadow-md p-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Cuisine Preferences
                        </label>
                        <input 
                            id="cuisinePreference"
                            name="cuisinePreference"
                            type="text"
                            required
                            placeholder="e.g. Italian, Japanese, Korean"
                            value={formData.cuisinePreference}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Country
                        </label>
                        <input 
                            id="cuisineCountry"
                            name="cuisineCountry"
                            type="text"
                            required
                            placeholder="Country"
                            value={formData.cuisineCountry}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            City
                        </label>
                        <input 
                            id="cuisineCity"
                            name="cuisineCity"
                            type="text"
                            required
                            placeholder="City"
                            value={formData.cuisineCity}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Budget Range
                        </label>
                        <select
                            id="cuisineBudget"
                            name="cuisineBudget"
                            required
                            value={formData.cuisineBudget}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 focus:outline-none"
                        >
                            <option value="">Select Budget Range</option>
                            <option value="low">$(Budget-Friendly)</option>
                            <option value="medium">$$(Mid-Range)</option>
                            <option value="high">$$$(High-End)</option>
                        </select>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center py-2">
                            {error}
                        </div>
                    )}

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Submit Preferences'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}