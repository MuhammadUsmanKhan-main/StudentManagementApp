"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("../common/utils/bcrypt");
const helper_1 = require("../common/utils/helper");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
const role_enum_1 = require("../common/enums/role.enum");
const admin_service_1 = require("../admin/admin.service");
const teacher_service_1 = require("../teacher/teacher.service");
const student_service_1 = require("../student/student.service");
let UserService = class UserService {
    constructor(prismaService, jwtService, mailerService, adminService, studentService, teacherService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
        this.adminService = adminService;
        this.studentService = studentService;
        this.teacherService = teacherService;
    }
    async validateUser(email, password, role) {
        let user;
        console.log({ email, role });
        switch (role) {
            case role_enum_1.Role.Admin:
                user = await this.adminService.findByEmail(email);
                break;
            case role_enum_1.Role.Student:
                user = await this.studentService.findByEmail(email);
                console.log({ Student: 'student', user });
                break;
            case role_enum_1.Role.Teacher:
                user = await this.teacherService.findByEmail(email);
                break;
            default:
                throw new common_1.UnauthorizedException("Invalid role");
        }
        if (user == undefined || user.password == null) {
            throw new common_1.UnauthorizedException("email or password is not correct");
        }
        let isMatch = await (0, bcrypt_1.comparePassword)(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException("email or passoword is not correct");
        }
        delete user.password;
        return { ...user, role };
    }
    async signin(user, res) {
        try {
            (0, helper_1.storingJwtOnCookie)(user, res, this.jwtService);
            const userDto = {
                ...user,
                message: "Logged in successfully",
            };
            return userDto;
        }
        catch (error) {
            throw error;
        }
    }
    async logout(res) {
        let isRemoved = await (0, helper_1.removeJwtFromCookie)(res);
        return true;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mailer_service_1.MailerService,
        admin_service_1.AdminService,
        student_service_1.StudentService,
        teacher_service_1.TeacherService])
], UserService);
//# sourceMappingURL=user.service.js.map