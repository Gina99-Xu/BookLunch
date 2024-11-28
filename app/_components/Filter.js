'use client'

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "./Button";



export function Filter() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("capacity");

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="border border-primary-800 flex">
      <Button filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        All properties
      </Button>
      <Button filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        up to 3 guests
      </Button>
      <Button filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        up to 5 guests
      </Button>
      <Button filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}>
        6 or more guests
      </Button>
    </div>
  )
}


