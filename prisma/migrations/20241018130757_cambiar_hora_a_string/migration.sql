/*
  Warnings:

  - You are about to drop the column `horaCita` on the `agendar_citas` table. All the data in the column will be lost.
  - Added the required column `hora` to the `agendar_citas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "agendar_citas" DROP COLUMN "horaCita",
ADD COLUMN     "hora" VARCHAR(6) NOT NULL;
