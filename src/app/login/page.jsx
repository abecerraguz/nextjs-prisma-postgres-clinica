'use client';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


// Esquema de validación con Yup
const validationSchema = Yup.object({
      email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
      password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria')
});


const Login = () => {

  const { setIsAuthenticated, setRole } = useAppContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();





  const handleLogin = async (values, { resetForm }) => {
   
    const {email, password} = values
    
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
      resetForm();
    } else {
      alert('Inicio de sesión fallido');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="w-full max-w-md p-8 space-y-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-3xl">
      <h2 className="text-2xl font-bold text-center text-white">Iniciar sesión</h2>
      {/* {error && <p className="text-sm text-red-600">{error}</p>} */}
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={handleLogin}
      >
        <Form className="space-y-6" method="dialog">
          <div>
              <Field 
                type="email" 
                placeholder="Ingresa tu correo"
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-white-transparent"
                id="email"
                name="email"
              />
              <ErrorMessage name="email" component="div" className="text-cyan-400 text-sm tracking-wider error p-1 pt-2 border-b border-white-500" />
          </div>

          <div>

          <Field 
                type="password" 
                placeholder="Ingresa tu contraseña"
                className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-white-transparent"
                id="password"
                name="password"
          />
          <ErrorMessage name="password" component="div" className="text-cyan-400 text-sm tracking-wider error p-1 pt-1.5 border-b border-white-500" />
          </div>

          <button
            type="submit"
            className="btn btn-sm btn-success hover:bg-cyan-600 w-full mt-5 font-normal"
          >
            Login
          </button>
        </Form>
      </Formik>
    </div>
  </div>
   
  );
};

export default Login;

