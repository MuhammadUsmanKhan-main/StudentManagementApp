import { PrismaService } from "src/prisma/prisma.service";
import { CreateSectionDto } from "./dto/createSection.dto";
import { Section } from "src/common/enums/section.enum";
import { CourseService } from "src/course/course.service";
import { UpdateSectionDto } from "./dto/updateSection.dto";
export declare class SectionService {
    private readonly prismaService;
    private readonly courseService;
    constructor(prismaService: PrismaService, courseService: CourseService);
    findSection(name: Section, courseId: string): Promise<{
        id: string;
        name: import(".prisma/client").$Enums.section;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createSection(createSectionDto: CreateSectionDto): Promise<{
        message: string;
    }>;
    getAllSections(): Promise<({
        course: {
            grade: number;
        };
    } & {
        id: string;
        name: import(".prisma/client").$Enums.section;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getSectionById(id: string): Promise<{
        course: {
            grade: number;
        };
    } & {
        id: string;
        name: import(".prisma/client").$Enums.section;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateSection(id: string, updateSectionDto: UpdateSectionDto): Promise<{
        message: string;
    }>;
    deleteSection(id: string): Promise<{
        message: string;
    }>;
}
