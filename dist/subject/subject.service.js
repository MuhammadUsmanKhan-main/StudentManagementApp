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
let SubjectService = class SubjectService {
    constructor(prismaService) {
        this.prismaService = prismaService;
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
};
exports.SubjectService = SubjectService;
exports.SubjectService = SubjectService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SubjectService);
//# sourceMappingURL=subject.service.js.map