import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateHomeworkDto } from "./dto/createHomework.dto";
// import { Timetable } from "@prisma/client";
import { TimetableService } from "src/timetable/timetable.service";
// import { CreateSubjectDto } from "./dto/createSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class HomeworkService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly timeTableService: TimetableService
  ) {}

  async findSubject() {}

  // //<=============================================Apis Related To Subject=======================================>

  async createHomework(createHomeworkDto: CreateHomeworkDto) {
    // first check existing record of homework assigned

    // then get students of specific section of the particular teacher assigning homework

    const getStudent =
      await this.timeTableService.findTeacherTimetableOfSpecificSection(
        createHomeworkDto.assignedById,
        createHomeworkDto.sectionId
      );

    console.log({ getStudent: getStudent[0].section.students });

    const students = getStudent[0].section.students;

    if (!students || students.length === 0) {
      throw new Error("No students found in the selected section.");
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
