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
const student_service_1 = require("../student/student.service");
const teacher_service_1 = require("../teacher/teacher.service");
const updateAdmin_dto_1 = require("./dto/updateAdmin.dto");
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
exports.AdminController = AdminController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), role_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.Admin),
    (0, common_1.Controller)("admin"),
    __metadata("design:paramtypes", [admin_service_1.AdminService,
        student_service_1.StudentService,
        teacher_service_1.TeacherService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map