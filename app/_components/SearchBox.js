'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SearchInputBox() {

  const [search, setSearch] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  function handleSearch(event) {
    setSearch(event.target.value)
  }

  function handleSearchSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("cuisine", search);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function handleClearSearch() {
    setSearch('');
    const params = new URLSearchParams(searchParams);
    params.delete('cuisine');
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }


  return (
    <div className='flex items-center justify-center mb-4'>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Enter Cuisine Type (e.g. Japanese, Western, Malay, Singaporean)"
        className="border border-gray-300 rounded-xl px-4 py-2 text-gray-800 min-w-[600px]"
      />
      {search !== '' &&
        <><button
          onClick={handleSearchSubmit}
          className="ml-2 border border-gray-300 rounded-xl px-4 py-2 text-gray-800 hover:bg-gray-100">
          Search
        </button><button
          onClick={handleClearSearch}
          className="ml-2 border border-gray-300 rounded-xl px-4 py-2 text-gray-800 hover:bg-gray-100">
            Clear
          </button></>}
    </div>
  )
}