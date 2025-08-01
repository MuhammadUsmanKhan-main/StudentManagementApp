import { PrismaService } from "src/prisma/prisma.service";
import { AdminDto } from "./dto/admin.dto";
import { JwtService } from "@nestjs/jwt";
import { SignUpAdminDto } from "./dto/signup-admin.dto";
export declare class AdminService {
    private readonly prismaService;
    private readonly jwtService;
    constructor(prismaService: PrismaService, jwtService: JwtService);
    createAdmin(signUpAdminDto: SignUpAdminDto, res: any): Promise<AdminDto>;
    findByEmail(email: string): Promise<{
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
