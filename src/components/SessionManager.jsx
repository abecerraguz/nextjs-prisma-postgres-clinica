'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';
import { useAppContext } from '@/context/AppContext';

export default function SessionManager({ children }) {

  const [timeLeft, setTimeLeft] = useState(null); // Tiempo restante en segundos
  const [showModal, setShowModal] = useState(false); // Mostrar modal
  const router = useRouter();
  const { setIsAuthenticated } = useAppContext();

  useEffect(() => {
    const token = Cookies.get('token');

    if (!token) {
      setIsAuthenticated(false);  
      router.push('/login');
      return;
    }

    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000); // Tiempo actual en segundos
      const remainingTime = decodedToken.exp - currentTime; // Tiempo restante del token

      if (remainingTime <= 0) {
        Cookies.remove('token');
        setIsAuthenticated(false);
        router.push('/login');
        return;
      }
      setIsAuthenticated(true);
      setTimeLeft(remainingTime); // Configura el tiempo restante

      // Mostrar modal 1 minuto antes de la expiración
      const warningTime = Math.max(remainingTime - 60, 0);
      setTimeout(() => setShowModal(true), warningTime * 1000);

      // Redirigir al login cuando se agote el tiempo
      const logoutTimeout = setTimeout(() => {
        Cookies.remove('token');
        setIsAuthenticated(false);
        router.push('/login');
      }, remainingTime * 1000);

      return () => clearTimeout(logoutTimeout); // Limpia el timeout
    } catch (error) {
      console.error('Token inválido:', error);
      Cookies.remove('token');
      setIsAuthenticated(false);
      router.push('/login');
    }
  }, [router, setIsAuthenticated ]);

  useEffect(() => {
    if (!showModal || timeLeft === null) return;

    // Inicia la cuenta regresiva
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo
  }, [showModal]);

  console.log('Tiempo restante-->', timeLeft )

  return (
    <>
      {children}
      {showModal && (
        <dialog id="my_modal_2" className="modal" open={showModal}>
        <div className="modal-box">
            <div className="flex-auto flex-col items-start info">
                <h2 className="text-center font-bold tracking-wide text-lg md:text-xl mb-3 border-b border-stone-500 pb-1 uppercase">Sesión por expirar</h2>
                <div className="grid grid-cols-1">
                    <p>Tu sesión expirará en <strong>{timeLeft}</strong> segundos.</p>
                    <p>Guarda tu progreso o vuelve a iniciar sesión.</p>
                </div>
            </div>
        </div>
    </dialog>
      )}
    </>
  );
}
