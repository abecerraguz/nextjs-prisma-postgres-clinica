import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET( request, { params } ){
    
    const getExpediente = await prisma.expedientes.findUnique({
        where:{
            pk_idPaciente:params.id
        }
    })
    return NextResponse.json(getExpediente)

}

export async function PUT( request, { params } ){
    try {
        const data = await request.json()
        console.log('Data---->', data)
        console.log( 'Data---->', params.id )
        const updateExpediente = await prisma.expedientes.update({
            where:{
                pk_idPaciente:params.id
            },
            data:data
        })
        return NextResponse.json(updateExpediente)
    } catch (error) {
        return NextResponse.json('Mierda----->'+error.message)
    }  
}

// export async function DELETE( request, { params } ){
//     try {
//         const deletePacientId = await prisma.pacientes.delete({
//             where:{
//                 pk_idPaciente:params.id
//             }
//         })
//         console.log('Salida de delete', deletePacientId )
//         return NextResponse.json( deletePacientId )
//     } catch (error) {
//         return NextResponse.json(error.message)
//     }
// }