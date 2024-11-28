import Header from "./_components/Header"
import "@/app/_styles/globals.css"

export const metadata = {
  title: {
    template: `Rentals | %s`,
    default: "Rentals"
  },
  description: 'book your insepction now!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-primary-750 text-primary-850 min-h-screen flex flex-col relative">
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
