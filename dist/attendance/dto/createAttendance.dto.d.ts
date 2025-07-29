import { AttendanceEntity } from "../entities/attendance.entities";
import { AttendanceStatus } from "src/common/enums/attendance-status.enum";
export declare class StudentAttendanceDto {
    studentId: string;
    status: AttendanceStatus;
}
export declare class CreateAttendanceDto extends AttendanceEntity {
    date: Date;
    markedById: string;
    subjectId: string;
    sectionId: string;
    students: StudentAttendanceDto[];
}
