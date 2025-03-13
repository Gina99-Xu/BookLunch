
import Image from 'next/image';
import Link from 'next/link';
import bg from '@/public/images/bg.jpg'


export default function Page() {

  return (
    <main className="mt-24">
      <div className='opacity-50'>
        <Image
          src={bg}
          fill
          className="object-cover"
          alt="food"
        />

      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-3xl text-gray-500 mb-10 tracking-tight font-normal">
          Social Meals with Discounted Price
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          How it works
        </Link>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore Restaurants
        </Link>
      </div>
    </main>
  )
}