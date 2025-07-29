import { AdminEntity } from '../entities/admin.entity';
declare const SignUpAdminDto_base: import("@nestjs/mapped-types").MappedType<Omit<AdminEntity, "id">>;
export declare class SignUpAdminDto extends SignUpAdminDto_base {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
}
export {};
