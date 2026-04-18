'use client'
import { Formik, Field, ErrorMessage, Form } from 'formik'
import * as Yup from 'yup'
import { useAppContext } from '@/context/AppContext'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Isotipo from '../../../public/isotipo.png'

const validationSchema = Yup.object({
  email: Yup.string().email('Correo invalido').required('El correo es obligatorio'),
  password: Yup.string().min(6, 'Minimo 6 caracteres').required('La contrasena es obligatoria'),
})

export default function Login() {
  const { setIsAuthenticated, setRole } = useAppContext()
  const [loginError, setLoginError] = useState(false)
  const router = useRouter()

  const handleLogin = async (values, { resetForm }) => {
    setLoginError(false)
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(values),
      headers: { 'Content-Type': 'application/json' },
    })

    if (res.ok) {
      const { token } = await res.json()
      document.cookie = 'token=' + token + '; path=/'
      const decoded = JSON.parse(atob(token.split('.')[1]))
      setIsAuthenticated(true)
      setRole(decoded.role)
      router.push('/protected/dashboard')
      resetForm()
    } else {
      setLoginError(true)
      setTimeout(() => setLoginError(false), 5000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="w-full max-w-sm px-4">
        {/* Logo + nombre */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-primary/20 rounded-2xl p-4 mb-4 backdrop-blur-sm border border-primary/30">
            <Image src={Isotipo} alt="Logo" className="h-10 w-auto" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">The Clinic</h1>
          <p className="text-slate-400 text-sm mt-1">Sistema de administracion de citas</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-lg font-semibold text-slate-800 mb-6">Iniciar sesion</h2>

          {loginError && (
            <div className="alert alert-error mb-4 py-2 text-sm">
              <span>Usuario o contrasena incorrectos</span>
            </div>
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="correo@ejemplo.com"
                    className="input input-bordered w-full bg-slate-50 focus:bg-white text-slate-800"
                  />
                  <ErrorMessage name="email" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Contrasena <span className="text-red-500">*</span>
                  </label>
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className="input input-bordered w-full bg-slate-50 focus:bg-white text-slate-800"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1" />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full mt-2"
                >
                  {isSubmitting ? <span className="loading loading-spinner loading-sm"></span> : 'Ingresar'}
                </button>
              </Form>
            )}
          </Formik>

          {/* Credenciales demo */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-500 font-medium mb-2">Cuentas de acceso:</p>
            <div className="space-y-1 text-xs text-slate-400 font-mono">
              <p>superadmin@example.com / superadmin123</p>
              <p>user1@example.com / user123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
