import "dotenv/config"
import { prisma } from '../src/libs/prisma.js';
import bcrypt from 'bcryptjs';

async function main() {
  console.log('Starting seed...');

  const superAdminPassword = await bcrypt.hash('superadmin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  await prisma.user.createMany({
    data: [
      { email: 'superadmin@example.com', password: superAdminPassword, role: 'SUPERADMIN' },
      { email: 'user1@example.com', password: userPassword, role: 'USER' },
    ],
    skipDuplicates: true,
  });

  // Especialistas de ejemplo
  const esp1 = await prisma.especialista.create({
    data: {
      nombre: 'Carlos',
      apellido: 'Mendoza',
      sexo: 'M',
      fechaNacimiento: new Date('1978-04-12'),
      especialidad: 'Cardiología',
    },
  });

  const esp2 = await prisma.especialista.create({
    data: {
      nombre: 'Laura',
      apellido: 'Fuentes',
      sexo: 'F',
      fechaNacimiento: new Date('1985-09-23'),
      especialidad: 'Pediatría',
    },
  });

  // Pacientes de ejemplo
  const pac1 = await prisma.paciente.create({
    data: {
      nombre: 'Juan',
      apellido: 'Pérez',
      sexo: 'M',
      fechaNacimiento: new Date('1990-06-15'),
      region: 'Región Metropolitana de Santiago',
      ciudad: 'Santiago',
      telefono: '+56912345678',
      tipoSangre: 'Tipo O',
      tipoAlergia: 'Ninguna',
      padecimientoCro: 'Ninguno',
    },
  });

  const pac2 = await prisma.paciente.create({
    data: {
      nombre: 'María',
      apellido: 'González',
      sexo: 'F',
      fechaNacimiento: new Date('1995-03-08'),
      region: 'Región de Valparaíso',
      ciudad: 'Viña del Mar',
      telefono: '+56987654321',
      tipoSangre: 'Tipo A',
      tipoAlergia: 'Polen',
      padecimientoCro: 'Asma leve',
    },
  });

  // Cita de ejemplo
  await prisma.cita.create({
    data: {
      pacienteId: pac1.id,
      especialistaId: esp1.id,
      fecha: new Date('2026-04-20'),
      hora: '10:00',
      consultorio: 'Consultorio 3',
      turno: 'Mañana',
      estado: 'CONFIRMADA',
      observaciones: 'Control anual de presión arterial',
    },
  });

  // Diagnóstico de ejemplo
  await prisma.diagnostico.create({
    data: {
      pacienteId: pac1.id,
      especialistaId: esp1.id,
      edad: 36,
      peso: 78.5,
      altura: 175,
      imc: 25.6,
      nivelPeso: 'Sobrepeso',
      presionArterial: '130/85',
      diagnostico: 'Hipertensión arterial leve, se recomienda dieta baja en sodio.',
      recetario: 'Losartán 50mg, 1 comprimido diario por la mañana.',
    },
  });

  console.log('Seed completed!');
}

main()
  .catch((error) => {
    console.error('Error during seed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

