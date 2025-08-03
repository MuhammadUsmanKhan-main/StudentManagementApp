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
exports.TeacherController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/guard/role.guard");
const teacher_service_1 = require("./teacher.service");
let TeacherController = class TeacherController {
    constructor(teacherService) {
        this.teacherService = teacherService;
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
};
exports.TeacherController = TeacherController;
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getAllTeachers"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getAllTeachers", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)('getTeacherById/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TeacherController.prototype, "getTeacherById", null);
exports.TeacherController = TeacherController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), role_guard_1.RolesGuard),
    (0, common_1.Controller)("teacher"),
    __metadata("design:paramtypes", [teacher_service_1.TeacherService])
], TeacherController);
//# sourceMappingURL=teacher.controller.js.map