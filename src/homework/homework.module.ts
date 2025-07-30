import { Module } from "@nestjs/common";
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "src/mailer/mailer.service";
import { HomeworkController } from "./homework.controller";
import { HomeworkService } from "./homework.service";
import { TimetableService } from "src/timetable/timetable.service";
import { TimetableModule } from "src/timetable/timetable.module";
import { SubjectService } from "src/subject/subject.service";
import { SubjectModule } from "src/subject/subject.module";
import { TeacherModule } from "src/teacher/teacher.module";
import { SectionModule } from "src/section/section.module";
import { TeacherService } from "src/teacher/teacher.service";
import { SectionService } from "src/section/section.service";
import { CourseModule } from "src/course/course.module";
import { CourseService } from "src/course/course.service";
// import { SubjectService } from './subject.service';
// import { SubjectController } from './subject.controller';
// import { TeacherController } from './teacher.controller';
// import { TeacherService } from './teacher.service';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';

@Module({
  imports: [
    TimetableModule,
    SubjectModule,
    TeacherModule,
    SectionModule,
    CourseModule,
  ],
  controllers: [HomeworkController],
  providers: [
    HomeworkService,
    TimetableService,
    SubjectService,
    TeacherService,
    SectionService,
    CourseService,
  ],
})
export class HomeworkModule {}
