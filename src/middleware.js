// Sólo sirve en la lógica del cliente
import { NextResponse } from 'next/server';

export function middleware(req) {

  console.log('Salida-->')
  
  const token = req.cookies.get('token'); // Obtiene el token de las cookies
  const loginUrl = new URL('/login', req.url); // URL para redirigir al login

  // Verifica si la ruta es protegida
  if ( req.nextUrl.pathname.startsWith('/protected/especialistas')  || req.nextUrl.pathname.startsWith('/protected/pacientes') || req.nextUrl.pathname.startsWith('/protected/dashboard')) {
    if (!token) {
      return NextResponse.redirect(loginUrl); // Redirige si no hay token
    }
  }

  return NextResponse.next(); // Continúa con la solicitud si hay token
}

export const config = {
  matcher: [ '/protected/especialistas', '/protected/pacientes', '/protected/dashboard' ], // Rutas protegidas
};



