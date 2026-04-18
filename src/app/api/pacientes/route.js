import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { verifyAuth } from '@/utils/verifyAuth'

export async function GET() {
  const pacientes = await prisma.paciente.findMany({
    include: { citas: { include: { especialista: true } }, diagnosticos: true },
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(pacientes)
}

export async function POST(request) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error

  const data = await request.json()
  const paciente = await prisma.paciente.create({ data })
  return NextResponse.json(paciente, { status: 201 })
}
