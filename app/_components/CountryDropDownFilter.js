'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";

function CountryDropDownFilter() {

  const [selectedCountry, setSelectedCountry] = useState('Australia');
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  // const activeFilter = searchParams.get('country');

  function handleFilterChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set("country", e.target.value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setSelectedCountry(e.target.value);
  }

  return (
    <div className="flex">
      <select
        value={selectedCountry}
        onChange={handleFilterChange}
        className="border border-gray-300 rounded-md px-4 py-2 text-gray-800"
      >
        <option value="Australia">Country</option>
        <option value="Australia">Australia</option>
        <option value="Singapore">Singapore</option>
        <option value="Malaysia">Malaysia</option>
        <option value="Japan">Japan</option>
      </select>
    </div>
  )
}

export default CountryDropDownFilter
