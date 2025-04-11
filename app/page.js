import Link from 'next/link';
import { Utensils, Salad, Pizza } from 'lucide-react';

export default function Page() {
  return (
    <main>
      <div className="container mx-auto px-4 sm:px-6 pt-16 md:pt-24 pb-16 max-w-6xl" >
        <section className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center gap-3 mb-6 sm:mb-8">
            <Utensils className="w-8 h-8 sm:w-10 sm:h-10 text-amber-600" />
            <Salad className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
            <Pizza className="w-8 h-8 sm:w-10 sm:h-10 text-red-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 sm:leading-tight">
            Enjoy Meals at Discounted Prices <br className="hidden sm:block" />
            with Strangers
          </h1>
        </section>

        <div className="flex flex-col justify-center gap-3 sm:gap-4 max-w-xs sm:max-w-md mx-auto">
          <Link
            href="/restaurants"
            className="
              bg-white border-2 border-amber-500 rounded-lg
              px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-amber-600 font-bold hover:bg-amber-50 
              flex items-center justify-center gap-2
              w-full
            "
          >
            <Utensils className="w-4 h-4 sm:w-5 sm:h-5" />
            Explore Restaurants
          </Link>
        </div>
      </div >
    </main >
  );
}