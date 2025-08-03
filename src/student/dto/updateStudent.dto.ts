import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUppercase,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { StudentEntity } from "../entities/student.entity";

export class UpdateStudentDto {
  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  rollNumber?: string;

  @IsOptional()
  @IsUUID()
  courseId?: string;

  @IsOptional()
  @IsUUID()
  sectionId?: string;

  @IsOptional()
  @Matches(/(?=.*[a-z])/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/(?=.*\d)/, {
    message: "Password must contain at least one number",
  })
  @Matches(/(?=.*[!@#$%^&*(),.?\":{}|<>])/, {
    message: "Password must contain at least one special character",
  })
  password?: string;
}
