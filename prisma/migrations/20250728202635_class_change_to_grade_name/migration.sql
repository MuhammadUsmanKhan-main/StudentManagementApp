/*
  Warnings:

  - You are about to drop the column `class` on the `Course` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[grade]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `grade` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Course_class_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "class",
ADD COLUMN     "grade" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Course_grade_key" ON "Course"("grade");
