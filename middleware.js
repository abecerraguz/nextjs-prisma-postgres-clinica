import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get('token')?.value;

  // Rutas públicas
  if (pathname === '/' || pathname.startsWith('/login')) {
    return NextResponse.next();
  }

  // Verifica el token para rutas protegidas
  if (!token) {
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Decodifica el token
    const user = jwt.verify(token, SECRET_KEY);

    // Protege rutas basadas en roles
    if (pathname.startsWith('/admin') && user.role !== 'SUPERADMIN') {
      const unauthorizedUrl = new URL('/unauthorized', req.url);
      return NextResponse.redirect(unauthorizedUrl);
    }

    return NextResponse.next();
  } catch (error) {
    // Token inválido o expirado
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*', '/api/protected/:path*'], // Define las rutas protegidas
};
