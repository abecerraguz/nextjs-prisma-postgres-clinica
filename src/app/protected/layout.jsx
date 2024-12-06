'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // npm install jwt-decode
import SessionManager from '@/components/SessionManager';

export default function ProtectedLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true); // Estado para bloquear renderizado
  const router = useRouter();

  useEffect(() => {
    const validateToken = async () => {
      const token = Cookies.get('token');

      if (!token) {
        router.replace('/login'); // Redirige al login si no hay token
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos

        if (decodedToken.exp < currentTime) {
          Cookies.remove('token'); // Limpia el token expirado
          router.replace('/login'); // Redirige al login si ha expirado
          return;
        }

        // Si el token es válido, permite el renderizado
        setIsLoading(false);
      } catch (error) {
        console.error('Token inválido:', error);
        Cookies.remove('token'); // Limpia el token inválido
        router.replace('/login'); // Redirige si el token no es válido
      }
    };

    validateToken();
  }, [router]);

  if (isLoading) {
    // Bloquea el renderizado mientras se valida el token
    return (
      <div className="contentSpinnerLoading">
        <div className="spinner"></div>
      </div>
    )}

  return <SessionManager>{children}</SessionManager>; // Renderiza el contenido si todo es válido
}
