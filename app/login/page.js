import SignInButton from "../_components/SignInButton";

export const metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-4 mt-8 items-center justify-center">
      <h2 className="text-xl font-semibold">
        Sign in / Sign up to access your account
      </h2>
      <SignInButton />
    </div>
  );
}