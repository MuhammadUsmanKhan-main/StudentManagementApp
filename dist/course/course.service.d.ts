import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto/createCourse.dto";
export declare class CourseService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findCourse(number: number): Promise<{
        id: string;
        name: string;
        grade: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createCourse(createCourseDto: CreateCourseDto): Promise<{
        message: string;
    }>;
}
