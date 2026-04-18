import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { verifyAuth } from '@/utils/verifyAuth'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const pacienteId = searchParams.get('pacienteId')
  const where = pacienteId ? { pacienteId } : {}
  const diagnosticos = await prisma.diagnostico.findMany({
    where,
    include: { especialista: true, paciente: true },
    orderBy: { fechaCreacion: 'desc' },
  })
  return NextResponse.json(diagnosticos)
}

export async function POST(request) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error
  try {
    const data = await request.json()
    const diagnostico = await prisma.diagnostico.create({
      data: {
        pacienteId: data.pacienteId,
        especialistaId: data.especialistaId || null,
        edad: Number(data.edad),
        peso: Number(data.peso),
        altura: Number(data.altura),
        imc: Number(data.imc),
        nivelPeso: data.nivelPeso,
        presionArterial: data.presionArterial,
        diagnostico: data.diagnostico,
        recetario: data.recetario,
      },
    })
    return NextResponse.json(diagnostico, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
