import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
// import { CreateCourseDto } from "src/course/dto/createCourse.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSectionDto } from "./dto/createSection.dto";
import { SectionDto } from "./dto/section.dto";
import { Section } from "src/common/enums/section.enum";
import { CourseService } from "src/course/course.service";
import { UpdateSectionDto } from "./dto/updateSection.dto";
// import { Section } from "src/common/enums/role.enum";

@Injectable()
export class SectionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly courseService: CourseService
  ) { }

  async findSection(name: Section, courseId: string) {
    const section = await this.prismaService.section.findUnique({
      where: {
        name_courseId: {
          name,
          courseId,
        },
      },
    });
    return section;
  }

  // //<=============================================Apis Related To Section=======================================>

  async createSection(createSectionDto: CreateSectionDto) {
    const courseExist = await this.prismaService.course.findUnique({
      where: {
        id: createSectionDto.courseId,
      },
    });

    if (!courseExist) {
      throw new NotFoundException("Course does not exist");
    }

    const sectionExist = await this.findSection(
      createSectionDto.name,
      createSectionDto.courseId
    );

    if (sectionExist) {
      throw new ConflictException("Section already exists.");
    }

    const section = await this.prismaService.section.create({
      data: {
        name: createSectionDto.name,
        courseId: createSectionDto.courseId,
      },
      include: {
        course: {
          select: {
            grade: true,
          },
        },
      },
    });

    const sectionCreated = {
      message: `Section ${section.name} of class ${section.course.grade} has been successfully created.`,
    };

    return sectionCreated;
  }

  async getAllSections() {
    return await this.prismaService.section.findMany({
      include: {
        course: {
          select: {
            grade: true,
          },
        },
      },
    });
  }

  async getSectionById(id: string) {
    const section = await this.prismaService.section.findUnique({
      where: { id },
      include: {
        course: {
          select: {
            grade: true,
          },
        },
      },
    });

    if (!section) {
      throw new NotFoundException("Section not found");
    }

    return section;
  }

  async updateSection(id: string, updateSectionDto: UpdateSectionDto) {
    const section = await this.prismaService.section.findUnique({
      where: { id },
    });

    if (!section) {
      throw new NotFoundException("Section not found");
    }

    if (
      updateSectionDto.name &&
      updateSectionDto.courseId &&
      (updateSectionDto.name !== section.name ||
        updateSectionDto.courseId !== section.courseId)
    ) {
      const existing = await this.findSection(
        updateSectionDto.name,
        updateSectionDto.courseId
      );
      if (existing) {
        throw new ConflictException("Another section with same name exists in this course");
      }
    }

    const updatedSection = await this.prismaService.section.update({
      where: { id },
      data: updateSectionDto,
    });

    return {
      message: `Section ${updatedSection.name} updated successfully.`,
    };
  }

  async deleteSection(id: string) {
    const section = await this.prismaService.section.findUnique({
      where: { id },
    });

    if (!section) {
      throw new NotFoundException("Section not found");
    }

    await this.prismaService.section.delete({
      where: { id },
    });

    return {
      message: `Section ${section.name} deleted successfully.`,
    };
  }

}
