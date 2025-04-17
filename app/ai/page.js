import AiRecommendationList from "../_components/AiRecommendationList";
import { supabase } from "../_lib/supabase";


export default async function AIPage() {

    return (
        <div className="container mx-auto px-4 py-12">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <AiRecommendationList />

            </div>
        </div>

    )
}