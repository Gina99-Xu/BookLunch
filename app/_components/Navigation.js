import Link from "next/link";
import { auth } from "../_lib/auth";
import { HomeIcon } from "@heroicons/react/24/solid";

export default async function Navigation() {
  const session = await auth();

  return (
    <div className="px-8 py-8 font-semibold flex justify-between items-center mx-auto gap-8">
      <div className="z-10 flex items-center">
        <Link href="/" className="hover:text-accent-400 transition-colors">
          <HomeIcon className="h-8 w-8 text-primary-850" />
        </Link>
      </div>
      <div className="z-10  flex gap-8 items-center">
        <Link href="/restaurants" className="hover:text-accent-400 transition-colors">
          Restaurants
        </Link>
        {session?.user ? (
          <Link href="/account/reservations" className="hover:text-accent-400 transition-colors">
            My Bookings
          </Link>
        ) : null}

        {session?.user?.image ? (
          <Link href="/account" className="flex items-center gap-4 hover:text-accent-400 transition-colors">
            <img
              className="h-8 rounded-full"
              src={session.user.image}
              alt={session.user.name}
              referrerPolicy="no-referrer"
            />
            <span>Welcome {session.user.name}</span>
          </Link>
        ) : (
          <Link href="/account" className="hover:text-accent-400 transition-colors">
            Login/Signup
          </Link>
        )}
      </div>
    </div>
  );
}