import { PrismaService } from "src/prisma/prisma.service";
import { CreateHomeworkDto } from "./dto/createHomework.dto";
import { TimetableService } from "src/timetable/timetable.service";
import { SectionService } from "src/section/section.service";
import { SubjectService } from "src/subject/subject.service";
import { TeacherService } from "src/teacher/teacher.service";
export declare class HomeworkService {
    private readonly prismaService;
    private readonly timetableService;
    private readonly sectionService;
    private readonly subjectService;
    private readonly teacherService;
    constructor(prismaService: PrismaService, timetableService: TimetableService, sectionService: SectionService, subjectService: SubjectService, teacherService: TeacherService);
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
