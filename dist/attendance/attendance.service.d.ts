import { PrismaService } from "src/prisma/prisma.service";
import { TimetableService } from "src/timetable/timetable.service";
import { CreateAttendanceDto } from "./dto/createAttendance.dto";
import { GetStudentsDto } from "./dto/getStudentsDto";
import { TeacherService } from "src/teacher/teacher.service";
import { SubjectService } from "src/subject/subject.service";
import { StudentService } from "src/student/student.service";
export declare class AttendanceService {
    private readonly prismaService;
    private readonly timeTableService;
    private readonly teacherService;
    private readonly subjectService;
    private readonly studentService;
    constructor(prismaService: PrismaService, timeTableService: TimetableService, teacherService: TeacherService, subjectService: SubjectService, studentService: StudentService);
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
