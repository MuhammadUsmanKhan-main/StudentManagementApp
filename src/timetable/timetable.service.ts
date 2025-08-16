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
import { UpdateTimetableDto } from "./dto/updateTimetable.dto";
// import { CreateSubjectDto } from "./dto/createSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class TimetableService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly teacherService: TeacherService,
    private readonly subjectService: SubjectService,
    private readonly sectionService: SectionService
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

  
  async findTeacherTimetableOfSpecificSection(
    teacherId: string,
    sectionId: string,
    courseId: string
  ) {
    const timeTable = await this.prismaService.timetable.findFirst({
      where: {
        // day: createTimetableDto.day,
        // period: createTimetableDto.period,
        // startTime: createTimetableDto.startTime,
        teacherId,
        sectionId,
        section: {
          courseId,
        },
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
        // name: createTimetableDto.name,
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
        sectionId: sectionExist.id,
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

  async findAllTeachersTimetable() {
    return await this.prismaService.timetable.findMany({
      include: {
        teacher: {
          select: { firstName: true, lastName: true },
        },
        subject: {
          select: { name: true },
        },
        section: {
          select: {
            name: true,
            course: { select: { grade: true } },
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const record = await this.prismaService.timetable.findUnique({
      where: { id },
      include: {
        teacher: {
          select: { firstName: true, lastName: true },
        },
        subject: {
          select: { name: true },
        },
        section: {
          select: {
            name: true,
            course: { select: { grade: true } },
          },
        },
      },
    });

    if (!record) throw new NotFoundException("Timetable record not found");
    return record;
  }

  async update(id: string, updateDto: UpdateTimetableDto) {
    // Validate related foreign keys
    if (updateDto.teacherId) {
      const teacher = await this.prismaService.teacher.findUnique({
        where: { id: updateDto.teacherId },
      });
      if (!teacher) throw new NotFoundException("Teacher not found");
    }

    if (updateDto.subjectId) {
      const subject = await this.prismaService.subject.findUnique({
        where: { id: updateDto.subjectId },
      });
      if (!subject) throw new NotFoundException("Subject not found");
    }

    if (updateDto.sectionId) {
      const section = await this.prismaService.section.findUnique({
        where: { id: updateDto.sectionId },
      });
      if (!section) throw new NotFoundException("Section not found");
    }

    const updated = await this.prismaService.timetable.update({
      where: { id },
      data: {
        ...updateDto,
        startTime: updateDto.startTime
          ? new Date(updateDto.startTime)
          : undefined,
        endTime: updateDto.endTime ? new Date(updateDto.endTime) : undefined,
      },
    });

    return {
      ...updated,
      message: "Record updated successfully",
    };
  }

  async delete(id: string) {
    const exists = await this.prismaService.timetable.findUnique({
      where: { id },
    });

    if (!exists) throw new NotFoundException("Timetable record not found");

    await this.prismaService.timetable.delete({ where: { id } });

    return { message: "Record deleted successfully" };
  }
}
