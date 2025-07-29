import { PrismaService } from "src/prisma/prisma.service";
import { CreateSubjectDto } from "./dto/createSubject.dto";
export declare class SubjectService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
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
