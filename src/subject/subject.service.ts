import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { CourseService } from "src/course/course.service";

// import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class SubjectService {
  constructor(private readonly prismaService: PrismaService,
    private readonly courseService:CourseService
  ) {}

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
      where:{
        id:createSubjectDto.courseId
      }
    })

    if(!courseExist){
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
}
