import { AdminEntity } from "../entities/admin.entity";
declare const AdminDto_base: import("@nestjs/mapped-types").MappedType<Omit<AdminEntity, "password">>;
export declare class AdminDto extends AdminDto_base {
    firstName: string;
    lastName: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}
export {};
