import Link from "next/link";

export default function Page() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Thank you for your booking with us!
        </h2>
        <p className="text-lg text-gray-600">
          We will be sending out a confirmation email shortly. Enjoy your meal!
        </p>
        <Link
          href="/account/reservations"
          className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
        >
          Manage your reservations
          <span aria-hidden="true" className="font-bold">→</span>
        </Link>
      </div>
    </div>
  );
}