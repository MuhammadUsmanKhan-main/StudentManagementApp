"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const jwt_strategy_1 = require("./auth/strategy/jwt.strategy");
const core_1 = require("@nestjs/core");
const jwt_guard_1 = require("./auth/guard/jwt.guard");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const mailer_module_1 = require("./mailer/mailer.module");
const admin_module_1 = require("./admin/admin.module");
const student_module_1 = require("./student/student.module");
const teacher_module_1 = require("./teacher/teacher.module");
const course_module_1 = require("./course/course.module");
const section_module_1 = require("./section/section.module");
const subject_module_1 = require("./subject/subject.module");
const timetable_module_1 = require("./timetable/timetable.module");
const homework_module_1 = require("./homework/homework.module");
const attendance_module_1 = require("./attendance/attendance.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            auth_module_1.AuthModule,
            prisma_module_1.PrismaModule,
            user_module_1.UserModule,
            admin_module_1.AdminModule,
            teacher_module_1.TeacherModule,
            student_module_1.StudentModule,
            mailer_module_1.MailerModule,
            course_module_1.CourseModule,
            section_module_1.SectionModule,
            subject_module_1.SubjectModule,
            timetable_module_1.TimetableModule,
            homework_module_1.HomeworkModule,
            attendance_module_1.AttendanceModule,
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_guard_1.JwtGuard,
            },
            jwt_strategy_1.JwtStrategy,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map