'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

function SignInButton() {
  return (
    <button 
      onClick={() => signIn('google', { callbackUrl: '/account' })}
      className="flex items-center gap-4 font-semibold text-xl bg-primary-200 py-6"
    >
      <Image 
        src="https://authjs.dev/img/providers/google.svg"
        alt="Google logo"
        height="24"
        width="24" 
      />
      <span>Continue with Google</span>
    </button>
  )
}

export default SignInButton;