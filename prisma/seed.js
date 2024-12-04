import prisma from '../src/libs/prisma.js';
// import bcrypt from 'bcryptjs';
import bcrypt from 'bcrypt'

async function main() {
  console.log('Starting seed...');
  
  // Cifra contraseñas
  const superAdminPassword = await bcrypt.hash('superadmin123', 10);
  const userPassword = await bcrypt.hash('user123', 10);

  // Crear usuarios
  await prisma.user.createMany({
    data: [
      {
        email: 'superadmin@example.com',
        password: superAdminPassword,
        role: 'SUPERADMIN',
      },
      {
        email: 'user1@example.com',
        password: userPassword,
        role: 'USER',
      },
    ],
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
