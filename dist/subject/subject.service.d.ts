import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
import { CourseService } from "src/course/course.service";
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
}
