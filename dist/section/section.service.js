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
exports.SectionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const course_service_1 = require("../course/course.service");
let SectionService = class SectionService {
    constructor(prismaService, courseService) {
        this.prismaService = prismaService;
        this.courseService = courseService;
    }
    async findSection(name, courseId) {
        const section = await this.prismaService.section.findUnique({
            where: {
                name_courseId: {
                    name,
                    courseId,
                },
            },
        });
        return section;
    }
    async createSection(createSectionDto) {
        const courseExist = await this.prismaService.course.findUnique({
            where: {
                id: createSectionDto.courseId,
            },
        });
        if (!courseExist) {
            throw new common_1.NotFoundException("Course does not exist");
        }
        const sectionExist = await this.findSection(createSectionDto.name, createSectionDto.courseId);
        if (sectionExist) {
            throw new common_1.ConflictException("Section already exists.");
        }
        const section = await this.prismaService.section.create({
            data: {
                name: createSectionDto.name,
                courseId: createSectionDto.courseId,
            },
            include: {
                course: {
                    select: {
                        grade: true,
                    },
                },
            },
        });
        const sectionCreated = {
            message: `Section ${section.name} of class ${section.course.grade} has been successfully created.`,
        };
        return sectionCreated;
    }
};
exports.SectionService = SectionService;
exports.SectionService = SectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        course_service_1.CourseService])
], SectionService);
//# sourceMappingURL=section.service.js.map