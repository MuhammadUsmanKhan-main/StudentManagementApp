import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHomeworkDto } from "./dto/createHomework.dto";
// import { Timetable } from "@prisma/client";
import { TimetableService } from "src/timetable/timetable.service";
import { SectionService } from "src/section/section.service";
import { SubjectService } from "src/subject/subject.service";
import { TeacherService } from "src/teacher/teacher.service";
// import { CreateSubjectDto } from "./dto/createSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class HomeworkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly timetableService: TimetableService,
    private readonly sectionService: SectionService,
    private readonly subjectService: SubjectService,
    private readonly teacherService: TeacherService
  ) {}

  async findSubject() {}

  // //<=============================================Apis Related To Subject=======================================>

  async createHomework(createHomeworkDto: CreateHomeworkDto) {
    // first check existing record of homework assigned
    // make code better
    const subjectExist = await this.prismaService.subject.findUnique({
      where: {
        id: createHomeworkDto.subjectId,
      },
    });

    const teacherExist = await this.prismaService.teacher.findUnique({
      where: {
        id: createHomeworkDto.assignedById,
      },
    });
    const sectionExist = await this.prismaService.section.findFirst({
      where: {
        course: {
          subjects: {
            some: {
              id: createHomeworkDto.subjectId,
            },
          },
        },
      },
    });

    if (!subjectExist) {
      throw new NotFoundException("Subject not found");
    }
    if (!sectionExist) {
      throw new NotFoundException("Section not found");
    }
    if (!teacherExist) {
      throw new NotFoundException("Teacher not found");
    }
    // then get students of specific section of the particular teacher assigning homework
    // console.log({ sectionId: createHomeworkDto.sectionId });
    const getStudent =
      await this.timetableService.findTeacherTimetableOfSpecificSection(
        createHomeworkDto.assignedById,
        sectionExist.id
      );

    // console.log({ getStudent: getStudent });

    const students = getStudent?.section?.students;

    if (!students || students.length === 0) {
      throw new NotFoundException("No students found in the selected section.");
    }

    // 2. Create one homework per student
    const createdHomeworks = await Promise.all(
      students.map((student) =>
        this.prismaService.homework.create({
          data: {
            title: createHomeworkDto.title,
            description: createHomeworkDto.description,
            dueDate: new Date(createHomeworkDto.dueDate),
            assignedAt: new Date(),
            assignedById: createHomeworkDto.assignedById,
            subjectId: createHomeworkDto.subjectId,
            studentId: student.id,
          },
        })
      )
    );

    return {
      message: `${createdHomeworks.length} students have been assigned with homework successfully.`,
      createdHomeworks,
    };
  }
}
