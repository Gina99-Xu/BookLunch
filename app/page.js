import Image from 'next/image';
import Link from 'next/link';
import bgone from '@/public/images/bgone.jpg'
import SearchInputBox from './_components/SearchBox';


export default function Page() {
  return (
    <main className="mt-24">
      <div className='opacity-40'>
        <Image
          src={bgone}
          fill
          className="object-cover pt-24"
          alt="food"
        />
      </div>
      <div className='opacity-95'>
        <h1 className="mt-4 text-3xl text-black  mb-10 tracking-tight font-bold">
          Enjoy Meals at Discounted Price with Strangers
        </h1>
      </div>
      <div className="relative z-10 text-center flex flex-rows gap-4">
        <SearchInputBox />
      </div>
      <div className="relative z-10 text-center flex flex-rows gap-4">
        <Link
          href="/restaurants"
          className="
          border border-gray-100 rounded-md 
          bg-accent-500 px-6 py-6 text-black font-semibold hover:bg-accent-600 transition-all"
        >
          How it Works
        </Link>
        <Link
          href="/restaurants"
          className="
          border border-gray-100 rounded-md 
          bg-accent-500 px-6 py-6 text-black font-semibold hover:bg-accent-600 transition-all"
        >
          Explore Restaurants
        </Link>
      </div>
    </main>
  )
}