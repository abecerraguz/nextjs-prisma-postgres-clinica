'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode'; // Necesitarás instalar esta librería: npm install jwt-decode

export default function ProtectedLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('token'); // Obtén el token de las cookies

    if (!token) {
      router.push('/login'); // Redirige al login si no hay token
      return;
    }

    try {
      const decodedToken = jwtDecode(token); // Decodifica el token para obtener su información
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

      if (decodedToken.exp < currentTime) {
        // Si el token ha expirado, redirige al login
        Cookies.remove('token'); // Opcional: Borra la cookie del token
        document.cookie = 'token=; Max-Age=0'; // Elimina el token
        router.push('/login');
        return;
      }
    } catch (error) {
      console.error('Error decodificando el token:', error);
      router.push('/login'); // Si el token no es válido, redirige al login
      return;
    }
  }, [router]);

  return <>{children}</>; // Renderiza el contenido si el token es válido
}
