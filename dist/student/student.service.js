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
let StudentService = class StudentService {
    constructor(prismaService) {
        this.prismaService = prismaService;
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
                    }
                },
                section: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return student;
    }
    async createStudent(createStudentDto, adminId) {
        const studentExist = await this.findByEmail(createStudentDto.email);
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
};
exports.StudentService = StudentService;
exports.StudentService = StudentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StudentService);
//# sourceMappingURL=student.service.js.map