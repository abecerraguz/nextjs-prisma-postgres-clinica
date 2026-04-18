import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET() {
  try {
    const hoy = new Date()
    const inicioHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate())
    const finHoy = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate() + 1)

    const [totalPacientes, totalEspecialistas, totalCitas, totalDiagnosticos, citasHoy, pacientesActivos] = await Promise.all([
      prisma.paciente.count(),
      prisma.especialista.count(),
      prisma.cita.count(),
      prisma.diagnostico.count(),
      prisma.cita.count({ where: { fecha: { gte: inicioHoy, lt: finHoy } } }),
      prisma.paciente.count({ where: { activo: true } }),
    ])
    return NextResponse.json({ totalPacientes, totalEspecialistas, totalCitas, totalDiagnosticos, citasHoy, pacientesActivos })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
