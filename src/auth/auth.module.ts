// auth.module.ts
import { Module } from "@nestjs/common";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { LocalStrategy } from "./strategy/local.strategy";
import { AuthController } from "./auth.controller";
import { UserService } from "src/user/user.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { MailerModule } from "src/mailer/mailer.module";
import { MailerService } from "src/mailer/mailer.service";
import { AdminService } from "src/admin/admin.service";
import { AdminModule } from "src/admin/admin.module";
import { TeacherService } from "src/teacher/teacher.service";
import { StudentService } from "src/student/student.service";
import { SectionModule } from "src/section/section.module";
import { SectionService } from "src/section/section.service";
import { StudentModule } from "src/student/student.module";
import { TeacherModule } from "src/teacher/teacher.module";
import { CourseModule } from "src/course/course.module";
import { CourseService } from "src/course/course.service";

@Module({
  imports: [
    AdminModule,
    UserModule,
    StudentModule,
    TeacherModule,
    SectionModule,
    CourseModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: {
          expiresIn: parseInt(
            configService.getOrThrow<string>(
              "ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC"
            )
          ),
        },
      }),
      inject: [ConfigService],
    }),
    MailerModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    ConfigService,
    UserService,
    AdminService,
    TeacherService,
    StudentService,
    SectionService,
    CourseService,
    MailerService,
  ],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
