import { signInAction } from '@/app/_lib/actions'
import Image from 'next/image';


function SignInButton() {
  return (
    <form action={signInAction}>
      <button className="flex items-center gap-4 font-semibold text-xl bg-primary-200 py-6">
        <Image src="https://authjs.dev/img/providers/google.svg"
          alt="Google logo"
          height="24"
          width="24" />
        <span>Conntinue with Google</span>
      </button>
    </form>
  )
}

export default SignInButton;