import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {

  const session = await auth()

  return (
    <nav className="z-10 text-l mx-4 pt-8 font-semibold flex">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/"
            className="hover:text-accent-400 transition-colors"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/map"
            className="hover:text-accent-400 transition-colors"
          >
            Map
          </Link>
        </li>
        <li>
          <Link
            href="/properties"
            className="hover:text-accent-400 transition-colors"
          >
            Restaurants
          </Link>
        </li>
        {session?.user ? <li>
          <Link
            href="/account/reservations"
            className="hover:text-accent-400 transition-colors"
          >
            My Reservations
          </Link>
        </li> : <></>}

        {session?.user?.image ?
          <Link href='/account' className="flex items-center gap-4 hover:text-accent-400 transition-colors">
            <img className="h-8 rounded-full"
              src={session.user.image}
              alt={session.user.name}
              referrerPolicy="no-referrer"
            />
            <span>Welcome {session.user.name}</span>
          </Link> :
          <li>
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Login/Signup
            </Link>
          </li>}
      </ul>
    </nav>
  )
}