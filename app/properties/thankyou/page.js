import Link from "next/link";

export default function Page() {

  return (
    <div className="text-center space-y-6 mt-4">
      <h2 className="text-3xl font-semibold">
        Thank you for your booking with us! We will be sending out confirmation email shortly, and enjoy your meal!
      </h2>
      <Link
        href="/account/reservations"
        className="underline text-xl text-accent-500 inline-block"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}