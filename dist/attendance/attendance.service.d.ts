import { PrismaService } from "src/prisma/prisma.service";
import { TimetableService } from "src/timetable/timetable.service";
import { CreateAttendanceDto } from "./dto/createAttendance.dto";
import { GetStudentsDto } from "./dto/getStudentsDto";
export declare class AttendanceService {
    private readonly prismaService;
    private readonly timeTableService;
    constructor(prismaService: PrismaService, timeTableService: TimetableService);
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
            createdAt: Date;
            updatedAt: Date;
        }[];
    }>;
}
