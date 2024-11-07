import { NextResponse } from 'next/server'
// Me conecto a la instancia de la base de datos
import { prisma } from '@/libs/prisma'

// Obtenemos las tareas de la tabla
export async function GET(){
    const pacientes = await prisma.pacientes.findMany(
        {
            include: {
                expedientes: true,  // Incluye también los datos del especialista
            },
            include: {
                cita: true,  // Incluye también los datos del especialista
            }
            
        }
    )
    // console.log('XXXXX-->',pacientes)
    return NextResponse.json(pacientes)
}

// Para crear una tarea debemos enviar datos desde el cliente
// en Node recuerden tenemos el request.body
export async function POST(request){
    const data = await request.json()
    console.log('Data-->')
    const newPacient = await prisma.pacientes.create({
        data:data
    })
    return NextResponse.json(newPacient)
}