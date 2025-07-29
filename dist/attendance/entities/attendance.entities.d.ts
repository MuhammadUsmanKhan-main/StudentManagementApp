import { $Enums, Attendance } from "@prisma/client";
export declare class AttendanceEntity implements Attendance {
    id: string;
    date: Date;
    status: $Enums.AttendanceStatus;
    studentId: string;
    markedById: string;
    createdAt: Date;
    updatedAt: Date;
}
