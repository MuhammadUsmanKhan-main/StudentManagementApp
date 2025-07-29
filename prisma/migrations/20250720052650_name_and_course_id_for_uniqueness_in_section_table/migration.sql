/*
  Warnings:

  - A unique constraint covering the columns `[name,courseId]` on the table `Section` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "section" ADD VALUE 'D';
ALTER TYPE "section" ADD VALUE 'E';
ALTER TYPE "section" ADD VALUE 'F';

-- CreateIndex
CREATE UNIQUE INDEX "Section_name_courseId_key" ON "Section"("name", "courseId");
