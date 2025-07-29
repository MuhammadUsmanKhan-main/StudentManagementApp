import { Module } from "@nestjs/common";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";
import { TimetableModule } from "src/timetable/timetable.module";
import { TimetableService } from "src/timetable/timetable.service";
// import { SubjectService } from './subject.service';
// import { SubjectController } from './subject.controller';
// import { TeacherController } from './teacher.controller';
// import { TeacherService } from './teacher.service';
// import { AdminService } from './admin.service';
// import { AdminController } from './admin.controller';

@Module({
  imports: [TimetableModule],
  controllers: [AttendanceController],
  providers: [AttendanceService, TimetableService],
})
export class AttendanceModule {}
