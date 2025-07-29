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

export class GetStudentsDto {
  @IsUUID()
  @IsNotEmpty()
  sectionId: string;

  @IsUUID()
  @IsNotEmpty()
  courseId: string;
}

