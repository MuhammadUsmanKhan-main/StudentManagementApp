import { ConflictException, Injectable } from "@nestjs/common";
import { plainToClass } from "class-transformer";
// import { CreateCourseDto } from "src/course/dto/createCourse.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateSectionDto } from "./dto/createSection.dto";
import { SectionDto } from "./dto/section.dto";
import { Section } from "src/common/enums/section.enum";
// import { Section } from "src/common/enums/role.enum";

@Injectable()
export class SectionService {
  constructor(private readonly prismaService: PrismaService) {}

  async findSection(name: Section, courseId:string) {
    const section = await this.prismaService.section.findUnique({
      where: {
        name_courseId:{
            name,
            courseId
        }
      },
    });
    return section;
  }

  // //<=============================================Apis Related To Section=======================================>

  async createSection(createSectionDto: CreateSectionDto) {
    const sectionExist = await this.findSection(createSectionDto.name,createSectionDto.courseId);

    if (sectionExist) {
      throw new ConflictException("Section already exists.");
    }

const section =  await this.prismaService.section.create({
      data: {
        name: createSectionDto.name,
        courseId: createSectionDto.courseId,
      },
      include:{
        course:{
            select:{
                grade:true
            }
        }
      }
    });

    const sectionCreated = {
      message: `Section ${section.name} of class ${section.course.grade} has been successfully created.`,
    };

    return sectionCreated;
  }
}
