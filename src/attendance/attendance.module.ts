import { Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";
import { TimetableModule } from "src/timetable/timetable.module";
import { TimetableService } from "src/timetable/timetable.service";
import { TeacherModule } from "src/teacher/teacher.module";
import { SubjectModule } from "src/subject/subject.module";
import { StudentModule } from "src/student/student.module";
import { TeacherService } from "src/teacher/teacher.service";
import { SubjectService } from "src/subject/subject.service";
import { StudentService } from "src/student/student.service";
import { SectionModule } from "src/section/section.module";
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
    TeacherModule,
    SubjectModule,
    StudentModule,
    SectionModule,
    CourseModule
  ],
  controllers: [AttendanceController],
  providers: [
    AttendanceService,
    TimetableService,
    TeacherService,
    SubjectService,
    StudentService,
    SectionService,
    CourseService
  ],
})
export class AttendanceModule {}
