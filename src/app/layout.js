
import './globals.css'
import { Roboto_Condensed } from 'next/font/google'
// import NavBars from '@/components/Navbars';
import Footer from '@/components/Footer';
import Loading from '@/components/Loading';
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { AppProvider } from '@/context/AppContext';
import Navbar from '@/components/NavBars';





const roboto =  Roboto_Condensed({ 
    subsets: ['latin'],
    display:"fallback",
    style:'normal',
    weight:["300","400", "700"]
})

export const metadata = {
  title: 'The Clinic',
  description: 'Web App desarrollada con NextJs',
}



export default function RootLayout({ children }) {

  // const cookieStore = cookies();
  // const token = cookieStore.get('token')?.value; // Obtén el token desde las cookies
  // console.log('Salida de app--->', isTokenExpired(token) === null)


  return (
    <html lang="en">
      <body className={`${roboto.className} flex flex-col min-h-screen`}>
          <AppProvider>
            <Navbar/>
            {children}
            <Footer/>
          </AppProvider>
      </body>
    </html>
  )
}
