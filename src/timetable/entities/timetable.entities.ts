import { Timetable } from "@prisma/client";

export class TimetableEntity implements Timetable {
    id: string;
    day: WeekDays;
    period: string;
    startTime: Date;
    endTime: Date;
    teacherId: string;
    subjectId: string;
    sectionId: string;
    createdAt: Date;
    updatedAt: Date;
} 



