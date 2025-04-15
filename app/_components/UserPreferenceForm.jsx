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
                console.log('success');
                // Try multiple approaches to ensure redirection works
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
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2>Let's Set Your Preference First!</h2>
                    <p>Help us personalize your experience</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label>
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
                            />
                        </div>
                        <div>
                            <label>
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
                            />
                        </div>
                        <div>
                            <label>
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
                            />
                        </div>
                        <div>
                            <label>
                                Budget Range
                            </label>
                            <select
                                id="cuisineBudget"
                                name="cuisineBudget"
                                required
                                value={formData.cuisineBudget}
                                onChange={handleChange}
                                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-500 focus:border-amber-500 sm:text-sm rounded-md"
                            >
                                <option value="">Select Budget Range</option>
                                <option value="low">$(Budget-Friendly)</option>
                                <option value="medium">$$(Mid-Range)</option>
                                <option value="high">$$$(High-End)</option>
                            </select>
                        </div>
                        {error && (<div className="text-red-500 text-center">{error}</div>)}

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                            >
                                {isLoading ? 'Saving...' : 'Submit Preferences'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}