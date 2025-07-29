/*
  Warnings:

  - A unique constraint covering the columns `[code,courseId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subject_code_courseId_key" ON "Subject"("code", "courseId");
