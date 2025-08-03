// CreateSubjectDto
import { IsEmail, IsNotEmpty, IsString, IsUUID, Matches } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { SubjectEntity } from "../entities/subject.entities";
// import { CourseEntity } from "../entities/course.entity";
// import { StudentEntity } from "../entities/student.entity";
export class UpdateSubjectDto extends SubjectEntity {
  @ApiProperty({
    description: "The username of the user",
    example: "johndoe",
  })
  @IsString()
  @IsNotEmpty()
  // firstName: string;
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({
    description: "The email of the user",
    example: "johndoe@gmail.com",
  })

  @IsNotEmpty()
  @IsUUID()
  courseId: string;
}
