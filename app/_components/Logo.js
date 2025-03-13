import Link from "next/link";
import logo from '@/public/house.png'
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-4 z-10">
      <image
        src={logo}
        height="45"
        quality={100}
        width="45"
        sizes=""
        alt="Rental logo"
        className="rounded aspect-square object-cover"
      />
      <span className="text-xl font-semibold text-primary-100">
        Rental.com
      </span>
    </Link>

  )
}