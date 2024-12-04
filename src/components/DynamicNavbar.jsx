'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import GuestNavbar from '@/components/GuestNavbar';
import AdminNavbar from '@/components/AdminNavbar';
import { isTokenExpired } from '@/utils/auth';

const DynamicNavbar = () => {

  const [ user, setUser ] = useState();
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    console.log('Salida de token DynamicNavBar-->',  token )
    const decodedUser = isTokenExpired(token);
    console.log('Salida de decodedUser-->',  decodedUser?.role  )
   
    if (decodedUser === null) {
      router.push('/login'); // Redirige al login si el token es inválido
    } else {
      const rol = decodedUser?.role
      setUser(rol);
    }
  }, [router]);

  console.log('Salida de user in DynamicNavBar-->',  user )

  // if (user === undefined) {
  //   return null; // Muestra una pantalla de carga o nada mientras redirige
  // }

  // console.log('Llego al final de DynamicNavBar-->')
  if ( user === 'SUPERADMIN') {
    return <AdminNavbar />;
  }else{
    return <GuestNavbar />;
  }
 

};

export default DynamicNavbar;
