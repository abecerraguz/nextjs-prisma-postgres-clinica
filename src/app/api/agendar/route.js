import { NextResponse } from 'next/server'
// Me conecto a la instancia de la base de datos
import { prisma } from '@/libs/prisma'

// Obtenemos las tareas de la tabla
export async function GET(){
    const agendar_citas = await prisma.agendar_citas.findMany();
    // console.log('XXXXX-->',pacientes)
    return NextResponse.json(agendar_citas)
}


// Para crear una tarea debemos enviar datos desde el cliente
// en Node recuerden tenemos el request.body
export async function POST(request){
    const data = await request.json()
    console.log('Data-->',data)
    const agendarCita = await prisma.agendar_citas.create({
        data:data
    })
    return NextResponse.json(agendarCita)
}