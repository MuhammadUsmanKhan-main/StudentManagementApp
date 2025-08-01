"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const admin_service_1 = require("./admin.service");
const admin_controller_1 = require("./admin.controller");
const student_service_1 = require("../student/student.service");
const teacher_service_1 = require("../teacher/teacher.service");
const student_module_1 = require("../student/student.module");
const teacher_module_1 = require("../teacher/teacher.module");
const section_module_1 = require("../section/section.module");
const section_service_1 = require("../section/section.service");
const course_module_1 = require("../course/course.module");
const course_service_1 = require("../course/course.service");
let AdminModule = class AdminModule {
};
exports.AdminModule = AdminModule;
exports.AdminModule = AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [student_module_1.StudentModule, section_module_1.SectionModule, course_module_1.CourseModule, teacher_module_1.TeacherModule],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, section_service_1.SectionService, course_service_1.CourseService, student_service_1.StudentService, teacher_service_1.TeacherService, jwt_1.JwtService],
    })
], AdminModule);
//# sourceMappingURL=admin.module.js.map