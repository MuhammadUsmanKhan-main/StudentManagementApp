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
exports.TeacherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("../common/utils/bcrypt");
const class_transformer_1 = require("class-transformer");
const teacher_dto_1 = require("./dto/teacher.dto");
let TeacherService = class TeacherService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async findByEmail(email) {
        const teacher = await this.prismaService.teacher.findUnique({
            where: {
                email,
            },
        });
        return teacher;
    }
    async createTeacher(createTeacherDto, adminId) {
        const teacherExist = await this.findByEmail(createTeacherDto.email);
        console.log({ teacherExist, createTeacherDto });
        if (teacherExist) {
            throw new common_1.ConflictException("Email already exists");
        }
        const teacherCreated = await this.prismaService.teacher.create({
            data: {
                firstName: createTeacherDto.firstName,
                lastName: createTeacherDto.lastName,
                phone: createTeacherDto.phone,
                email: createTeacherDto.email,
                password: await (0, bcrypt_1.encryptPassword)(createTeacherDto.password),
                adminId,
            },
        });
        const teacherDto = (0, class_transformer_1.plainToClass)(teacher_dto_1.TeacherDto, {
            ...teacherCreated,
        });
        return teacherDto;
    }
};
exports.TeacherService = TeacherService;
exports.TeacherService = TeacherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TeacherService);
//# sourceMappingURL=teacher.service.js.map