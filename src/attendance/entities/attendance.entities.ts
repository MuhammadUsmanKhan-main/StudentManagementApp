import { $Enums, Attendance } from "@prisma/client";

export class AttendanceEntity implements Attendance {
    id: string;
    date: Date;
    status: $Enums.AttendanceStatus;
    studentId: string;
    subjectId:string;
    markedById: string;
    createdAt: Date;
    updatedAt: Date;

} 



