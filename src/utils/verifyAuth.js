import jwt from 'jsonwebtoken'
import { NextResponse } from 'next/server'

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key'

/**
 * Verifica el token JWT de la request y retorna el payload decodificado.
 * Si el token es inválido o no está presente, retorna una NextResponse de error.
 */
export function verifyAuth(request, allowedRoles = []) {
  const cookieHeader = request.headers.get('cookie') || ''
  const tokenCookie = cookieHeader.split('; ').find((c) => c.startsWith('token='))
  const token = tokenCookie?.split('=')[1]

  if (!token) {
    return {
      error: NextResponse.json({ error: 'No autorizado' }, { status: 401 }),
    }
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)

    if (allowedRoles.length > 0 && !allowedRoles.includes(decoded.role)) {
      return {
        error: NextResponse.json({ error: 'Acceso denegado' }, { status: 403 }),
      }
    }

    return { user: decoded }
  } catch {
    return {
      error: NextResponse.json({ error: 'Token inválido o expirado' }, { status: 401 }),
    }
  }
}
