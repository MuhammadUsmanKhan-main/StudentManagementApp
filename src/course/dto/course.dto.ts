import { OmitType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";

@Exclude()
export class CourseDto {
  @Expose()
  name: string;

  @Expose()
  class: string;

  @Expose()
  description: string;
 
}
