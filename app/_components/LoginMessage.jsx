import Link from "next/link";

function LoginMessage() {
  return (
    <div className="flex items-center justify-center mx-10 my-10">
      <p className="text-center text-xl text-amber-600 font-bold">
        Please{" "}
        <Link href="/login" className="underline text-accent-500 hover:text-accent-400">
          login
        </Link>{" "}
        to reserve this
        <br /> property now
      </p>
    </div>
  );
}

export default LoginMessage;