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
exports.TimetableService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let TimetableService = class TimetableService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findTeachersTimetable(teacherId) {
        const teacherTimeTable = await this.prismaService.timetable.findMany({
            where: {
                teacherId,
            },
        });
        return teacherTimeTable;
    }
    async findStudentsTimetable(sectionId) {
        const studentsTimeTable = await this.prismaService.timetable.findMany({
            where: {
                sectionId,
            },
        });
        return studentsTimeTable;
    }
    async findRecordOnTimetable(createTimetableDto) {
        const timeTable = await this.prismaService.timetable.findFirst({
            where: {
                day: createTimetableDto.day,
                startTime: createTimetableDto.startTime,
                teacherId: createTimetableDto.teacherId,
            },
        });
        return timeTable;
    }
    async findTeacherTimetableOfSpecificSection(teacherId, sectionId) {
        const timeTable = await this.prismaService.timetable.findMany({
            where: {
                teacherId,
                sectionId,
            },
            include: {
                section: {
                    include: {
                        students: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
        });
        return timeTable;
    }
    async createRecordOnTimetable(createTimetableDto) {
        const checkExistingRecordOnTimeTable = await this.findRecordOnTimetable(createTimetableDto);
        if (checkExistingRecordOnTimeTable) {
            throw new common_1.ConflictException("Record already exist");
        }
        const createdRecordOnTimetable = await this.prismaService.timetable.create({
            data: {
                day: createTimetableDto.day,
                period: createTimetableDto.period,
                startTime: new Date(createTimetableDto.startTime),
                endTime: new Date(createTimetableDto.endTime),
                subjectId: createTimetableDto.subjectId,
                sectionId: createTimetableDto.sectionId,
                teacherId: createTimetableDto.teacherId,
            },
            include: {
                section: {
                    select: {
                        name: true,
                        course: {
                            select: {
                                grade: true,
                            },
                        },
                    },
                },
                subject: {
                    select: {
                        name: true,
                    },
                },
                teacher: {
                    select: {
                        firstName: true,
                        lastName: true,
                    },
                },
            },
        });
        const timeTable = {
            ...createdRecordOnTimetable,
            message: `record created successfully`,
        };
        return timeTable;
    }
};
exports.TimetableService = TimetableService;
exports.TimetableService = TimetableService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimetableService);
//# sourceMappingURL=timetable.service.js.map