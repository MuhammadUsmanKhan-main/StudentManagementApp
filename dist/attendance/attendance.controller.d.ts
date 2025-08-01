import { CreateAttendanceDto } from "./dto/createAttendance.dto";
import { AttendanceService } from "./attendance.service";
import { GetStudentsDto } from "./dto/getStudentsDto";
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    getStudents(getStudentsDto: GetStudentsDto): Promise<{
        id: string;
    }[]>;
    createAttendance(createAttendanceDto: CreateAttendanceDto): Promise<{
        message: string;
        records: {
            id: string;
            date: Date;
            status: import(".prisma/client").$Enums.AttendanceStatus;
            studentId: string;
            markedById: string;
            subjectId: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
