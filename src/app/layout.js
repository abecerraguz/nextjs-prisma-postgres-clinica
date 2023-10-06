import './globals.css'
import { Roboto_Condensed } from 'next/font/google'
import NavBars from '@/components/NavBars';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
const roboto =  Roboto_Condensed({ 
    subsets: ['latin'],
    display:"fallback",
    style:'normal',
    weight:"400"
  })

export const metadata = {
  title: 'The Clinic',
  description: 'Web App desarrollada con NextJs',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {/* <Loading/> */}
        <NavBars/>
        {children}
        <Footer/>
      </body>
    </html>
  )
}
