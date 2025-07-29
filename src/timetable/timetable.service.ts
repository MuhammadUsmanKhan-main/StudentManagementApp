import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTimetableDto } from "./dto/createTimetable.dto";
// import { CreateSubjectDto } from "./dto/createSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class TimetableService {
  constructor(private readonly prismaService: PrismaService) {}

  async findTeachersTimetable(teacherId: string) {
    const teacherTimeTable = await this.prismaService.timetable.findMany({
      where: {
        teacherId,
      },
    });
    return teacherTimeTable;
  }

  async findStudentsTimetable(sectionId: string) {
    const studentsTimeTable = await this.prismaService.timetable.findMany({
      where: {
        sectionId,
      },
    });
    return studentsTimeTable;
  }

  async findRecordOnTimetable(createTimetableDto: CreateTimetableDto) {
    const timeTable = await this.prismaService.timetable.findFirst({
      where: {
        day: createTimetableDto.day as WeekDays,
        // period: createTimetableDto.period,
        startTime: createTimetableDto.startTime,
        teacherId: createTimetableDto.teacherId,
        // sectionId: createTimetableDto.sectionId,
      },
    });
    return timeTable;
  }

  // async findTeacherTimetableOfSpecificSection(createTimetableDto: CreateTimetableDto) {
  //   const timeTable = await this.prismaService.timetable.findFirst({
  //     where: {
  //       day: createTimetableDto.day,
  //       // period: createTimetableDto.period,
  //       // startTime: createTimetableDto.startTime,
  //       teacherId: createTimetableDto.teacherId,
  //       sectionId: createTimetableDto.sectionId,
  //       subjectId:createTimetableDto.subjectId
  //     },
  //   });
  //   return timeTable;
  // }

  async findTeacherTimetableOfSpecificSection(
    teacherId: string,
    sectionId: string
  ) {
    const timeTable = await this.prismaService.timetable.findMany({
      where: {
        // day: createTimetableDto.day,
        // period: createTimetableDto.period,
        // startTime: createTimetableDto.startTime,
        teacherId,
        sectionId,
        // subjectId:createTimetableDto.subjectId
      },
      include: {
        section: {
          include: {
            students: {
              select: {
                id: true,
              },
            },
          },
        },
      },
    });
    return timeTable;
  }

  // async findAllStudentsOnTimetable(createTimetableDto: CreateTimetableDto) {
  //   const timeTable = await this.prismaService.timetable.findFirst({
  //     where: {
  //       day: createTimetableDto.day,
  //       // period: createTimetableDto.period,
  //       startTime: createTimetableDto.startTime,
  //       teacherId: createTimetableDto.teacherId,
  //       // sectionId: createTimetableDto.sectionId,
  //     },
  //   });
  //   return timeTable;
  // }

  // //<=============================================Apis Related To Subject=======================================>

  async createRecordOnTimetable(createTimetableDto: CreateTimetableDto) {
    // check existing record

    const checkExistingRecordOnTimeTable =
      await this.findRecordOnTimetable(createTimetableDto);

    if (checkExistingRecordOnTimeTable) {
      throw new ConflictException("Record already exist");
    }

    // if not exist then create a new record or alot teacher a section on that specifc time, period and day

    const createdRecordOnTimetable = await this.prismaService.timetable.create({
      data: {
        day: createTimetableDto.day as WeekDays,
        period: createTimetableDto.period,
        startTime: new Date(createTimetableDto.startTime),
        endTime: new Date(createTimetableDto.endTime),
        subjectId: createTimetableDto.subjectId,
        sectionId: createTimetableDto.sectionId,
        teacherId: createTimetableDto.teacherId,
      },
      include: {
        section: {
          select: {
            name: true,
            course: {
              select: {
                grade: true,
              },
            },
          },
        },
        subject: {
          select: {
            name: true,
          },
        },
        teacher: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    //  delete createdNewRecordOnTimetable.id
    const timeTable = {
      ...createdRecordOnTimetable,
      message: `record created successfully`,
    };
    return timeTable;
  }
}
