import { Admin } from "@prisma/client";
export declare class AdminEntity implements Admin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
