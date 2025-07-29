/*
  Warnings:

  - The values [LATE] on the enum `AttendanceStatus` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Homework` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `status` to the `Homework` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AttendanceStatus_new" AS ENUM ('PRESENT', 'ABSENT', 'STUDY_LEAVE', 'HOLIDAY', 'SUSPENDED', 'NOT_MARKED');
ALTER TABLE "Attendance" ALTER COLUMN "status" TYPE "AttendanceStatus_new" USING ("status"::text::"AttendanceStatus_new");
ALTER TYPE "AttendanceStatus" RENAME TO "AttendanceStatus_old";
ALTER TYPE "AttendanceStatus_new" RENAME TO "AttendanceStatus";
DROP TYPE "AttendanceStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "Homework" DROP CONSTRAINT "Homework_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD CONSTRAINT "Homework_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Homework_id_seq";
