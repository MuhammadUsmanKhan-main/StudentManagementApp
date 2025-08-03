import { AdminService } from "./admin.service";
import { AdminDto } from "./dto/admin.dto";
import { SignUpAdminDto } from "./dto/signup-admin.dto";
import { StudentService } from "src/student/student.service";
import { TeacherService } from "src/teacher/teacher.service";
import { UpdateAdminDto } from "./dto/updateAdmin.dto";
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
}
