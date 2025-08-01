"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const user_module_1 = require("../user/user.module");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const local_strategy_1 = require("./strategy/local.strategy");
const auth_controller_1 = require("./auth.controller");
const user_service_1 = require("../user/user.service");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const mailer_module_1 = require("../mailer/mailer.module");
const mailer_service_1 = require("../mailer/mailer.service");
const admin_service_1 = require("../admin/admin.service");
const admin_module_1 = require("../admin/admin.module");
const teacher_service_1 = require("../teacher/teacher.service");
const student_service_1 = require("../student/student.service");
const section_module_1 = require("../section/section.module");
const section_service_1 = require("../section/section.service");
const student_module_1 = require("../student/student.module");
const teacher_module_1 = require("../teacher/teacher.module");
const course_module_1 = require("../course/course.module");
const course_service_1 = require("../course/course.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            user_module_1.UserModule,
            student_module_1.StudentModule,
            teacher_module_1.TeacherModule,
            section_module_1.SectionModule,
            course_module_1.CourseModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    secret: configService.get("JWT_SECRET"),
                    signOptions: {
                        expiresIn: parseInt(configService.getOrThrow("ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC")),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
            mailer_module_1.MailerModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            jwt_strategy_1.JwtStrategy,
            config_1.ConfigService,
            user_service_1.UserService,
            admin_service_1.AdminService,
            teacher_service_1.TeacherService,
            student_service_1.StudentService,
            section_service_1.SectionService,
            course_service_1.CourseService,
            mailer_service_1.MailerService,
        ],
        exports: [auth_service_1.AuthService, jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map