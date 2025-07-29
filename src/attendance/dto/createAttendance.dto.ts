// CreateSubjectDto
import {
  IsArray,
  IsDate,
  // IsDate,
  // IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  // Matches,
  ValidateNested,
} from "class-validator";
// import { ApiProperty } from "@nestjs/swagger";
import { AttendanceEntity } from "../entities/attendance.entities";
// import { $Enums } from "@prisma/client";
import { AttendanceStatus } from "src/common/enums/attendance-status.enum";
import { Type } from "class-transformer";

export class StudentAttendanceDto {
  @IsUUID()
  studentId: string;

  @IsEnum(AttendanceStatus)
  @IsNotEmpty()
  status: AttendanceStatus;
}

export class CreateAttendanceDto extends AttendanceEntity {

  @IsDate()
  @IsNotEmpty()
  date: Date;
  
  @IsString()
  @IsNotEmpty()
  markedById: string;

  @IsNotEmpty()
  @IsUUID()
  subjectId: string;

  @IsNotEmpty()
  @IsUUID()
  sectionId: string;

  // @IsNotEmpty()
  // @IsUUID()
  // courseId: string;

   @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StudentAttendanceDto)
  students: StudentAttendanceDto[];
}
