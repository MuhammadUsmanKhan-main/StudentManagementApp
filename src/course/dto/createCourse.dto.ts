import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { CourseEntity } from "../entities/course.entity";
// import { StudentEntity } from "../entities/student.entity";
export class CreateCourseDto extends CourseEntity {
  @ApiProperty({
    description: "The username of the user",
    example: "johndoe",
  })
  @IsString()
  @IsNotEmpty()
  // firstName: string;
  name: string;

  @IsNotEmpty()
  grade: number;
  
  @ApiProperty({
    description: "The email of the user",
    example: "johndoe@gmail.com",
  })
  @IsNotEmpty()
  description: string;

}
