import { NextResponse } from 'next/server'
// Me conecto a la instancia de la base de datos
import { prisma } from '@/libs/prisma'

// Obtenemos las tareas de la tabla
export async function GET(){
    const citas = await prisma.cita.findMany({
        include: {
            agendar_citas: {
              include: {
                especialista: true,  // Incluye también los datos del especialista
              },
            },
          },
    })
    // console.log('XXXXX-->',pacientes)
    return NextResponse.json(citas)
}

// Para crear una tarea debemos enviar datos desde el cliente
// en Node recuerden tenemos el request.body
export async function POST(request){
    const data = await request.json()
    console.log('Data-->')
    const newCita = await prisma.cita.create({
        data:data
    })
    return NextResponse.json(newCita)
}