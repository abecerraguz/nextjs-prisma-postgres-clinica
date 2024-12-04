import { prisma } from '@/libs/prisma'; // Importa tu instancia de Prisma
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request) {

  if (request.method !== 'POST') {
    return NextResponse.json({ message: 'Método no permitido' }, { status: 405 });
  }

  const data = await request.json()
  const { email, password } = data;

  try {
    // Buscar usuario en la base de datos
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 });
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Credenciales invalidas' }, { status: 401 });
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1m' }
    );

    // res.status(200).json({ token });
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    // res.status(500).json({ message: 'Internal server error' });
    return NextResponse.json({ message: 'Error Interno del Servidor' }, { status: 500 });
  }
}
