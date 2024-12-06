'use client';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { useAppContext } from '@/context/AppContext';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation, faCircleUser } from "@fortawesome/free-solid-svg-icons";


// Esquema de validación con Yup
const validationSchema = Yup.object({
  email: Yup.string().email('Correo inválido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria')
});


const Login = () => {

  const { setIsAuthenticated, setRole } = useAppContext();
  const [alertaLogin, setAlertaLogin] = useState(false)
  const router = useRouter();

  const onClose = () => setAlertaLogin(false);

  const handleLogin = async (values, { resetForm }) => {

    const { email, password } = values

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
      // alert('Inicio de sesión fallido');
      setAlertaLogin(true)
      setTimeout(() => {
        setAlertaLogin(false)
      }, 5000);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 space-y-4 bg-gradient-to-r from-slate-900 to-slate-800 rounded-lg shadow-3xl">
          <div className='w-full flex flex-col items-center justify-center'>
              <FontAwesomeIcon
                icon={faCircleUser}
                className="fa-regular fa-circle-user py-1 text-emerald-300"
                style={{ fontSize: 76 }}
              />
          </div>
          <h2 className="text-2xl text-center text-white font-light tracking-widest border-b border-white-300">Iniciar sesión</h2>
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
                  className="input-autocomplete block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-white-transparent"
                  id="email"
                  name="email"
                />
                <ErrorMessage name="email" component="div" className="text-cyan-400 text-sm tracking-wider error p-1 pt-2 border-b border-white-500" />
              </div>

              <div>

                <Field
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="input-autocomplete block w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-white bg-white-transparent"
                  id="password"
                  name="password"
                />
                <ErrorMessage name="password" component="div" className="text-cyan-400 text-sm tracking-wider error p-1 pt-1.5 border-b border-white-500" />
              </div>

              <button
                type="submit"
                className="btn btn-sm btn-success hover:bg-cyan-600 hoer:text-white w-full mt-5 font-normal tracking-widest text-base"
              >
                Ingresar
              </button>
            </Form>
          </Formik>
        </div>
      </div>

      {alertaLogin && (
        <dialog id="my_modal_2" className="modal" open={alertaLogin}>
          <div className="modal-box">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={onClose}>✕</button>
              <div className="flex flex-col items-center justify-center">
              <FontAwesomeIcon
                icon={faCircleExclamation}
                className="fa-regular fa-pen-to-square py-5"
                style={{ fontSize: 48 }}
              />
              <h2 className="text-center font-bold tracking-wide text-lg md:text-xl mb-3 border-b border-stone-500 pb-1 uppercase">Inicio de sesión fallido</h2>
              <p>Usuario o contraseña incorrectos</p>
              </div>
          </div>
        </dialog>
      )}

    </>

  );
};

export default Login;

