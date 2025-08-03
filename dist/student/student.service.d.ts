import { PrismaService } from "src/prisma/prisma.service";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { StudentDto } from "./dto/student.dto";
import { SectionService } from "src/section/section.service";
import { CourseService } from "src/course/course.service";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
export declare class StudentService {
    private readonly prismaService;
    private readonly sectionService;
    private readonly courseService;
    constructor(prismaService: PrismaService, sectionService: SectionService, courseService: CourseService);
    findByEmail(email: string): Promise<{
        course: {
            grade: number;
        };
        section: {
            name: import(".prisma/client").$Enums.section;
        };
    } & {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string | null;
        rollNumber: string;
        courseId: string;
        sectionId: string;
        adminId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createStudent(createStudentDto: CreateStudentDto, adminId: string): Promise<StudentDto>;
    getAllStudents(): Promise<({
        course: {
            id: string;
            name: string;
            grade: number;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        section: {
            id: string;
            name: import(".prisma/client").$Enums.section;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string | null;
        rollNumber: string;
        courseId: string;
        sectionId: string;
        adminId: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getStudentById(id: string): Promise<{
        course: {
            id: string;
            name: string;
            grade: number;
            description: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        section: {
            id: string;
            name: import(".prisma/client").$Enums.section;
            courseId: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        phone: string | null;
        rollNumber: string;
        courseId: string;
        sectionId: string;
        adminId: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateStudent(id: string, dto: UpdateStudentDto): Promise<{
        message: string;
    }>;
    deleteStudent(id: string): Promise<{
        message: string;
    }>;
    getStudentsOfSpecificClassAndSection(courseId: string, sectionId: string): Promise<{
        id: string;
    }[]>;
}
