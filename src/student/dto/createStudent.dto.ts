import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUppercase,
  IsUUID,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { StudentEntity } from "../entities/student.entity";
export class CreateStudentDto extends StudentEntity {
  @ApiProperty({
    description: "The username of the user",
    example: "johndoe",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;
  lastName: string;

  @ApiProperty({
    description: "The email of the user",
    example: "johndoe@gmail.com",
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  rollNumber: string;

  @IsNotEmpty()
  courseId: string;

  @IsNotEmpty()
  sectionId: string;

  @ApiProperty({
    description:
      "Enter new minimum 8 digit password following the pattern shown in example",
    example: "12345678Aa@",
  })
  @IsNotEmpty()
  @Matches(/(?=.*[a-z])/, {
    message: "Password must contain at least one lowercase letter",
  })
  @Matches(/(?=.*[A-Z])/, {
    message: "Password must contain at least one uppercase letter",
  })
  @Matches(/(?=.*\d)/, { message: "Password must contain at least one number" })
  @Matches(/(?=.*[!@#$%^&*(),.?":{}|<>])/, {
    message: "Password must contain at least one special character",
  })
  password: string;
}
