import { TimetableEntity } from "../entities/timetable.entities";
export declare class TimetableDto extends TimetableEntity {
    day: WeekDays;
    period: string;
    courseId: string;
    startTime: Date;
    endTime: Date;
    subjectId: string;
    teacherId: string;
    sectionId: string;
}
