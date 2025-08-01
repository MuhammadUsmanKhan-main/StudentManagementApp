import { PrismaService } from "src/prisma/prisma.service";
import { CreateTimetableDto } from "./dto/createTimetable.dto";
import { TeacherService } from "src/teacher/teacher.service";
import { SubjectService } from "src/subject/subject.service";
import { SectionService } from "src/section/section.service";
import { UpdateTimetableDto } from "./dto/updateTimetable.dto";
export declare class TimetableService {
    private readonly prismaService;
    private readonly teacherService;
    private readonly subjectService;
    private readonly sectionService;
    constructor(prismaService: PrismaService, teacherService: TeacherService, subjectService: SubjectService, sectionService: SectionService);
    findTeachersTimetable(teacherId: string): Promise<{
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
    }[]>;
    findStudentsTimetable(sectionId: string): Promise<{
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
    }[]>;
    findRecordOnTimetable(createTimetableDto: CreateTimetableDto): Promise<{
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
    findTeacherTimetableOfSpecificSection(teacherId: string, sectionId: string): Promise<{
        section: {
            students: {
                id: string;
            }[];
        } & {
            id: string;
            name: import(".prisma/client").$Enums.section;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
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
    findAll(): Promise<({
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
    findOne(id: string): Promise<{
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
    update(id: string, updateDto: UpdateTimetableDto): Promise<{
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
