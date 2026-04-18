'use client'
import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import Link from 'next/link'
import Image from 'next/image'
import Isotipo from '../../../public/isotipo.png'
import SessionManager from '@/components/SessionManager'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGauge,
  faUserInjured,
  faUserDoctor,
  faCalendarCheck,
  faRightFromBracket,
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'

const NAV_ITEMS = [
  { href: '/protected/dashboard',     label: 'Dashboard',     icon: faGauge },
  { href: '/protected/pacientes',     label: 'Pacientes',     icon: faUserInjured },
  { href: '/protected/especialistas', label: 'Especialistas', icon: faUserDoctor },
  { href: '/protected/citas',         label: 'Citas',         icon: faCalendarCheck },
]

function Sidebar({ collapsed, onToggle }) {
  const pathname = usePathname()

  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/login'
  }

  return (
    <aside className={
      'fixed top-0 left-0 h-full bg-white border-r border-slate-200 flex flex-col z-40 transition-all duration-300 shadow-sm ' +
      (collapsed ? 'w-16' : 'w-56')
    }>
      {/* Logo */}
      <div className={'flex items-center border-b border-slate-100 ' + (collapsed ? 'justify-center py-4 px-2' : 'gap-3 px-5 py-4')}>
        <Image src={Isotipo} alt="Logo" className="h-8 w-auto shrink-0" />
        {!collapsed && (
          <div>
            <p className="text-sm font-bold text-slate-800 leading-tight">The Clinic</p>
            <p className="text-xs text-slate-400">Administrador</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ' +
                (active
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
              }
              title={collapsed ? item.label : undefined}
            >
              <FontAwesomeIcon icon={item.icon} className={'shrink-0 ' + (collapsed ? 'text-base' : 'text-sm w-4')} />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer: toggle + logout */}
      <div className="px-2 pb-4 space-y-1 border-t border-slate-100 pt-3">
        <button
          onClick={onToggle}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-slate-500 hover:bg-slate-100 text-sm transition-colors"
          title="Colapsar sidebar"
        >
          <FontAwesomeIcon icon={collapsed ? faBars : faXmark} className="shrink-0 w-4" />
          {!collapsed && <span>Colapsar</span>}
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-500 hover:bg-red-50 text-sm transition-colors"
          title="Cerrar sesion"
        >
          <FontAwesomeIcon icon={faRightFromBracket} className="shrink-0 w-4" />
          {!collapsed && <span>Cerrar sesion</span>}
        </button>
      </div>
    </aside>
  )
}

export default function ProtectedLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true)
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) { router.replace('/login'); return }
    try {
      const decoded = jwtDecode(token)
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        Cookies.remove('token')
        router.replace('/login')
        return
      }
      setIsLoading(false)
    } catch {
      Cookies.remove('token')
      router.replace('/login')
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  const sidebarW = collapsed ? 'ml-16' : 'ml-56'

  return (
    <SessionManager>
      <div className="min-h-screen bg-slate-100">
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(p => !p)} />
        <main className={'transition-all duration-300 ' + sidebarW}>
          <div className="min-h-screen p-6 pt-6">
            {children}
          </div>
        </main>
      </div>
    </SessionManager>
  )
}
