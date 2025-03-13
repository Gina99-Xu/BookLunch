import Header from "./_components/Header"
import "@/app/_styles/globals.css"
import { ReservationProvider } from "./_components/ReservationContext"
import { CityPositionProvider } from "./_components/CityPositionContext"
import { TableProvider } from "./_components/TableContext"

export const metadata = {
  title: {
    template: `Eat with Less | %s`,
    default: "Eat with Less"
  },
  description: 'Book your reservations today!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased bg-primary-750 text-primary-850 min-h-screen flex flex-col relative">
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">
            <CityPositionProvider>
              <ReservationProvider>
                <TableProvider>
                  {children}
                </TableProvider>
              </ReservationProvider>
            </CityPositionProvider>
          </main>
        </div>
      </body>
    </html >
  )
}
