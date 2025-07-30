import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateTimetableDto } from "./dto/createTimetable.dto";
import { TeacherService } from "src/teacher/teacher.service";
import { SubjectService } from "src/subject/subject.service";
import { SectionService } from "src/section/section.service";
// import { CreateSubjectDto } from "./dto/createSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class TimetableService {
  constructor(private readonly prismaService: PrismaService,
    private readonly teacherService:TeacherService,
    private readonly subjectService:SubjectService,
    private readonly sectionService:SectionService
  ) {}

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
    const timeTable = await this.prismaService.timetable.findFirst({
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

    const teacherExist = await this.prismaService.teacher.findUnique({
      where: {
        id: createTimetableDto.teacherId,
      },
    });

    if (!teacherExist) {
      throw new NotFoundException("Teacher doesnot exist");
    }
    const subjectExist = await this.prismaService.subject.findUnique({
      where: {
        id: createTimetableDto.subjectId,
      },
    });

    if (!subjectExist) {
      throw new NotFoundException("Subject does not exist");
    }
    const sectionExist = await this.prismaService.section.findUnique({
      where: {
        id: createTimetableDto.sectionId,
      },
    });
    if (!sectionExist) {
      throw new NotFoundException("Section does not exist");
    }
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
