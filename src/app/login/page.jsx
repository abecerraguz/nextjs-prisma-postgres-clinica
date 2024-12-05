'use client';

import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const Login = () => {

  const { setIsAuthenticated, setRole } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault()
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const { token } = await response.json();

      // Guardar el token en las cookies
      document.cookie = `token=${token}; path=/`;

      // Decodificar el token para obtener el rol
      const decoded = JSON.parse(atob(token.split('.')[1]));
      setIsAuthenticated(true);
      setRole(decoded.role); // Establece el rol desde el token
      router.push('protected/pacientes');
    } else {
      alert('Inicio de sesión fallido');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md p-8 space-y-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-3xl">
      <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
      {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-600"
            placeholder="Enter your password"

          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Login
        </button>
      </form>
      <p className="text-sm text-center text-gray-400">
        Don't have an account?{' '}
        <a href="/register" className="text-blue-400 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  </div>
   
  );
};

export default Login;

