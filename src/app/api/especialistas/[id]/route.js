import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { verifyAuth } from '@/utils/verifyAuth'

export async function GET(request, context) {
  const { id } = await context.params
  const e = await prisma.especialista.findUnique({ where: { id } })
  if (!e) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(e)
}

export async function PUT(request, context) {
  const { error } = verifyAuth(request, ['ADMIN', 'SUPERADMIN'])
  if (error) return error
  const { id } = await context.params
  const data = await request.json()
  try {
    const updated = await prisma.especialista.update({ where: { id }, data })
    return NextResponse.json(updated)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request, context) {
  const { error } = verifyAuth(request, ['SUPERADMIN'])
  if (error) return error
  const { id } = await context.params
  try {
    const deleted = await prisma.especialista.delete({ where: { id } })
    return NextResponse.json(deleted)
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
