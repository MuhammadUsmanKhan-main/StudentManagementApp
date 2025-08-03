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
exports.StudentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("../common/utils/bcrypt");
const class_transformer_1 = require("class-transformer");
const student_dto_1 = require("./dto/student.dto");
const section_service_1 = require("../section/section.service");
const course_service_1 = require("../course/course.service");
let StudentService = class StudentService {
    constructor(prismaService, sectionService, courseService) {
        this.prismaService = prismaService;
        this.sectionService = sectionService;
        this.courseService = courseService;
    }
    async findByEmail(email) {
        const student = await this.prismaService.student.findUnique({
            where: {
                email,
            },
            include: {
                course: {
                    select: {
                        grade: true,
                    },
                },
                section: {
                    select: {
                        name: true,
                    },
                },
            },
        });
        return student;
    }
    async createStudent(createStudentDto, adminId) {
        const studentExist = await this.findByEmail(createStudentDto.email);
        const courseExist = await this.prismaService.course.findUnique({
            where: {
                id: createStudentDto.courseId,
            },
        });
        if (!courseExist) {
            throw new common_1.NotFoundException("Course not exist");
        }
        const sectionExist = await this.prismaService.section.findUnique({
            where: {
                id: createStudentDto.sectionId,
            },
        });
        if (!sectionExist) {
            throw new common_1.NotFoundException("Section not exist");
        }
        console.log({ studentExist, createStudentDto });
        if (studentExist) {
            throw new common_1.ConflictException("Email already exists");
        }
        const studentCreated = await this.prismaService.student.create({
            data: {
                firstName: createStudentDto.firstName,
                lastName: createStudentDto.lastName,
                rollNumber: createStudentDto.rollNumber,
                phone: createStudentDto.phone,
                email: createStudentDto.email,
                password: await (0, bcrypt_1.encryptPassword)(createStudentDto.password),
                courseId: createStudentDto.courseId,
                sectionId: createStudentDto.sectionId,
                adminId,
            },
        });
        const studentDto = (0, class_transformer_1.plainToClass)(student_dto_1.StudentDto, {
            ...studentCreated,
        });
        return studentDto;
    }
    async getAllStudents() {
        return await this.prismaService.student.findMany({
            include: {
                course: true,
                section: true,
            },
        });
    }
    async getStudentById(id) {
        const student = await this.prismaService.student.findUnique({
            where: { id },
            include: {
                course: true,
                section: true,
            },
        });
        if (!student) {
            throw new common_1.NotFoundException("Student not found");
        }
        return student;
    }
    async updateStudent(id, dto) {
        const student = await this.prismaService.student.findUnique({ where: { id } });
        if (!student) {
            throw new common_1.NotFoundException("Student not found");
        }
        if (dto.email && dto.email !== student.email) {
            const exists = await this.prismaService.student.findUnique({
                where: { email: dto.email },
            });
            if (exists) {
                throw new common_1.ConflictException("Email already in use by another student");
            }
        }
        if (dto.courseId) {
            const course = await this.courseService.getCourseById(dto.courseId);
            if (!course)
                throw new common_1.NotFoundException("Course does not exist");
        }
        if (dto.sectionId) {
            const section = await this.sectionService.getSectionById(dto.sectionId);
            if (!section)
                throw new common_1.NotFoundException("Section does not exist");
        }
        const updatedStudent = await this.prismaService.student.update({
            where: { id },
            data: {
                ...dto,
                password: dto.password
                    ? await (0, bcrypt_1.encryptPassword)(dto.password)
                    : student.password,
            },
        });
        return {
            message: `Student ${updatedStudent.firstName} updated successfully`,
        };
    }
    async deleteStudent(id) {
        const student = await this.prismaService.student.findUnique({ where: { id } });
        if (!student) {
            throw new common_1.NotFoundException("Student not found");
        }
        await this.prismaService.student.delete({ where: { id } });
        return {
            message: `Student ${student.firstName} ${student.lastName} deleted successfully.`,
        };
    }
    async getStudentsOfSpecificClassAndSection(courseId, sectionId) {
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
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        section_service_1.SectionService,
        course_service_1.CourseService])
], StudentService);
//# sourceMappingURL=student.service.js.map