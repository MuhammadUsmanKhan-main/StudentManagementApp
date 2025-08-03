import { SectionService } from "./section.service";
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
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
}
