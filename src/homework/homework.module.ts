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
// import { SubjectService } from './subject.service';
// import { SubjectController } from './subject.controller';
// import { TeacherController } from './teacher.controller';
// import { TeacherService } from './teacher.service';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';

@Module({
  imports: [TimetableModule],
  controllers: [HomeworkController],
  providers: [HomeworkService, TimetableService],
})
export class HomeworkModule {}
