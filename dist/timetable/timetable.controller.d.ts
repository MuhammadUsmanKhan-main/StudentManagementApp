import { CreateTimetableDto } from "./dto/createTimetable.dto";
import { TimetableService } from "./timetable.service";
export declare class TimetableController {
    private readonly timetableService;
    constructor(timetableService: TimetableService);
    createRecordOnTimetable(createTimetableDto: CreateTimetableDto): Promise<{
        message: string;
        teacher: {
            firstName: string;
            lastName: string;
        };
        section: {
            name: import(".prisma/client").$Enums.section;
            course: {
                grade: number;
            };
        };
        subject: {
            name: string;
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
}
