-- AlterTable
ALTER TABLE "agendar_citas" ALTER COLUMN "fechaCita" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "cita" ALTER COLUMN "fecha" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "expedientes" ALTER COLUMN "fechaCreacion" SET DATA TYPE DATE;

-- AlterTable
ALTER TABLE "pacientes" ALTER COLUMN "fechaNacimiento" SET DATA TYPE DATE;
