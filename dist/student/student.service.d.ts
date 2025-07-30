import { PrismaService } from "src/prisma/prisma.service";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { StudentDto } from "./dto/student.dto";
import { SectionService } from "src/section/section.service";
import { CourseService } from "src/course/course.service";
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
}
