// CreateSubjectDto
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { HomeworkEntity } from "../entities/homework.entities";
// import { SubjectEntity } from "../entities/subject.entities";
// import { CourseEntity } from "../entities/course.entity";
// import { StudentEntity } from "../entities/student.entity";
export class CreateHomeworkDto extends HomeworkEntity {
  @IsString()
  @IsNotEmpty()
  // firstName: string;
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  assignedAt: Date;

  @IsUUID()
  @IsNotEmpty()
  assignedById: string;

  @IsDate()
  @IsNotEmpty()
  dueDate: Date;

  
  @IsString()
  @IsNotEmpty()
  status: boolean;

  // @IsNotEmpty()
  // @IsUUID()
  // studentId: string;

  @IsNotEmpty()
  @IsUUID()
  subjectId: string;

  @IsNotEmpty()
  @IsUUID()
  sectionId: string;
}
