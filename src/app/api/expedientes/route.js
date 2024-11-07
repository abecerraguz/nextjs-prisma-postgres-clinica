import { NextResponse } from 'next/server'
// Me conecto a la instancia de la base de datos
import { prisma } from '@/libs/prisma'

// Obtenemos las tareas de la tabla
export async function GET(){
    const expedientes = await prisma.expedientes.findMany()
    // console.log('XXXXX-->',expedientes)
    return NextResponse.json(expedientes)
}

// Para crear una tarea debemos enviar datos desde el cliente
// en Node recuerden tenemos el request.body
export async function POST(request){
    const data = await request.json()
    console.log('Data-->',data)
    const newExpediente = await prisma.expedientes.create({
        data:data
    })
    return NextResponse.json(newExpediente)
}