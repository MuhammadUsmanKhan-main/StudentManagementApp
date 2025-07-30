/*
  Warnings:

  - A unique constraint covering the columns `[studentId,date,subjectId,markedById]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subjectId` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attendance" ADD COLUMN     "subjectId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_studentId_date_subjectId_markedById_key" ON "Attendance"("studentId", "date", "subjectId", "markedById");

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_subjectId_fkey" FOREIGN KEY ("subjectId") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
