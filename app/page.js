import Image from "next/image";
import Link from "next/link";
import bg2 from "@/public/bg2.jpg"

export default function Page() {
  return (<div className="mt-24">
    <Image
      src={bg2}
      fill
      placeholder="blur"
      quality={80}

      className="object-cover object-top opacity-55"
      alt="House background image"
    />

    <div className="relative z-10 text-center">

      <Link
        href="/properties"
        className="bg-accent-500 px-8 py-6 text-primary-850 text-lg font-semibold hover:bg-accent-600 transition-all"
      >
        Explore Resort Now
      </Link>
    </div>
  </div>
  )
}