import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { CourseService } from "src/course/course.service";
import { UpdateSubjectDto } from "./dto/updateSubject.dto";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService,
    private readonly courseService: CourseService
  ) { }

  async findSubject(code: string, courseId: string) {
    const Subject = await this.prismaService.subject.findUnique({
      where: {
        code_courseId: {
          code,
          courseId,
        },
      },
    });
    return Subject;
  }

  // //<=============================================Apis Related To Subject=======================================>

  async createSubject(createSubjectDto: CreateSubjectDto) {

    const courseExist = await this.prismaService.course.findUnique({
      where: {
        id: createSubjectDto.courseId
      }
    })

    if (!courseExist) {
      throw new NotFoundException('Course does not exist')
    }

    const subjectExist = await this.findSubject(
      createSubjectDto.code,
      createSubjectDto.courseId
    );

    if (subjectExist) {
      throw new ConflictException("Subject already exists.");
    }

    //check courseId (TODO)

    const subject = await this.prismaService.subject.create({
      data: {
        name: createSubjectDto.name,
        code: createSubjectDto.code,
        courseId: createSubjectDto.courseId,
      },
      include: {
        course: {
          select: {
            grade: true,
          },
        },
      },
    });

    const subjectCreated = {
      message: `Subject ${subject.name} with code ${subject.code} of 
      class ${subject.course.grade} has been successfully created.`,
    };

    return subjectCreated;
  }

  async getAllSubjects() {
    return this.prismaService.subject.findMany({
      include: {
        course: {
          select: {
            grade: true,
          },
        },
      },
    });
  }

  async getSubjectById(id: string) {
    const subject = await this.prismaService.subject.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            grade: true,
          },
        },
      },
    });

    if (!subject) {
      throw new NotFoundException("Subject not found.");
    }

    return subject;
  }

  async updateSubject(id: string, dto: UpdateSubjectDto) {
    const subject = await this.prismaService.subject.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException("Subject not found.");
    }

    if ((dto.code && dto.code !== subject.code) || (dto.courseId && dto.courseId !== subject.courseId)) {
      const duplicate = await this.prismaService.subject.findFirst({
        where: {
          code: dto.code || subject.code,
          courseId: dto.courseId || subject.courseId,
          NOT: { id }, 
        },
      });

      console.log("Duplicate subject check:", duplicate);

      if (duplicate) {
        throw new ConflictException("Another subject with the same code already exists in this course.");
      }
    }

    const updated = await this.prismaService.subject.update({
      where: { id },
      data: {
        name: dto.name,
        code: dto.code,
        courseId: dto.courseId,
      },
    });

    return {
      message: `Subject ${updated.name} updated successfully.`,
    };
  }



  async deleteSubject(id: string) {
    const subject = await this.prismaService.subject.findUnique({
      where: { id },
    });

    if (!subject) {
      throw new NotFoundException("Subject not found.");
    }

    await this.prismaService.subject.delete({ where: { id } });

    return {
      message: `Subject ${subject.name} deleted successfully.`,
    };
  }
}