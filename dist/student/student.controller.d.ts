import { StudentService } from "./student.service";
export declare class StudentController {
    private readonly studentService;
    constructor(studentService: StudentService);
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
    getStudent(id: string): Promise<{
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
    getStudentsOfSpecificClassAndSection(courseId: string, sectionId: string): Promise<{
        id: string;
    }[]>;
}
