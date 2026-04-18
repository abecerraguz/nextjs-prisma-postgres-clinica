import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { verifyAuth } from '@/utils/verifyAuth'

export async function GET(request, context) {
  const { id } = await context.params
  const paciente = await prisma.paciente.findUnique({
    where: { id },
    include: { citas: { include: { especialista: true } }, diagnosticos: { orderBy: { fechaCreacion: 'desc' } } },
  })
  if (!paciente) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(paciente)
}

export async function PUT(request, context) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error
  const { id } = await context.params
  const data = await request.json()
  try {
    const updated = await prisma.paciente.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request, context) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error
  const { id } = await context.params
  try {
    const deleted = await prisma.paciente.delete({ where: { id } })
    return NextResponse.json(deleted)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
