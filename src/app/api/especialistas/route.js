import { NextResponse } from 'next/server'
// Me conecto a la instancia de la base de datos
import { prisma } from '@/libs/prisma'

// Obtenemos las tareas de la tabla
export async function GET(){
    const especialist = await prisma.especialista.findMany()
    return NextResponse.json(especialist)
}

// Para crear una tarea debemos enviar datos desde el cliente
// en Node recuerden tenemos el request.body
export async function POST(request){
    const data = await request.json()

    const newEspecialist = await prisma.especialista.create({
        data:data
    })
    return NextResponse.json(newEspecialist)
}