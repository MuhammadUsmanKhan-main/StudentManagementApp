"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimetableModule = void 0;
const common_1 = require("@nestjs/common");
const timetable_controller_1 = require("./timetable.controller");
const timetable_service_1 = require("./timetable.service");
const teacher_module_1 = require("../teacher/teacher.module");
const section_module_1 = require("../section/section.module");
const subject_module_1 = require("../subject/subject.module");
const teacher_service_1 = require("../teacher/teacher.service");
const section_service_1 = require("../section/section.service");
const subject_service_1 = require("../subject/subject.service");
const course_module_1 = require("../course/course.module");
const course_service_1 = require("../course/course.service");
let TimetableModule = class TimetableModule {
};
exports.TimetableModule = TimetableModule;
exports.TimetableModule = TimetableModule = __decorate([
    (0, common_1.Module)({
        imports: [teacher_module_1.TeacherModule, section_module_1.SectionModule, subject_module_1.SubjectModule, course_module_1.CourseModule],
        controllers: [timetable_controller_1.TimetableController],
        providers: [timetable_service_1.TimetableService, teacher_service_1.TeacherService, section_service_1.SectionService, subject_service_1.SubjectService, course_service_1.CourseService],
    })
], TimetableModule);
//# sourceMappingURL=timetable.module.js.map