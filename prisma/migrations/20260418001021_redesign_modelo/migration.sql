/*
  Warnings:

  - You are about to drop the `agendar_citas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cita` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `especialista` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expediente_diagnosticos` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `expedientes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pacientes` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "EstadoCita" AS ENUM ('PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA');

-- DropForeignKey
ALTER TABLE "agendar_citas" DROP CONSTRAINT "agendar_citas_fk_idCita_fkey";

-- DropForeignKey
ALTER TABLE "agendar_citas" DROP CONSTRAINT "agendar_citas_fk_idEspecialista_fkey";

-- DropForeignKey
ALTER TABLE "cita" DROP CONSTRAINT "cita_fk_idPaciente_fkey";

-- DropForeignKey
ALTER TABLE "expediente_diagnosticos" DROP CONSTRAINT "expediente_diagnosticos_fk_idEspecialista_fkey";

-- DropForeignKey
ALTER TABLE "expedientes" DROP CONSTRAINT "expedientes_pk_idPaciente_fkey";

-- DropTable
DROP TABLE "agendar_citas";

-- DropTable
DROP TABLE "cita";

-- DropTable
DROP TABLE "especialista";

-- DropTable
DROP TABLE "expediente_diagnosticos";

-- DropTable
DROP TABLE "expedientes";

-- DropTable
DROP TABLE "pacientes";

-- DropEnum
DROP TYPE "enum_pacientes_estado";

-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "region" VARCHAR(200) NOT NULL,
    "ciudad" VARCHAR(200) NOT NULL,
    "telefono" VARCHAR(15),
    "tipoSangre" VARCHAR(10),
    "tipoAlergia" VARCHAR(100),
    "padecimientoCro" VARCHAR(100),
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Especialista" (
    "id" TEXT NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "apellido" VARCHAR(50) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "especialidad" VARCHAR(50) NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Especialista_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cita" (
    "id" TEXT NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "especialistaId" TEXT NOT NULL,
    "fecha" DATE NOT NULL,
    "hora" VARCHAR(10) NOT NULL,
    "consultorio" VARCHAR(50) NOT NULL,
    "turno" VARCHAR(10) NOT NULL,
    "estado" "EstadoCita" NOT NULL DEFAULT 'PENDIENTE',
    "observaciones" VARCHAR(200),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Diagnostico" (
    "id" SERIAL NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "especialistaId" TEXT,
    "edad" INTEGER NOT NULL,
    "peso" DOUBLE PRECISION NOT NULL,
    "altura" DOUBLE PRECISION NOT NULL,
    "imc" DOUBLE PRECISION NOT NULL,
    "nivelPeso" VARCHAR(20) NOT NULL,
    "presionArterial" VARCHAR(10) NOT NULL,
    "diagnostico" VARCHAR(200) NOT NULL,
    "recetario" VARCHAR(200) NOT NULL,
    "fechaCreacion" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Diagnostico_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_telefono_key" ON "Paciente"("telefono");

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cita" ADD CONSTRAINT "Cita_especialistaId_fkey" FOREIGN KEY ("especialistaId") REFERENCES "Especialista"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "Paciente"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Diagnostico" ADD CONSTRAINT "Diagnostico_especialistaId_fkey" FOREIGN KEY ("especialistaId") REFERENCES "Especialista"("id") ON DELETE SET NULL ON UPDATE CASCADE;
