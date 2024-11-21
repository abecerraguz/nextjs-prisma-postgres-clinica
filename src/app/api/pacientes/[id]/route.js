import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

export async function GET(request, { params }) {

    const getPaciente = await prisma.pacientes.findUnique({
        include: {
            expedientes: true,  // Incluye también los datos del especialista
        },
        include: {
            cita: true,  // Incluye también los datos del especialista
        },
        where: {
            pk_idPaciente: params.id
        }
    })
    return NextResponse.json(getPaciente)

}

export async function PUT(request, context) {
    try {
      const { params } = context;
  
      // Validar que params esté definido
      if (!params || !params.id) {
        return NextResponse.json(
          { error: 'El ID del paciente no fue proporcionado' },
          { status: 400 }
        );
      }
  
      const id = params.id;
  
      // Validar que el ID cumpla con el formato esperado (letra-guion-números)
      const idRegex = /^[A-Z]-\d{4}$/; // Formato: Letra mayúscula, guion y 4 dígitos
      if (!idRegex.test(id)) {
        return NextResponse.json(
          { error: 'El ID del paciente no cumple con el formato requerido (e.g., P-6880)' },
          { status: 400 }
        );
      }
  
      // Leer el cuerpo de la solicitud
      const data = await request.json();
  
      // Validar que los datos no estén vacíos
      if (!data || Object.keys(data).length === 0) {
        return NextResponse.json(
          { error: 'No se enviaron datos para actualizar' },
          { status: 400 }
        );
      }
  
      // Actualizar en la base de datos
      const updatedPaciente = await prisma.pacientes.update({
        where: { pk_idPaciente: id },
        include: {
          expedientes: true,
        },
        data: data,
      });
  
      return NextResponse.json(updatedPaciente, { status: 200 });
    } catch (error) {
      console.error('Error al actualizar el paciente:', error);
  
      return NextResponse.json(
        { error: 'Error interno del servidor', details: error.message },
        { status: 500 }
      );
    }
  }

// export async function PUT(request, { params }) {
//     try {
     
//         const data = await request.json()
//         const updatePacient = await prisma.pacientes.update({
//             where: {
//                 pk_idPaciente: params.id
//             },
//             include: {
//                 expedientes: true,
//             },
//             data: data
//         })
//         return NextResponse.json(updatePacient)
//     } catch (error) {
//         return NextResponse.json(error.message)
//     }
// }

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