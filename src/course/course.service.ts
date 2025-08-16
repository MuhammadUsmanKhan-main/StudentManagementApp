import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { UpdateCourseDto } from "./dto/updateCourse.dto";

@Injectable()
export class CourseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findCourseByGrade(number: number) {
    const course = await this.prismaService.course.findUnique({
      where: {
        grade: number,
      },
    });
    return course;
  }

  // //<=============================================Apis Related To Course=======================================>

  async createCourse(createCourseDto: CreateCourseDto) {
    const courseExist = await this.findCourseByGrade(createCourseDto.grade);

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

  async getTeacherCourses(teacherId: string) {
    const courses = await this.prismaService.course.findMany({
      where: {
        sections: {
          some: {
            timetableSlots: {
              some: {
                teacherId,
              },
            },
          },
        },
      },
      // distinct: ["id"], // ensures unique courses
      select: {
        id: true,
        grade: true,
      },
    });

    return courses;
  }

  // Read One Course by ID
  async getCourseById(id: string) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });
    if (!course) throw new NotFoundException("Course not found");
    return course;
  }

  // Update Course
  async updateCourse(id: string, dto: UpdateCourseDto) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });
    if (!course) throw new NotFoundException("Course not found");

    return this.prismaService.course.update({
      where: { id },
      data: {
        name: dto.name,
        grade: dto.grade,
        description: dto.description,
      },
    });
  }

  async deleteCourse(id: string) {
    const course = await this.prismaService.course.findUnique({
      where: { id },
    });
    if (!course) throw new NotFoundException("Course not found");

    try {
      await this.prismaService.course.delete({ where: { id } });

      return { message: "Course deleted successfully" };
    } catch (error) {
      if (error.code === "P2003") {
        throw new ConflictException(
          "Cannot delete course: it is linked to other records."
        );
      }

      // console.error("Course deletion failed:", error);
      throw new InternalServerErrorException("An unexpected error occurred.");
    }
  }
}
