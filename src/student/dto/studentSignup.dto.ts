import { Exclude, Expose } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
// import { UserEntity } from '../entities/user.entity';
// import { TeacherEntity } from "../entities/teacher.entity";
// import { StudentEntity } from "../entities/student.entity";

@Exclude()
export class StudentSignUpDto  {
  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  email: string;

  @Expose()
  phone: string;

  @Expose()
  rollNumber: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  password:string;

  @Expose()
  section: {
    name: string;
  };
  
  @Expose()
  course: {
    class: number;
  };
}
