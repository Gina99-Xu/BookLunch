'use client';

import { useRouter } from 'next/navigation';

export default function ErrorComponent({ error }) {
    const router = useRouter();

    return (
        <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
          <p className="text-gray-600 mb-6">{error.message}</p>
          <div className="space-x-4">
            <button
              onClick={() => router.back()}
              className="bg-white border-2 border-amber-500 rounded-lg
              px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-amber-600 font-bold hover:bg-amber-50 
              flex items-center justify-center gap-2
              w-full"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
}
