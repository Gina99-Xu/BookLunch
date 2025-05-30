'use client'

import { CalendarDaysIcon, HomeIcon, UserIcon } from "@heroicons/react/24/solid"
import Link from "next/link"
import { usePathname } from "next/navigation"
import SignOutButton from "./SignOutButton"

const navLinks = [

  {
    name: 'My Profile',
    href: "/account",
    icon: <UserIcon className="h-5 w-5 text-primary-850" />
  },
  {
    name: 'My Bookings',
    href: "/account/reservations",
    icon: <CalendarDaysIcon className="h-5 w-5 text-primary-850" />
  },

]
export default function SideNavigation() {

  const pathname = usePathname();

  return (

    <nav className="border-r border-primary-800">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link className={`py-3 px-5 hover:bg-primary-800 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-850 ${pathname === link.href ? "bg-primary-750" : ""
              }`} href={link.href}>{link.icon}<span>{link.name}</span></Link>
          </li>
        ))}
        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  )
}