import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET( request, { params } ){
    
    const getEspecialist = await prisma.especialista.findUnique({
        where:{
            pk_idEspecialista:params.id
        }
    })
    return NextResponse.json(getEspecialist)

}

export async function PUT( request, { params } ){
    try {
        const data = await request.json()
        console.log('Data---->', data)
        console.log( 'Data---->', params.id )
        const updateEspecialist = await prisma.especialista.update({
            where:{
                pk_idEspecialista:params.id
            },
            data:data
        })
        return NextResponse.json(updateEspecialist)
    } catch (error) {
        return NextResponse.json('Mierda----->'+error.message)
    }  
}

export async function DELETE( request, { params } ){
    try {
        const deleteEspecialistId = await prisma.especialista.delete({
            where:{
                pk_idEspecialista:params.id
            }
        })
        return NextResponse.json( deleteEspecialistId )
    } catch (error) {
        return NextResponse.json(error.message)
    }
}