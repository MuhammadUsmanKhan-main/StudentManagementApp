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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt_1 = require("../common/utils/bcrypt");
const admin_dto_1 = require("./dto/admin.dto");
const class_transformer_1 = require("class-transformer");
const jwt_1 = require("@nestjs/jwt");
let AdminService = class AdminService {
    constructor(prismaService, jwtService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
    }
    async createAdmin(signUpAdminDto, res) {
        try {
            const adminExist = await this.prismaService.admin.findUnique({
                where: {
                    email: signUpAdminDto.email,
                },
            });
            if (adminExist) {
                throw new common_1.ConflictException("Email already exists");
            }
            const adminCreated = await this.prismaService.admin.create({
                data: {
                    firstName: signUpAdminDto.firstName,
                    lastName: signUpAdminDto.lastName,
                    email: signUpAdminDto.email,
                    password: await (0, bcrypt_1.encryptPassword)(signUpAdminDto.password),
                    phone: signUpAdminDto.phone,
                },
            });
            const adminDto = (0, class_transformer_1.plainToClass)(admin_dto_1.AdminDto, {
                ...adminCreated,
            });
            return adminDto;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async findByEmail(email) {
        const admin = await this.prismaService.admin.findUnique({
            where: {
                email,
            },
        });
        return admin;
    }
    async updateAdmin(id, dto) {
        const admin = await this.prismaService.admin.findUnique({
            where: { id },
        });
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        const updated = await this.prismaService.admin.update({
            where: { id },
            data: {
                firstName: dto.firstName,
                lastName: dto.lastName,
                phone: dto.phone,
                email: dto.email,
                ...(dto.password && {
                    password: await (0, bcrypt_1.encryptPassword)(dto.password),
                }),
            },
        });
        return (0, class_transformer_1.plainToClass)(admin_dto_1.AdminDto, updated);
    }
    async deleteAdmin(id) {
        const admin = await this.prismaService.admin.findUnique({ where: { id } });
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        await this.prismaService.admin.delete({ where: { id } });
        return { message: 'Admin deleted successfully' };
    }
    async getAllAdmins() {
        const admins = await this.prismaService.admin.findMany();
        return admins.map((admin) => (0, class_transformer_1.plainToClass)(admin_dto_1.AdminDto, { ...admin }));
    }
    async getAdminById(id) {
        const admin = await this.prismaService.admin.findUnique({
            where: { id },
        });
        if (!admin) {
            throw new common_1.NotFoundException(`Admin with ID ${id} not found`);
        }
        return (0, class_transformer_1.plainToClass)(admin_dto_1.AdminDto, { ...admin });
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AdminService);
//# sourceMappingURL=admin.service.js.map