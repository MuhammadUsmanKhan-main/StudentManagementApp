// import { OmitType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class SubjectDto {
  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  courseId: string;
 
}
