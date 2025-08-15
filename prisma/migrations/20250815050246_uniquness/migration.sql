/*
  Warnings:

  - A unique constraint covering the columns `[name,courseId]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sectionId,day,period]` on the table `Timetable` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Subject_code_courseId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Subject_name_courseId_key" ON "Subject"("name", "courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Timetable_sectionId_day_period_key" ON "Timetable"("sectionId", "day", "period");
