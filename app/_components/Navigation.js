import Link from "next/link";
import { auth } from "../_lib/auth";
import { HomeIcon } from "@heroicons/react/24/solid";

export default async function Navigation() {

  const session = await auth();

  return (
    <nav className="h-[80px]
    bg-gray-100/80 backdrop-blur-sm px-8 py-4 font-semibold flex justify-between items-center mx-auto gap-8 
     ">
      <div className="flex items-center">
        < Link href="/" className="hover:text-accent-400 transition-colors" >
          <HomeIcon className="h-8 w-8 " />
        </Link >
      </div >
      <div className="flex gap-8 items-center">
        <Link href="/restaurants" className="hover:text-accent-400 transition-colors ">
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
        
          </Link>
        ) : (
          <div className="flex gap-4">
     
          <Link href="/login" className="hover:text-accent-400 transition-colors ">
            Login in
          </Link>
              
          <Link href="/login" className="hover:text-accent-400 transition-colors ">
            Signup
          </Link>
          </div>
        )}
      </div>
    </nav >
  );
}