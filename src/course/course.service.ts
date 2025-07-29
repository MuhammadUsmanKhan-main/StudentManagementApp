import { ConflictException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto/createCourse.dto";

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findCourse(number: number) {
    const course = await this.prismaService.course.findUnique({
      where: {
        grade: number,
      },
    });
    return course;
  }

  // //<=============================================Apis Related To Course=======================================>

  async createCourse(createCourseDto: CreateCourseDto) {
    const courseExist = await this.findCourse(createCourseDto.grade);

    if (courseExist) {
      throw new ConflictException("Course already exists.");
    }

    const course = await this.prismaService.course.create({
      data: {
        name: createCourseDto.name,
        grade: createCourseDto.grade,
        description: createCourseDto.description,
      },
    });

    const courseCreated = {
      message: `${course.name} (${course.grade}) class has been successfully created.`,
    };

    return courseCreated;
  }
}
