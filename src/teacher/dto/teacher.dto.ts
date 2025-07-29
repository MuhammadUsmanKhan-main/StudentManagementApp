import { Exclude, Expose } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
// import { UserEntity } from '../entities/user.entity';
import { TeacherEntity } from "../entities/teacher.entity";

@Exclude()
export class TeacherDto extends OmitType(TeacherEntity, ["password"]) {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  createdAt: Date;
  
  @Expose()
  updatedAt: Date;
}
