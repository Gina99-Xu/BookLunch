'use client'

import { usePathname, useRouter } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";


export default function SearchFilterContainer() {
  const router = useRouter();
  const pathname = usePathname();
  const params = new URLSearchParams();

  const [searchValue, setSearchValue] = useState('');
  const [countryParam, setCountryParam] = useState('');
  const [minimumParam, setMinimumParam] = useState('');

  const handleSearchSubmit = () => {
    if (searchValue && searchValue !== '') {
      params.append("search", searchValue);
    }
    if (countryParam && countryParam !== '') {
      params.append("country", countryParam);
    }
    if (minimumParam && minimumParam !== '') {
      params.append("minimum", minimumParam);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleClearSearch = () => {
    setSearchValue('');
    setCountryParam('');
    setMinimumParam('');
    params.delete('search');
    params.delete('country');
    params.delete('minimum');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }


  return (
    <div className="max-w-3xl mx-auto space-y-8 mb-8">
      {/** SEARCH BOX */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <div className="flex flex-row gap-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Type to search..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 text-sm placeholder:text-gray-400"
          />
          <button
            onClick={handleSearchSubmit}
            className="
            ml-2 sm:text-base text-amber-600 font-semibold hover:bg-amber-50 bg-white border-2 border-amber-500 rounded-xl px-4 py-2">
            Search
          </button><button
            onClick={handleClearSearch}
            className="ml-2 sm:text-base text-amber-600 font-semibold hover:bg-amber-50 bg-white border-2 border-amber-500 rounded-xl px-4 py-2">
            Clear
          </button>
        </div>
      </div>

      {/** COUNTRY FILTER BOX */}
      <div className="flex justify-center gap-4">
        <div className="w-64">
          <select
            value={countryParam}
            onChange={(e) => setCountryParam(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 w-full"
          >
            <option value="Australia">Country</option>
            <option value="Australia">Australia</option>
            <option value="Singapore">Singapore</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Japan">Japan</option>
          </select>
        </div>

        {/** MINIMUM FILTER BOX */}
        <div className="w-64">
          <select
            value={minimumParam}
            onChange={(e) => setMinimumParam(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 text-gray-800 w-full"
          >
            <option value="10">Minium Spent (AUD)</option>
            <option value="10">10 AUD</option>
            <option value="20">20 AUD</option>
            <option value="30">30 AUD</option>
            <option value="40">40 AUD</option>
          </select>
        </div>
      </div>
    </div>
  )
}


