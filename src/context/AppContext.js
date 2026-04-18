'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado inicial
  const [role, setRole] = useState(null); // Estado del rol del usuario

  useEffect(() => {
    // Leer el token de las cookies al cargar la aplicación
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (token) {
      const [, value] = token.split('='); // Obtener el valor del token
      setIsAuthenticated(true);
      // Suponiendo que el rol está en el token decodificado (puedes usar jwt-decode si necesitas)
      const decoded = JSON.parse(atob(value.split('.')[1]));
      setRole(decoded.role); // Asigna el rol desde el token
    } else {
      setIsAuthenticated(false);
      setRole(null);
    }
  }, []); // Se ejecuta al cargar la página

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, role, setRole }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
