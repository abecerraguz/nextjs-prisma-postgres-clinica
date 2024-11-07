import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(request, { params }) {

    const getPaciente = await prisma.pacientes.findUnique({
        where: {
            pk_idPaciente: params.id
        }
    })
    return NextResponse.json(getPaciente)

}

export async function PUT(request, { params }) {
    try {
        const data = await request.json()
        const updatePacient = await prisma.pacientes.update({
            where: {
                pk_idPaciente: params.id
            },
            include: {
                expedientes: true,
            },
            data: data
        })
        return NextResponse.json(updatePacient)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}

export async function DELETE(request, { params }) {
    try {
        const deletePacientId = await prisma.pacientes.delete({
            where: {
                pk_idPaciente: params.id
            }
        })
        return NextResponse.json(deletePacientId)
    } catch (error) {
        return NextResponse.json(error.message)
    }
}