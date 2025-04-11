
import "@/app/_styles/globals.css"
import { ReservationProvider } from "./_components/ReservationContext"
import { CityPositionProvider } from "./_components/CityPositionContext"
import { TableProvider } from "./_components/TableContext"
import Header from "./_components/Header"


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
      <body className="min-h-screen flex flex-col">
        <Header />
        <div className="px-8 py-12">
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
