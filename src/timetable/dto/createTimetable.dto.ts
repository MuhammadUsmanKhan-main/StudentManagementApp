// CreateSubjectDto
import {
  IsDate,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
// import { SubjectEntity } from "../entities/subject.entities";
import { TimetableEntity } from "../entities/timetable.entities";
// import { CourseEntity } from "../entities/course.entity";
// import { StudentEntity } from "../entities/student.entity";
export class CreateTimetableDto extends TimetableEntity {
  @IsString()
  @IsNotEmpty()
  // firstName: string;
  day: WeekDays;

  @IsString()
  @IsNotEmpty()
  period: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: Date;

  @IsDateString()
  @IsNotEmpty()
  endTime: Date;

  @IsNotEmpty()
  @IsUUID()
  subjectId: string;

  @IsNotEmpty()
  @IsUUID()
  teacherId: string;

  @IsNotEmpty()
  @IsUUID()
  sectionId: string;

  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}
