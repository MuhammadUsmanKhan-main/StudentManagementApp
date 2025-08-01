import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { UpdateCourseDto } from "./dto/updateCourse.dto";

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) { }

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


  // Read All Courses
  async getAllCourses() {
    return this.prismaService.course.findMany();
  }

  // Read One Course by ID
  async getCourseById(id: string) {
    const course = await this.prismaService.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException("Course not found");
    return course;
  }

  // Update Course
  async updateCourse(id: string, dto: UpdateCourseDto) {
    const course = await this.prismaService.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException("Course not found");

    return this.prismaService.course.update({
      where: { id },
      data: dto,
    });
  }

  // Delete Course
  async deleteCourse(id: string) {
    const course = await this.prismaService.course.findUnique({ where: { id } });
    if (!course) throw new NotFoundException("Course not found");

    await this.prismaService.course.delete({ where: { id } });

    return { message: "Course deleted successfully" };
  }
}
