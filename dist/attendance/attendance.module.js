"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const attendance_controller_1 = require("./attendance.controller");
const attendance_service_1 = require("./attendance.service");
const timetable_module_1 = require("../timetable/timetable.module");
const timetable_service_1 = require("../timetable/timetable.service");
const teacher_module_1 = require("../teacher/teacher.module");
const subject_module_1 = require("../subject/subject.module");
const student_module_1 = require("../student/student.module");
const teacher_service_1 = require("../teacher/teacher.service");
const subject_service_1 = require("../subject/subject.service");
const student_service_1 = require("../student/student.service");
const section_module_1 = require("../section/section.module");
const section_service_1 = require("../section/section.service");
const course_module_1 = require("../course/course.module");
const course_service_1 = require("../course/course.service");
const teacher_attendance_controller_1 = require("./teacher.attendance.controller");
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [
            timetable_module_1.TimetableModule,
            teacher_module_1.TeacherModule,
            subject_module_1.SubjectModule,
            student_module_1.StudentModule,
            section_module_1.SectionModule,
            course_module_1.CourseModule
        ],
        controllers: [attendance_controller_1.AttendanceController, teacher_attendance_controller_1.TeacherAttendanceController],
        providers: [
            attendance_service_1.AttendanceService,
            timetable_service_1.TimetableService,
            teacher_service_1.TeacherService,
            subject_service_1.SubjectService,
            student_service_1.StudentService,
            section_service_1.SectionService,
            course_service_1.CourseService
        ],
    })
], AttendanceModule);
//# sourceMappingURL=attendance.module.js.map