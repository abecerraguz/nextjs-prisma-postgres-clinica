import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { verifyAuth } from '@/utils/verifyAuth'

export async function GET() {
  const citas = await prisma.cita.findMany({
    include: { paciente: true, especialista: true },
    orderBy: { fecha: 'desc' },
  })
  return NextResponse.json(citas)
}

export async function POST(request) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error
  const data = await request.json()
  try {
    const cita = await prisma.cita.create({
      data: { ...data, fecha: new Date(data.fecha) },
      include: { paciente: true, especialista: true },
    })
    return NextResponse.json(cita, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
