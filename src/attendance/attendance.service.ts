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
import { TeacherService } from "src/teacher/teacher.service";
import { SubjectService } from "src/subject/subject.service";
import { StudentService } from "src/student/student.service";
// import { CreateSubjectDto } from "./dto/createSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class AttendanceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly timeTableService: TimetableService,
    private readonly teacherService: TeacherService,
    private readonly subjectService: SubjectService,
    private readonly studentService: StudentService
  ) {}

  async getStudents(getStudentsDto: GetStudentsDto) {
    const { courseId, sectionId } = getStudentsDto;

    const students = await this.prismaService.student.findMany({
      where: {
        courseId,
        sectionId,
      },
      select: {
        id: true,
      },
    });

    return students;
  }

  async createAttendance(createAttendanceDto: CreateAttendanceDto) {
    const { markedById, subjectId, students, date, sectionId } =
      createAttendanceDto;
    // const currentTime = new Date();
    const startOfDay = new Date(date); // 2025-07-27T00:00:00.000Z
    const endOfDay = new Date(startOfDay);
    endOfDay.setDate(endOfDay.getDate() + 1); // 2025-07-28T00:00:00.000Z

    // const year = startOfDay.getFullYear();
    // const month = String(startOfDay.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    // const day = String(startOfDay.getDate()).padStart(2, "0");

    // const formattedDate = `${year}-${month}-${day}`;

    const dayName = startOfDay
      .toLocaleString("en-US", { weekday: "short" })
      .toUpperCase(); // e.g., "MON"

    // check students exists

    for (const { studentId } of students) {
      const student = await this.prismaService.student.findUnique({
        where: { id: studentId },
        select: { courseId: true, sectionId: true },
      });

      if (!student)
        throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    // check subject exists

    const subjectExist = await this.prismaService.subject.findUnique({
      where: {
        id: subjectId,
      },
    });

    if (!subjectExist) {
      throw new NotFoundException("Subject not found");
    }

    const teacherExist = await this.prismaService.teacher.findUnique({
      where: {
        id: markedById,
      },
    });

    if (!teacherExist) {
      throw new NotFoundException("Teacher not found");
    }

    // verify does this teacher teaches that subject on that day

    const timetableSlot = await this.prismaService.timetable.findFirst({
      where: {
        teacherId: markedById,
        subjectId,
        sectionId,
        day: dayName as WeekDays,
      },
    });

    if (!timetableSlot) {
      throw new NotFoundException(
        `No valid timetable slot found for teacher and subject on ${dayName}`
      );
    }

    // console.log("Parsed date:", startOfDay.toISOString());
    //       console.log("Slot start:", timetableSlot.startTime.toISOString());
    //       console.log("Slot end:", timetableSlot.endTime.toISOString());

    // check does attendance marked on its time according to timetable

    const isInTimeSlot =
      startOfDay >= timetableSlot.startTime &&
      startOfDay <= timetableSlot.endTime;

    if (!isInTimeSlot) {
      throw new NotFoundException(
        `Current time is not within the valid class period (${timetableSlot.startTime.toLocaleTimeString()} - ${timetableSlot.endTime.toLocaleTimeString()})`
      );
    }

    //finally create attendance

    const attendanceEntries = await Promise.all(
      students.map(({ studentId, status }) => {
        return this.prismaService.attendance.upsert({
          where: {
            // inline composite unique key
            studentId_date_subjectId_markedById: {
              date,
              markedById,
              studentId,
              subjectId,
            },
          }, // ←
          create: {
            date: startOfDay,
            status,
            markedById,
            studentId,
            subjectId,
          },
          update: {
            status,
          },
        });
      })
    );

    return {
      message: "Attendance marked successfully",
      records: attendanceEntries,
    };
  }
}
