'use client'
import { usePathname, useSearchParams, useRouter } from "next/navigation";

import { useState } from "react";

function MinimumSpentFilter() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeFilter = searchParams.get('minimum');

  const [selectedMinium, setSelectedMinium] = useState(10);

  function handleFilterChange(e) {
    const params = new URLSearchParams(searchParams);
    params.set("minimum", e.target.value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    setSelectedMinium(e.target.value);
  }

  return (
    <div className="flex justify-end gap-2">
      <select
        value={selectedMinium}
        onChange={handleFilterChange}
        className="border border-gray-300 rounded-xl px-4 py-2 text-gray-800"
      >
        <option value="10">Minium Spent (AUD)</option>
        <option value="10">10 AUD</option>
        <option value="20">20 AUD</option>
        <option value="30">30 AUD</option>
        <option value="40">40 AUD</option>
      </select>
    </div>
  )
}

export default MinimumSpentFilter
