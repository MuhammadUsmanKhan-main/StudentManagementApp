/*
  Warnings:

  - Made the column `email` on table `Admin` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `phone` to the `Teacher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Admin" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "Teacher" ADD COLUMN     "phone" TEXT NOT NULL;
