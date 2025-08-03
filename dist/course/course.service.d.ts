import { PrismaService } from "src/prisma/prisma.service";
import { CreateCourseDto } from "./dto/createCourse.dto";
import { UpdateCourseDto } from "./dto/updateCourse.dto";
export declare class CourseService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findCourseByGrade(number: number): Promise<{
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
    getAllCourses(): Promise<{
        id: string;
        name: string;
        grade: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getCourseById(id: string): Promise<{
        id: string;
        name: string;
        grade: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateCourse(id: string, dto: UpdateCourseDto): Promise<{
        id: string;
        name: string;
        grade: number;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteCourse(id: string): Promise<{
        message: string;
    }>;
}
