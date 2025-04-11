'use client'
import { useFormStatus } from "react-dom";
import { Loader2 } from 'lucide-react';

export default function SubmitButton({ children, pendingLabel, className }) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className={`inline-flex items-center justify-center gap-2 transition-colors ${
        pending ? 'opacity-70 cursor-not-allowed' : ''
      } ${className || 'bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg font-medium'}`}
    >
      {pending && <Loader2 className="h-4 w-4 animate-spin" />}
      {pending ? pendingLabel : children}
    </button>
  );
}