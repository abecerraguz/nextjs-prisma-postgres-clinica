import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(request, props) {
    const params = await props.params;

    const getCita = await prisma.cita.findUnique({
        where:{
            pk_idCita:params.id
        }
    })
    return NextResponse.json(getCita)
}

export async function PUT(request, props) {
    const params = await props.params;
    try {
        const data = await request.json()
        console.log('Data---->', data)
        console.log( 'Data---->', params.id )
        const updateEspecialist = await prisma.cita.update({
            where:{
                pk_idCita:params.id
            },
            data:data
        })
        return NextResponse.json(updateEspecialist)
    } catch (error) {
        return NextResponse.json('Mierda----->'+error.message)
    }
}

export async function DELETE(request, props) {
    const params = await props.params;
    try {
        console.log( 'Mierda dentro---->', params )
        const deleteEspecialistId = await prisma.cita.delete({
            where:{
                pk_idCita:params.id
            }
        })
        console.log('Salida de delete', deleteEspecialistId)
        return NextResponse.json( deleteEspecialistId )
    } catch (error) {
        return NextResponse.json(error.message)
    }
}