// import { OmitType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";
import { HomeworkEntity } from "../entities/homework.entities";

@Exclude()
export class HomworkDto extends HomeworkEntity {
  @Expose()
  title: string;
  @Expose()
  description: string;
  @Expose()
  dueDate: Date;
  @Expose()
  assignedAt: Date;
  @Expose()
  assignedById: string;
  @Expose()
  status: boolean;
  @Expose()
  studentId: string;
  @Expose()
  subjectId: string;
}
