import { PrismaService } from "src/prisma/prisma.service";
import { CreateHomeworkDto } from "./dto/createHomework.dto";
import { TimetableService } from "src/timetable/timetable.service";
export declare class HomeworkService {
    private readonly prismaService;
    private readonly timeTableService;
    constructor(prismaService: PrismaService, timeTableService: TimetableService);
    findSubject(): Promise<void>;
    createHomework(createHomeworkDto: CreateHomeworkDto): Promise<{
        message: string;
        createdHomeworks: {
            id: string;
            title: string;
            description: string | null;
            subjectId: string;
            assignedById: string;
            studentId: string;
            assignedAt: Date;
            dueDate: Date | null;
            status: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
