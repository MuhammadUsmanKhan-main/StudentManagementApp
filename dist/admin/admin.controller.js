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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const admin_service_1 = require("./admin.service");
const passport_1 = require("@nestjs/passport");
const roles_decorator_1 = require("../auth/decorator/roles.decorator");
const role_guard_1 = require("../auth/guard/role.guard");
const role_enum_1 = require("../common/enums/role.enum");
const signup_admin_dto_1 = require("./dto/signup-admin.dto");
const createStudent_dto_1 = require("../student/dto/createStudent.dto");
const student_service_1 = require("../student/student.service");
const createTeacher_dto_1 = require("../teacher/dto/createTeacher.dto");
const teacher_service_1 = require("../teacher/teacher.service");
const updateAdmin_dto_1 = require("./dto/updateAdmin.dto");
const updateStudent_dto_1 = require("../student/dto/updateStudent.dto");
const updateTeacher_dto_1 = require("../teacher/dto/updateTeacher.dto");
let AdminController = class AdminController {
    constructor(adminService, studentService, teacherService) {
        this.adminService = adminService;
        this.studentService = studentService;
        this.teacherService = teacherService;
    }
    createAdmin(signUpAdminDto, res) {
        return this.adminService.createAdmin(signUpAdminDto, res);
    }
    getAll() {
        return this.adminService.getAllAdmins();
    }
    getById(id) {
        return this.adminService.getAdminById(id);
    }
    updateAdmin(id, dto) {
        return this.adminService.updateAdmin(id, dto);
    }
    delete(id) {
        return this.adminService.deleteAdmin(id);
    }
    createStudent(request, createStudentDto) {
        const adminId = request.user.id;
        console.log({ adminId });
        return this.studentService.createStudent(createStudentDto, adminId);
    }
    getAllStudents() {
        return this.studentService.getAllStudents();
    }
    getStudent(id) {
        return this.studentService.getStudentById(id);
    }
    updateStudent(id, updateStudentDto) {
        return this.studentService.updateStudent(id, updateStudentDto);
    }
    deleteStudent(id) {
        return this.studentService.deleteStudent(id);
    }
    createTeacher(request, createTeacherDto) {
        const adminId = request.user.id;
        console.log({ adminId });
        return this.teacherService.createTeacher(createTeacherDto, adminId);
    }
    async getAllTeachers() {
        return await this.teacherService.findAll();
    }
    async getTeacherById(id) {
        const teacher = await this.teacherService.findOne(id);
        if (!teacher)
            throw new common_1.NotFoundException('Teacher not found');
        return teacher;
    }
    async updateTeacher(id, updateDto) {
        return await this.teacherService.update(id, updateDto);
    }
    async deleteTeacher(id) {
        return await this.teacherService.remove(id);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Post)("createAdmin"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [signup_admin_dto_1.SignUpAdminDto,
        Response]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createAdmin", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getAllAdmins"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAll", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)('getAdminById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getById", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Put)('updateAdmin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateAdmin_dto_1.UpdateAdminDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateAdmin", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Delete)('deleteAdmin/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "delete", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Post)("createStudent"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createStudent_dto_1.CreateStudentDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createStudent", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getAllStudents"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getStudentById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "getStudent", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Put)("updateStudent/:id"),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Param)("id")),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateStudent_dto_1.UpdateStudentDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "updateStudent", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Delete)("deleteStudent/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "deleteStudent", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Post)("createTeacher"),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createTeacher_dto_1.CreateTeacherDto]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "createTeacher", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getAllTeachers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllTeachers", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)('getTeacherById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getTeacherById", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Put)('updateTeacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, updateTeacher_dto_1.UpdateTeacherDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTeacher", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Delete)('deleteTeacher/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteTeacher", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        student_service_1.StudentService,
        teacher_service_1.TeacherService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map