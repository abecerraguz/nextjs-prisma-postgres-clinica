'use client'; // Importante: este componente debe ser del lado del cliente

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { isTokenExpired } from '@/utils/auth';

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];
  
      if (isTokenExpired(token) === null ) {
          router.push('/login'); // Redirige al login si el token ha expirado
      }

  }, [router]);

  return (
    <section className='container m-auto min-h-screen px-5 py-20'>
      <h1 className='text-xl font-bold tracking-wider uppercase border-b border-white-500 mb-5 py-3'>Bienvenido al Dashboard</h1>
    </section>
  );
};

export default Dashboard;
