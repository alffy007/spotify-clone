import Sidebar from '@/components/sidebar'
import './globals.css'
import { Figtree, Poppins } from 'next/font/google'
import SupabaseProvider from '@/providers/Supabaseprovider'
import UserProvider from '@/providers/UserProvider'
import ModelProvider from '@/providers/ModelProvider'
const font = Figtree({ subsets: ['latin'] })
const poppin = Poppins({ weight: "100", subsets: ['latin'] })

export const metadata = {
  title: 'Spotify 2.0',
  description: 'Alffys music wonderland!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModelProvider/>
              <Sidebar>
                {children}
              </Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
