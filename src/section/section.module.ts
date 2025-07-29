import { Module } from "@nestjs/common";
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { MailerService } from "src/mailer/mailer.service";
// import { CourseController } from "./course.controller";
// import { CourseService } from "./course.service";
import { SectionService } from "./section.service";
import { SectionController } from "./section.controller";
// import { SubjectService } from './subject.service';
// import { SubjectController } from './subject.controller';
// import { TeacherController } from './teacher.controller';
// import { TeacherService } from './teacher.service';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';

@Module({
//   imports: [],
  controllers: [SectionController],
  providers: [SectionService],
})
export class SectionModule {}
