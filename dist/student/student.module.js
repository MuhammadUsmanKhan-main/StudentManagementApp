"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentModule = void 0;
const common_1 = require("@nestjs/common");
const student_controller_1 = require("./student.controller");
const student_service_1 = require("./student.service");
const course_module_1 = require("../course/course.module");
const section_module_1 = require("../section/section.module");
const course_service_1 = require("../course/course.service");
const section_service_1 = require("../section/section.service");
let StudentModule = class StudentModule {
};
exports.StudentModule = StudentModule;
exports.StudentModule = StudentModule = __decorate([
    (0, common_1.Module)({
        imports: [course_module_1.CourseModule, section_module_1.SectionModule],
        controllers: [student_controller_1.StudentController],
        providers: [student_service_1.StudentService, course_service_1.CourseService, section_service_1.SectionService],
    })
], StudentModule);
//# sourceMappingURL=student.module.js.map