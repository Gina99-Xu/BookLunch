'use client'

export default function Error({ error, reset }) {
  return (
    <main className="flex justify-center items-center ">
      <h2>
        Somthing went wrong!
      </h2>
      <p>{error.message}</p>
      <button>Try again</button>
    </main>)
}