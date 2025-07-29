/*
  Warnings:

  - A unique constraint covering the columns `[class]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_class_key" ON "Course"("class");
