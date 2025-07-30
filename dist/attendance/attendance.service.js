"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const timetable_service_1 = require("../timetable/timetable.service");
const teacher_service_1 = require("../teacher/teacher.service");
const subject_service_1 = require("../subject/subject.service");
const student_service_1 = require("../student/student.service");
let AttendanceService = class AttendanceService {
    constructor(prismaService, timeTableService, teacherService, subjectService, studentService) {
        this.prismaService = prismaService;
        this.timeTableService = timeTableService;
        this.teacherService = teacherService;
        this.subjectService = subjectService;
        this.studentService = studentService;
    }
    async getStudents(getStudentsDto) {
        const { courseId, sectionId } = getStudentsDto;
        const students = await this.prismaService.student.findMany({
            where: {
                courseId,
                sectionId,
            },
            select: {
                id: true,
            },
        });
        return students;
    }
    async createAttendance(createAttendanceDto) {
        const { markedById, subjectId, students, date, sectionId } = createAttendanceDto;
        const startOfDay = new Date(date);
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);
        const dayName = startOfDay
            .toLocaleString("en-US", { weekday: "short" })
            .toUpperCase();
        for (const { studentId } of students) {
            const student = await this.prismaService.student.findUnique({
                where: { id: studentId },
                select: { courseId: true, sectionId: true },
            });
            if (!student)
                throw new common_1.NotFoundException(`Student with ID ${studentId} not found`);
        }
        const subjectExist = await this.prismaService.subject.findUnique({
            where: {
                id: subjectId,
            },
        });
        if (!subjectExist) {
            throw new common_1.NotFoundException("Subject not found");
        }
        const teacherExist = await this.prismaService.teacher.findUnique({
            where: {
                id: markedById,
            },
        });
        if (!teacherExist) {
            throw new common_1.NotFoundException("Teacher not found");
        }
        const timetableSlot = await this.prismaService.timetable.findFirst({
            where: {
                teacherId: markedById,
                subjectId,
                sectionId,
                day: dayName,
            },
        });
        if (!timetableSlot) {
            throw new common_1.NotFoundException(`No valid timetable slot found for teacher and subject on ${dayName}`);
        }
        const isInTimeSlot = startOfDay >= timetableSlot.startTime &&
            startOfDay <= timetableSlot.endTime;
        if (!isInTimeSlot) {
            throw new common_1.NotFoundException(`Current time is not within the valid class period (${timetableSlot.startTime.toLocaleTimeString()} - ${timetableSlot.endTime.toLocaleTimeString()})`);
        }
        const attendanceEntries = await Promise.all(students.map(({ studentId, status }) => {
            return this.prismaService.attendance.upsert({
                where: {
                    studentId_date_subjectId_markedById: {
                        date,
                        markedById,
                        studentId,
                        subjectId,
                    },
                },
                create: {
                    date: startOfDay,
                    status,
                    markedById,
                    studentId,
                    subjectId,
                },
                update: {
                    status,
                },
            });
        }));
        return {
            message: "Attendance marked successfully",
            records: attendanceEntries,
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        timetable_service_1.TimetableService,
        teacher_service_1.TeacherService,
        subject_service_1.SubjectService,
        student_service_1.StudentService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map