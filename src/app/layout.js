
import './globals.css'
import { Roboto_Condensed } from 'next/font/google'
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { AppProvider } from '@/context/AppContext';


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
    <html lang="es" data-theme="mytheme">
      <body className={`${roboto.className}`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  )
}
