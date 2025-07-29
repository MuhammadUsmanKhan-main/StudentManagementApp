import { PrismaService } from "src/prisma/prisma.service";
import { CreateTeacherDto } from "./dto/createTeacher.dto";
import { TeacherDto } from "./dto/teacher.dto";
export declare class TeacherService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findByEmail(email: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        adminId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createTeacher(createTeacherDto: CreateTeacherDto, adminId: string): Promise<TeacherDto>;
}
