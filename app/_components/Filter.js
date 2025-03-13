'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "./Button";


export function Filter() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("country");

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("country", filter);
    console.log(params)
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex justify-end gap-2 ">
      <Button filter="Australia"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        Australia
      </Button>
      <Button filter="Singapore"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        Singapore
      </Button>
      <Button filter="Malaysia"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        Malaysia
      </Button>
      <Button filter="Japan"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        Japan
      </Button>
    </div>
  )
}


