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
let AttendanceService = class AttendanceService {
    constructor(prismaService, timeTableService) {
        this.prismaService = prismaService;
        this.timeTableService = timeTableService;
    }
    async getStudents(getStudentsDto) {
        const { courseId, sectionId } = getStudentsDto;
        const students = await this.prismaService.student.findMany({
            where: {
                courseId,
                sectionId,
            },
            select: {
                id: true
            }
        });
        return students;
    }
    async createAttendance(createAttendanceDto) {
        const { markedById, subjectId, students, date } = createAttendanceDto;
        const startOfDay = new Date(date);
        const endOfDay = new Date(startOfDay);
        endOfDay.setDate(endOfDay.getDate() + 1);
        const year = startOfDay.getFullYear();
        const month = String(startOfDay.getMonth() + 1).padStart(2, "0");
        const day = String(startOfDay.getDate()).padStart(2, "0");
        const formattedDate = `${year}-${month}-${day}`;
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
            const subject = await this.prismaService.subject.findUnique({
                where: { id: subjectId },
                select: { courseId: true },
            });
            if (!subject)
                throw new common_1.NotFoundException(`Subject not found`);
            if (student.courseId !== subject.courseId) {
                throw new common_1.NotFoundException(`Student ${studentId} is not in the course for this subject`);
            }
            const timetableSlot = await this.prismaService.timetable.findFirst({
                where: {
                    teacherId: markedById,
                    subjectId,
                    sectionId: student.sectionId,
                    day: dayName,
                },
            });
            if (!timetableSlot) {
                throw new common_1.NotFoundException(`No valid timetable slot found for teacher and subject on ${dayName}`);
            }
            console.log("Parsed date:", startOfDay.toISOString());
            console.log("Slot start:", timetableSlot.startTime.toISOString());
            console.log("Slot end:", timetableSlot.endTime.toISOString());
            const isInTimeSlot = startOfDay >= timetableSlot.startTime &&
                startOfDay <= timetableSlot.endTime;
            if (!isInTimeSlot) {
                throw new common_1.NotFoundException(`Current time is not within the valid class period (${timetableSlot.startTime.toLocaleTimeString()} - ${timetableSlot.endTime.toLocaleTimeString()})`);
            }
            const existing = await this.prismaService.attendance.findFirst({
                where: {
                    date: {
                        gte: startOfDay,
                        lt: endOfDay,
                    },
                    studentId,
                    markedById,
                },
            });
            if (existing) {
                throw new common_1.ConflictException(`Attendance already marked for student ${studentId} on ${formattedDate}`);
            }
        }
        const attendanceEntries = await Promise.all(students.map(({ studentId, status }) => this.prismaService.attendance.create({
            data: {
                date,
                status,
                studentId,
                markedById,
            },
        })));
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
        timetable_service_1.TimetableService])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map