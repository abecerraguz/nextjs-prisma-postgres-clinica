// Sólo sirve en la lógica del cliente
import { NextResponse } from 'next/server';

export function middleware(req) {
  console.log('Mirda-->')
  const token = req.cookies.get('token'); // Obtiene el token de las cookies
  const loginUrl = new URL('/login', req.url); // URL para redirigir al login

  // Verifica si la ruta es protegida
  if (req.nextUrl.pathname.startsWith('/especialistas') || req.nextUrl.pathname.startsWith('/pacientes')) {
    if (!token) {
      return NextResponse.redirect(loginUrl); // Redirige si no hay token
    }
  }

  return NextResponse.next(); // Continúa con la solicitud si hay token
}

export const config = {
  matcher: ['/especialistas/:path*', '/pacientes/:path*'], // Rutas protegidas
};
