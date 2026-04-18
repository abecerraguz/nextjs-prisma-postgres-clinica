import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { verifyAuth } from '@/utils/verifyAuth'

export async function PUT(request, context) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error
  const { id } = await context.params
  const data = await request.json()
  try {
    const updated = await prisma.cita.update({
      where: { id },
      data: { ...data, fecha: data.fecha ? new Date(data.fecha) : undefined },
    })
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
    const deleted = await prisma.cita.delete({ where: { id } })
    return NextResponse.json(deleted)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
