/*
  Warnings:

  - Changed the type of `day` on the `Timetable` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
CREATE TYPE "WeekDays" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- AlterTable
ALTER TABLE "Attendance" ALTER COLUMN "status" SET DEFAULT 'NOT_MARKED';

-- AlterTable
ALTER TABLE "Timetable" DROP COLUMN "day",
ADD COLUMN     "day" "WeekDays" NOT NULL;

