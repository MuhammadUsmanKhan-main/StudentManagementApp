import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
// import { CreateHomeworkDto } from "./dto/createhomework.dto";
// import { Timetable } from "@prisma/client";
import { TimetableService } from "src/timetable/timetable.service";
import { CreateAttendanceDto } from "./dto/createAttendance.dto";
import { GetStudentsDto } from "./dto/getStudentsDto";
// import { CreateSubjectDto } from "./dto/createSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly timeTableService: TimetableService
  ) {}

  async getStudents(getStudentsDto: GetStudentsDto) {
    const { courseId, sectionId } = getStudentsDto;

    const students = await this.prismaService.student.findMany({
      where: {
        courseId,
        sectionId,
      },
      select:{
        id:true
      }
    });

    return students;
  }

  // //<=============================================Apis Related To Subject=======================================>
  

  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    const { markedById, subjectId, students, date } = createAttendanceDto;

    // const currentTime = new Date();
    const startOfDay = new Date(date); // 2025-07-27T00:00:00.000Z
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1); // 2025-07-28T00:00:00.000Z

    const year = startOfDay.getFullYear();
    const month = String(startOfDay.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const day = String(startOfDay.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    const dayName = startOfDay
      .toLocaleString("en-US", { weekday: "short" })
      .toUpperCase(); // e.g., "MON"

    for (const { studentId } of students) {
      const student = await this.prismaService.student.findUnique({
        where: { id: studentId },
        select: { courseId: true, sectionId: true },
      });

      if (!student)
        throw new NotFoundException(`Student with ID ${studentId} not found`);

      const subject = await this.prismaService.subject.findUnique({
        where: { id: subjectId },
        select: { courseId: true },
      });

      if (!subject) throw new NotFoundException(`Subject not found`);

      if (student.courseId !== subject.courseId) {
        throw new NotFoundException(
          `Student ${studentId} is not in the course for this subject`
        );
      }

      const timetableSlot = await this.prismaService.timetable.findFirst({
        where: {
          teacherId: markedById,
          subjectId,
          sectionId: student.sectionId,
          day: dayName as WeekDays,
          // optionally also check current time fits between startTime and endTime
        },
      });

      if (!timetableSlot) {
        throw new NotFoundException(
          `No valid timetable slot found for teacher and subject on ${dayName}`
        );
      }

      console.log("Parsed date:", startOfDay.toISOString());
      console.log("Slot start:", timetableSlot.startTime.toISOString());
      console.log("Slot end:", timetableSlot.endTime.toISOString());

      const isInTimeSlot =
        startOfDay >= timetableSlot.startTime &&
        startOfDay <= timetableSlot.endTime;

      if (!isInTimeSlot) {
        throw new NotFoundException(
          `Current time is not within the valid class period (${timetableSlot.startTime.toLocaleTimeString()} - ${timetableSlot.endTime.toLocaleTimeString()})`
        );
      }

      const existing = await this.prismaService.attendance.findFirst({
        where: {
          date: {
            gte: startOfDay,
            lt: endOfDay,
          },
          studentId,
          markedById,
        },
      });

      if (existing) {
        throw new ConflictException(
          `Attendance already marked for student ${studentId} on ${formattedDate}`
        );
      }
    }

    // If all students pass checks — mark attendance
    const attendanceEntries = await Promise.all(
      students.map(({ studentId, status }) =>
        this.prismaService.attendance.create({
          data: {
            date,
            status,
            studentId,
            markedById,
          },
        })
      )
    );

    return {
      message: "Attendance marked successfully",
      records: attendanceEntries,
    };
  }
}
