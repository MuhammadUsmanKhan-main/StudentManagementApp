import { TimetableEntity } from "../entities/timetable.entities";
export declare class CreateTimetableDto extends TimetableEntity {
    day: WeekDays;
    period: string;
    startTime: Date;
    endTime: Date;
    subjectId: string;
    teacherId: string;
    sectionId: string;
}
