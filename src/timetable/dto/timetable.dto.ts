// import { OmitType } from "@nestjs/mapped-types";
import { Exclude, Expose } from "class-transformer";
import { TimetableEntity } from "../entities/timetable.entities";

@Exclude()
export class TimetableDto extends TimetableEntity {
  @Expose()
  day: WeekDays;

  @Expose()
  period: string;

  @Expose()
  courseId: string;
  
  @Expose()
  startTime: Date;

  @Expose()
  endTime: Date;

  @Expose()
  subjectId: string;

  @Expose()
  teacherId: string;

  @Expose()
  sectionId: string;
}
