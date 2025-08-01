import { SectionService } from "./section.service";
import { CreateSectionDto } from "./dto/createSection.dto";
import { UpdateSectionDto } from "./dto/updateSection.dto";
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
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
    getSection(id: string): Promise<{
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
