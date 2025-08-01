import { CreateTimetableDto } from "./dto/createTimetable.dto";
import { TimetableService } from "./timetable.service";
import { UpdateTimetableDto } from "./dto/updateTimetable.dto";
export declare class TimetableController {
    private readonly timetableService;
    constructor(timetableService: TimetableService);
    createRecordOnTimetable(createTimetableDto: CreateTimetableDto): Promise<{
        message: string;
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
    update(id: string, updateTimetableDto: UpdateTimetableDto): Promise<{
        message: string;
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
    delete(id: string): Promise<{
        message: string;
    }>;
}
