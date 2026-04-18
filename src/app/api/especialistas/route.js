import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { verifyAuth } from '@/utils/verifyAuth'

export async function GET() {
  const especialistas = await prisma.especialista.findMany({ where: { activo: true }, orderBy: { nombre: 'asc' } })
  return NextResponse.json(especialistas)
}

export async function POST(request) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error
  const data = await request.json()
  const especialista = await prisma.especialista.create({ data })
  return NextResponse.json(especialista, { status: 201 })
}
