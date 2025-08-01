import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { CourseService } from "src/course/course.service";
import { UpdateSubjectDto } from "./dto/updateSubject.dto";
export declare class SubjectService {
    private readonly prismaService;
    private readonly courseService;
    constructor(prismaService: PrismaService, courseService: CourseService);
    findSubject(code: string, courseId: string): Promise<{
        id: string;
        name: string;
        code: string | null;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createSubject(createSubjectDto: CreateSubjectDto): Promise<{
        message: string;
    }>;
    getAllSubjects(): Promise<({
        course: {
            grade: number;
        };
    } & {
        id: string;
        name: string;
        code: string | null;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getSubjectById(id: string): Promise<{
        course: {
            grade: number;
        };
    } & {
        id: string;
        name: string;
        code: string | null;
        courseId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateSubject(id: string, dto: UpdateSubjectDto): Promise<{
        message: string;
    }>;
    deleteSubject(id: string): Promise<{
        message: string;
    }>;
}
