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
exports.SubjectService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const course_service_1 = require("../course/course.service");
let SubjectService = class SubjectService {
    constructor(prismaService, courseService) {
        this.prismaService = prismaService;
        this.courseService = courseService;
    }
    async findSubject(code, courseId) {
        const Subject = await this.prismaService.subject.findUnique({
            where: {
                code_courseId: {
                    code,
                    courseId,
                },
            },
        });
        return Subject;
    }
    async createSubject(createSubjectDto) {
        const courseExist = await this.prismaService.course.findUnique({
            where: {
                id: createSubjectDto.courseId
            }
        });
        if (!courseExist) {
            throw new common_1.NotFoundException('Course does not exist');
        }
        const subjectExist = await this.findSubject(createSubjectDto.code, createSubjectDto.courseId);
        if (subjectExist) {
            throw new common_1.ConflictException("Subject already exists.");
        }
        const subject = await this.prismaService.subject.create({
            data: {
                name: createSubjectDto.name,
                code: createSubjectDto.code,
                courseId: createSubjectDto.courseId,
            },
            include: {
                course: {
                    select: {
                        grade: true,
                    },
                },
            },
        });
        const subjectCreated = {
            message: `Subject ${subject.name} with code ${subject.code} of 
      class ${subject.course.grade} has been successfully created.`,
        };
        return subjectCreated;
    }
    async getAllSubjects() {
        return this.prismaService.subject.findMany({
            include: {
                course: {
                    select: {
                        grade: true,
                    },
                },
            },
        });
    }
    async getSubjectById(id) {
        const subject = await this.prismaService.subject.findUnique({
            where: { id },
            include: {
                course: {
                    select: {
                        grade: true,
                    },
                },
            },
        });
        if (!subject) {
            throw new common_1.NotFoundException("Subject not found.");
        }
        return subject;
    }
    async updateSubject(id, dto) {
        const subject = await this.prismaService.subject.findUnique({
            where: { id },
        });
        if (!subject) {
            throw new common_1.NotFoundException("Subject not found.");
        }
        const updated = await this.prismaService.subject.update({
            where: { id },
            data: {
                name: dto.name,
                code: dto.code,
                courseId: dto.courseId,
            },
        });
        return {
            message: `Subject ${updated.name} updated successfully.`,
        };
    }
    async deleteSubject(id) {
        const subject = await this.prismaService.subject.findUnique({
            where: { id },
        });
        if (!subject) {
            throw new common_1.NotFoundException("Subject not found.");
        }
        await this.prismaService.subject.delete({ where: { id } });
        return {
            message: `Subject ${subject.name} deleted successfully.`,
        };
    }
};
exports.SubjectService = SubjectService;
exports.SubjectService = SubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        course_service_1.CourseService])
], SubjectService);
//# sourceMappingURL=subject.service.js.map