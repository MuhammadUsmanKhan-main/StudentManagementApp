"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HomeworkModule = void 0;
const common_1 = require("@nestjs/common");
const homework_controller_1 = require("./homework.controller");
const homework_service_1 = require("./homework.service");
const timetable_service_1 = require("../timetable/timetable.service");
const timetable_module_1 = require("../timetable/timetable.module");
const subject_service_1 = require("../subject/subject.service");
const subject_module_1 = require("../subject/subject.module");
const teacher_module_1 = require("../teacher/teacher.module");
const section_module_1 = require("../section/section.module");
const teacher_service_1 = require("../teacher/teacher.service");
const section_service_1 = require("../section/section.service");
const course_module_1 = require("../course/course.module");
const course_service_1 = require("../course/course.service");
let HomeworkModule = class HomeworkModule {
};
exports.HomeworkModule = HomeworkModule;
exports.HomeworkModule = HomeworkModule = __decorate([
    (0, common_1.Module)({
        imports: [
            timetable_module_1.TimetableModule,
            subject_module_1.SubjectModule,
            teacher_module_1.TeacherModule,
            section_module_1.SectionModule,
            course_module_1.CourseModule,
        ],
        controllers: [homework_controller_1.HomeworkController],
        providers: [
            homework_service_1.HomeworkService,
            timetable_service_1.TimetableService,
            subject_service_1.SubjectService,
            teacher_service_1.TeacherService,
            section_service_1.SectionService,
            course_service_1.CourseService,
        ],
    })
], HomeworkModule);
//# sourceMappingURL=homework.module.js.map