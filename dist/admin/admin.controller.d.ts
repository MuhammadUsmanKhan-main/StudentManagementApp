import { AdminService } from "./admin.service";
import { AdminDto } from "./dto/admin.dto";
import { SignUpAdminDto } from "./dto/signup-admin.dto";
import { CreateStudentDto } from "src/student/dto/createStudent.dto";
import { StudentService } from "src/student/student.service";
import { CreateTeacherDto } from "src/teacher/dto/createTeacher.dto";
import { TeacherService } from "src/teacher/teacher.service";
import { UpdateAdminDto } from "./dto/updateAdmin.dto";
import { UpdateStudentDto } from "src/student/dto/updateStudent.dto";
import { UpdateTeacherDto } from "src/teacher/dto/updateTeacher.dto";
export declare class AdminController {
    private readonly adminService;
    private readonly studentService;
    private readonly teacherService;
    constructor(adminService: AdminService, studentService: StudentService, teacherService: TeacherService);
    createAdmin(signUpAdminDto: SignUpAdminDto, res: Response): Promise<AdminDto>;
    getAll(): Promise<AdminDto[]>;
    getById(id: string): Promise<AdminDto>;
    updateAdmin(id: string, dto: UpdateAdminDto): Promise<AdminDto>;
    delete(id: string): Promise<{
        message: string;
    }>;
    createStudent(request: any, createStudentDto: CreateStudentDto): Promise<import("../student/dto/student.dto").StudentDto>;
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
    updateStudent(id: string, updateStudentDto: UpdateStudentDto): Promise<{
        message: string;
    }>;
    deleteStudent(id: string): Promise<{
        message: string;
    }>;
    createTeacher(request: any, createTeacherDto: CreateTeacherDto): Promise<import("../teacher/dto/teacher.dto").TeacherDto>;
    getAllTeachers(): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        adminId: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getTeacherById(id: string): Promise<{
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
    updateTeacher(id: string, updateDto: UpdateTeacherDto): Promise<import("../teacher/dto/teacher.dto").TeacherDto>;
    deleteTeacher(id: string): Promise<void>;
}
