-- CreateEnum
CREATE TYPE "enum_pacientes_estado" AS ENUM ('Activo', 'Inactivo');

-- CreateTable
CREATE TABLE "agendar_citas" (
    "fk_idCita" CHAR(7) NOT NULL,
    "fk_idEspecialista" CHAR(7) NOT NULL,
    "consultorio" VARCHAR(20) NOT NULL,
    "fechaCita" TIMESTAMPTZ(6) NOT NULL,
    "horaCita" TIME(6) NOT NULL,
    "turno" VARCHAR(10) NOT NULL,
    "status" VARCHAR(10) NOT NULL,
    "observaciones" VARCHAR(100) NOT NULL,

    CONSTRAINT "agendar_citas_pkey" PRIMARY KEY ("fk_idCita","fk_idEspecialista")
);

-- CreateTable
CREATE TABLE "cita" (
    "pk_idCita" CHAR(7) NOT NULL,
    "fecha" TIMESTAMPTZ(6) NOT NULL,
    "hora" TIME(6) NOT NULL,
    "fk_idPaciente" CHAR(6),

    CONSTRAINT "cita_pkey" PRIMARY KEY ("pk_idCita")
);

-- CreateTable
CREATE TABLE "especialista" (
    "pk_idEspecialista" CHAR(7) NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "apellido" VARCHAR(20) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "fechaNacimiento" DATE NOT NULL,
    "especialidad" VARCHAR(30) NOT NULL,

    CONSTRAINT "especialista_pkey" PRIMARY KEY ("pk_idEspecialista")
);

-- CreateTable
CREATE TABLE "expediente_diagnosticos" (
    "serial" INTEGER NOT NULL,
    "edad" CHAR(3) NOT NULL,
    "peso" CHAR(3) NOT NULL,
    "altura" CHAR(4) NOT NULL,
    "IMC" CHAR(5) NOT NULL,
    "nivelPeso" CHAR(10) NOT NULL,
    "presionArterial" CHAR(8) NOT NULL,
    "diagnostico" VARCHAR(150) NOT NULL,
    "recetario" VARCHAR(150) NOT NULL,
    "fechaCreacion" TIMESTAMPTZ(6) NOT NULL,
    "fk_idEspecialista" CHAR(7),

    CONSTRAINT "expediente_diagnosticos_pkey" PRIMARY KEY ("serial")
);

-- CreateTable
CREATE TABLE "expedientes" (
    "pk_idPaciente" CHAR(6) NOT NULL,
    "tipoSangre" VARCHAR(10) NOT NULL,
    "tipoAlergia" VARCHAR(50) NOT NULL,
    "padecimientoCro" VARCHAR(50) NOT NULL,
    "fechaCreacion" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "expedientes_pkey" PRIMARY KEY ("pk_idPaciente")
);

-- CreateTable
CREATE TABLE "pacientes" (
    "pk_idPaciente" CHAR(6) NOT NULL,
    "nombre" VARCHAR(20) NOT NULL,
    "apellido" VARCHAR(20) NOT NULL,
    "sexo" CHAR(1) NOT NULL,
    "fechaNacimiento" TIMESTAMPTZ(6) NOT NULL,
    "region" VARCHAR(200) NOT NULL,
    "ciudad" VARCHAR(200) NOT NULL,
    "telefono" CHAR(12),
    "estado" BOOLEAN DEFAULT true,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("pk_idPaciente")
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_telefono_key" ON "pacientes"("telefono");

-- AddForeignKey
ALTER TABLE "agendar_citas" ADD CONSTRAINT "agendar_citas_fk_idCita_fkey" FOREIGN KEY ("fk_idCita") REFERENCES "cita"("pk_idCita") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agendar_citas" ADD CONSTRAINT "agendar_citas_fk_idEspecialista_fkey" FOREIGN KEY ("fk_idEspecialista") REFERENCES "especialista"("pk_idEspecialista") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cita" ADD CONSTRAINT "cita_fk_idPaciente_fkey" FOREIGN KEY ("fk_idPaciente") REFERENCES "pacientes"("pk_idPaciente") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expediente_diagnosticos" ADD CONSTRAINT "expediente_diagnosticos_fk_idEspecialista_fkey" FOREIGN KEY ("fk_idEspecialista") REFERENCES "especialista"("pk_idEspecialista") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expedientes" ADD CONSTRAINT "expedientes_pk_idPaciente_fkey" FOREIGN KEY ("pk_idPaciente") REFERENCES "pacientes"("pk_idPaciente") ON DELETE CASCADE ON UPDATE CASCADE;
