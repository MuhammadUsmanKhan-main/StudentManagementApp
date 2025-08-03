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
exports.StudentController = void 0;
const common_1 = require("@nestjs/common");
const student_service_1 = require("./student.service");
const passport_1 = require("@nestjs/passport");
const role_guard_1 = require("../auth/guard/role.guard");
let StudentController = class StudentController {
    constructor(studentService) {
        this.studentService = studentService;
    }
    getAllStudents() {
        return this.studentService.getAllStudents();
    }
    getStudent(id) {
        return this.studentService.getStudentById(id);
    }
    getStudentsOfSpecificClassAndSection(courseId, sectionId) {
        return this.studentService.getStudentsOfSpecificClassAndSection(courseId, sectionId);
    }
};
exports.StudentController = StudentController;
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getAllStudents"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getAllStudents", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getStudentById/:id"),
    __param(0, (0, common_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getStudent", null);
__decorate([
    (0, common_1.Version)("1"),
    (0, common_1.Get)("getStudentsOfSpecificClassAndSection/:courseId/:sectionId"),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)("courseId")),
    __param(1, (0, common_1.Param)("sectionId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], StudentController.prototype, "getStudentsOfSpecificClassAndSection", null);
exports.StudentController = StudentController = __decorate([
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt"), role_guard_1.RolesGuard),
    (0, common_1.Controller)("student"),
    __metadata("design:paramtypes", [student_service_1.StudentService])
], StudentController);
//# sourceMappingURL=student.controller.js.map