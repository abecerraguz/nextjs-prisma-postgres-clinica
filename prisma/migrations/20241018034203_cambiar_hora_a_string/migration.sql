/*
  Warnings:

  - Changed the type of `hora` on the `cita` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "cita" DROP COLUMN "hora",
ADD COLUMN     "hora" VARCHAR(6) NOT NULL;
