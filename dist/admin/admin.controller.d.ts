import { AdminService } from "./admin.service";
import { AdminDto } from "./dto/admin.dto";
import { SignUpAdminDto } from "./dto/signup-admin.dto";
import { CreateStudentDto } from "src/student/dto/createStudent.dto";
import { StudentService } from "src/student/student.service";
import { CreateTeacherDto } from "src/teacher/dto/createTeacher.dto";
import { TeacherService } from "src/teacher/teacher.service";
export declare class AdminController {
    private readonly adminService;
    private readonly studentService;
    private readonly teacherService;
    constructor(adminService: AdminService, studentService: StudentService, teacherService: TeacherService);
    createAdmin(signUpAdminDto: SignUpAdminDto, res: Response): Promise<AdminDto>;
    createStudent(request: any, createStudentDto: CreateStudentDto): Promise<import("../student/dto/student.dto").StudentDto>;
    createTeacher(request: any, createTeacherDto: CreateTeacherDto): Promise<import("../teacher/dto/teacher.dto").TeacherDto>;
}
