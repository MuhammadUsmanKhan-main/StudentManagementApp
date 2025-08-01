"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const jwt_1 = require("@nestjs/jwt");
const mailer_service_1 = require("../mailer/mailer.service");
const teacher_service_1 = require("../teacher/teacher.service");
const student_service_1 = require("../student/student.service");
const teacher_module_1 = require("../teacher/teacher.module");
const student_module_1 = require("../student/student.module");
const admin_service_1 = require("../admin/admin.service");
const admin_module_1 = require("../admin/admin.module");
const section_module_1 = require("../section/section.module");
const section_service_1 = require("../section/section.service");
const course_module_1 = require("../course/course.module");
const course_service_1 = require("../course/course.service");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            teacher_module_1.TeacherModule,
            student_module_1.StudentModule,
            section_module_1.SectionModule,
            course_module_1.CourseModule,
        ],
        controllers: [user_controller_1.UserController],
        providers: [
            user_service_1.UserService,
            admin_service_1.AdminService,
            teacher_service_1.TeacherService,
            student_service_1.StudentService,
            section_service_1.SectionService,
            course_service_1.CourseService,
            jwt_1.JwtService,
            mailer_service_1.MailerService,
        ],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map