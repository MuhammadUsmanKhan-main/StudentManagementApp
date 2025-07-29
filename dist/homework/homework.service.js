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
exports.HomeworkService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const timetable_service_1 = require("../timetable/timetable.service");
let HomeworkService = class HomeworkService {
    constructor(prismaService, timeTableService) {
        this.prismaService = prismaService;
        this.timeTableService = timeTableService;
    }
    async findSubject() { }
    async createHomework(createHomeworkDto) {
        const getStudent = await this.timeTableService.findTeacherTimetableOfSpecificSection(createHomeworkDto.assignedById, createHomeworkDto.sectionId);
        console.log({ getStudent: getStudent[0].section.students });
        const students = getStudent[0].section.students;
        if (!students || students.length === 0) {
            throw new Error("No students found in the selected section.");
        }
        const createdHomeworks = await Promise.all(students.map((student) => this.prismaService.homework.create({
            data: {
                title: createHomeworkDto.title,
                description: createHomeworkDto.description,
                dueDate: new Date(createHomeworkDto.dueDate),
                assignedAt: new Date(),
                assignedById: createHomeworkDto.assignedById,
                subjectId: createHomeworkDto.subjectId,
                studentId: student.id,
            },
        })));
        return {
            message: `${createdHomeworks.length} students have been assigned with homework successfully.`,
            createdHomeworks,
        };
    }
};
exports.HomeworkService = HomeworkService;
exports.HomeworkService = HomeworkService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        timetable_service_1.TimetableService])
], HomeworkService);
//# sourceMappingURL=homework.service.js.map