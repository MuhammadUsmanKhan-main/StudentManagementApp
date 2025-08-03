import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
// import { TeacherController } from './teacher.controller';
// import { TeacherService } from './teacher.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CourseModule } from 'src/course/course.module';
import { SectionModule } from 'src/section/section.module';
import { CourseService } from 'src/course/course.service';
import { SectionService } from 'src/section/section.service';
import { AdminStudentController } from './admin.student.controller';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';

@Module({
  imports:[CourseModule, SectionModule],
  controllers: [StudentController,AdminStudentController],
  providers: [StudentService, CourseService, SectionService],
})
export class StudentModule {}
