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
// export async function POST(request){
//     try {
//         const data = await request.json()
//         console.log('Data-->',data)
//         const newExpediente = await prisma.expedientes.create({
//             data:data
//         })
//         return NextResponse.json(newExpediente)
//     } catch (error) {
//         console.error('Salida de error-->', error)
//     }
// }

export async function POST(request) {
    try {
      const data = await request.json();
      console.log('Data recibido:', data);
  
      // Validación: Verifica que pk_idPaciente esté presente y tenga un valor válido
      if (!data.pk_idPaciente) {
        return NextResponse.json(
          { error: 'El campo pk_idPaciente es obligatorio y debe ser un ID de paciente existente.' },
          { status: 400 }
        );
      }
  
      // Verifica que el campo fechaCreacion esté en el formato adecuado
      if (data.fechaCreacion && isNaN(new Date(data.fechaCreacion))) {
        return NextResponse.json(
          { error: 'El campo fechaCreacion debe ser una fecha válida en formato ISO.' },
          { status: 400 }
        );
      }
  
      // Crea el nuevo expediente en la base de datos
      const newExpediente = await prisma.expedientes.create({
        data: {
          pk_idPaciente: data.pk_idPaciente,
          tipoSangre: data.tipoSangre,
          tipoAlergia: data.tipoAlergia,
          padecimientoCro: data.padecimientoCro,
          fechaCreacion: new Date(data.fechaCreacion), // Convierte la fecha a Date si es necesario
        },
      });
  
      return NextResponse.json(newExpediente, { status: 201 });
  
    } catch (error) {
      console.error('Error al crear expediente:', error);
      return NextResponse.json(
        { error: 'Error interno del servidor al crear el expediente.' },
        { status: 500 }
      );
    }
  }