import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "src/mailer/mailer.service";
import { Role } from "src/common/enums/role.enum";
import { AdminService } from "src/admin/admin.service";
import { TeacherService } from "src/teacher/teacher.service";
import { StudentService } from "src/student/student.service";
export declare class UserService {
    private readonly prismaService;
    private readonly jwtService;
    private readonly mailerService;
    private readonly adminService;
    private readonly studentService;
    private readonly teacherService;
    constructor(prismaService: PrismaService, jwtService: JwtService, mailerService: MailerService, adminService: AdminService, studentService: StudentService, teacherService: TeacherService);
    validateUser(email: string, password: string, role: Role): Promise<any>;
    signin(user: any, res: any): Promise<any>;
    logout(res: any): Promise<boolean>;
}
