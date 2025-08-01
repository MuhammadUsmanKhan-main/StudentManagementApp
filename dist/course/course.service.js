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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CourseService = class CourseService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findCourse(number) {
        const course = await this.prismaService.course.findUnique({
            where: {
                grade: number,
            },
        });
        return course;
    }
    async createCourse(createCourseDto) {
        const courseExist = await this.findCourse(createCourseDto.grade);
        if (courseExist) {
            throw new common_1.ConflictException("Course already exists.");
        }
        const course = await this.prismaService.course.create({
            data: {
                name: createCourseDto.name,
                grade: createCourseDto.grade,
                description: createCourseDto.description,
            },
        });
        const courseCreated = {
            message: `${course.name} (${course.grade}) class has been successfully created.`,
        };
        return courseCreated;
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map