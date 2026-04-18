import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient()

// para importar datos a la base de datos

// import { PrismaClient } from '@prisma/client';

// // Prevenir múltiples instancias en desarrollo
// const globalForPrisma = global;

// const prisma = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

// export default prisma;

