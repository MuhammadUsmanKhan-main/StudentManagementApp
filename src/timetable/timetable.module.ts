import { Module } from '@nestjs/common';
// import { UserService } from './user.service';
// import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from 'src/mailer/mailer.service';
import { AdminTimetableController} from './admin.timetable.controller';
import { TimetableService } from './timetable.service';
import { TeacherModule } from 'src/teacher/teacher.module';
import { SectionModule } from 'src/section/section.module';
import { SubjectModule } from 'src/subject/subject.module';
import { TeacherService } from 'src/teacher/teacher.service';
import { SectionService } from 'src/section/section.service';
import { SubjectService } from 'src/subject/subject.service';
import { CourseModule } from 'src/course/course.module';
import { CourseService } from 'src/course/course.service';
import { TimetableController } from './timetable.controller';
// import { SubjectService } from './subject.service';
// import { SubjectController } from './subject.controller';
// import { TeacherController } from './teacher.controller';
// import { TeacherService } from './teacher.service';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';

@Module({
  imports:[TeacherModule, SectionModule, SubjectModule, CourseModule],
  controllers: [TimetableController,AdminTimetableController],
  providers: [TimetableService, TeacherService, SectionService, SubjectService, CourseService],
})
export class TimetableModule {}
