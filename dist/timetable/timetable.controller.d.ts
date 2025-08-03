import { TimetableService } from "./timetable.service";
export declare class TimetableController {
    private readonly timetableService;
    constructor(timetableService: TimetableService);
    getAll(): Promise<({
        teacher: {
            firstName: string;
            lastName: string;
        };
        subject: {
            name: string;
        };
        section: {
            name: import(".prisma/client").$Enums.section;
            course: {
                grade: number;
            };
        };
    } & {
        id: string;
        day: import(".prisma/client").$Enums.WeekDays;
        period: string;
        startTime: Date;
        endTime: Date;
        teacherId: string;
        subjectId: string;
        sectionId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getOne(id: string): Promise<{
        teacher: {
            firstName: string;
            lastName: string;
        };
        subject: {
            name: string;
        };
        section: {
            name: import(".prisma/client").$Enums.section;
            course: {
                grade: number;
            };
        };
    } & {
        id: string;
        day: import(".prisma/client").$Enums.WeekDays;
        period: string;
        startTime: Date;
        endTime: Date;
        teacherId: string;
        subjectId: string;
        sectionId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
